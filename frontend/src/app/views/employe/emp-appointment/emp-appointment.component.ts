import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { DetailComponent } from './detail/detail.component';
import { host } from 'src/app/utils/services/host';
import { AvatarModule } from 'primeng/avatar';
import {getProfileStorage} from "../../../../api-request";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {Service} from "../../../utils/interfaces/service";
import {ServiceService} from "../../../utils/services/admin/service.service";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-emp-appointment',
  standalone: true,
    imports: [
        TableModule,
        PaginatorModule,
        CommonModule,
        AvatarModule,
        ButtonModule,
        CalendarModule,
        MultiSelectModule,
        ReactiveFormsModule,
        ToggleButtonModule,
        InputTextModule
    ],
  templateUrl: './emp-appointment.component.html',
  styleUrl: './emp-appointment.component.scss'
})
export class EmpAppointmentComponent {
  appointments : Appointment[];
  totalAppointments : number;
  selectAppointment : Appointment;
  state : string = 'idle';
    displayForm=false
    service_list:Service[] = []
    form: FormGroup;
  constructor(private srv: ServiceService,private service : AppointmentService,private dialogService : DialogService){
      this.form = new FormGroup({
          'services': new FormControl(''),
          'min': new FormControl(''),
          'max': new FormControl('',  this.minMaxValidator.bind(this)),
          'start': new FormControl(''),
          'end': new FormControl('',  this.startDateValidator.bind(this))
      });
      this.srv.get()
          .subscribe({
              next: list => this.service_list = list
          })
  }
    minMaxValidator(control: FormControl): {[s: string]: boolean} {
        if (this.form && control.value !== '' && (control.value <= this.form.controls['min'].value)) {
            return {'maxLessThanMin': true};
        }
        return null;
    }

    startDateValidator(control: FormControl): {[s: string]: boolean} {
        if (this.form && control.value !== '' && (new Date(control.value) < new Date(this.form.controls['start'].value))) {
            return {'endDateBeforeStartDate': true};
        }
        return null;
    }
  ngOnInit(): void {
    this.state = 'loading';
    let customer = getProfileStorage()
    this.service.byEmp(customer.id).subscribe((next)=>{
      console.log(next);
      this.appointments = next
    });
    this.service.countByEmp(customer.id).subscribe((next)=> {this.totalAppointments = next});
  }

  showDetail(){
    console.log(this.selectAppointment);
    this.dialogService.open(DetailComponent,{
      data:{
        appointment:this.selectAppointment
      },
      header:'Détail du rendez-vous',
      style:{
        width:'100%'
      }
    }).onClose.subscribe((deleted)=>{
      if(deleted){
        this.appointments = this.appointments.filter((appointment) => appointment !== this.selectAppointment);
      }
    });
  }

  calculateServicePrice(service){
    let total = service.price;
    if(service.discount){
      total -= (total*(service.discount/100));
    }
    return total;
  }

  calculateTotal(appointment : Appointment){
    let total = 0;
    appointment.services.forEach((srv)=>{
      total += this.calculateServicePrice(srv);
    });
    return total;
  }

  calculateTotalMinute(appointment : Appointment){
    let total = 0;
    let emp = getProfileStorage()
    appointment.services.forEach((srv)=>{
      if(srv.emp && srv.emp._id === emp.id){
        total += srv.duration;
      }
    });
    return total;
  }

  calculateCommittee(appointment : Appointment){
    let total = 0;
    let emp = getProfileStorage();
    appointment.services.forEach((srv)=>{
      if(srv.emp && srv.emp?._id === emp.id){
        total += (srv.committee/100) * srv.price;
      }
    });
    return total;
  }

  changePage(event){
    let emp = getProfileStorage()
    this.service.byEmp(emp.id,event.page).subscribe((next)=>{
      this.appointments = next
    });
  }
  getProfile(customer){
    return host+"/profiles/"+customer?.profile;
  }
    onSearch(){
        const form = this.form.value
        form.emp = getProfileStorage().id
        console.log(form)
        this.service.filterCLI(form)
            .subscribe({
                next:list=>this.appointments = list,
                error:e=>console.log(e)
            })
    }
}
