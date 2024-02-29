import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { registerLocaleData } from '@angular/common';
import LocaleFr from '@angular/common/locales/fr';
import { DialogService } from 'primeng/dynamicdialog';
import { DetailsComponent } from './details/details.component';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {InputTextModule} from "primeng/inputtext";
import {getProfileStorage} from "../../../../api-request";
import {AccordionModule} from "primeng/accordion";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Service, ServiceService} from "../../../utils/services/admin/service.service";

registerLocaleData(LocaleFr,'fr');

@Component({
  selector: 'app-appointment',
  standalone: true,
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ConfirmDialogModule,
        InputTextModule,
        AccordionModule,
        ToggleButtonModule,
        CalendarModule,
        MultiSelectModule,
        ReactiveFormsModule
    ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{
  appointments : Appointment[];
    totalAppointments : number;
    selectedAppointment : Appointment;
    service_list:Service[] = []
    form: FormGroup;
    state : string = 'idle';
    displayForm=false
  constructor(private srv: ServiceService,private service : AppointmentService,private dialogService : DialogService,private confirmationService : ConfirmationService,private messageService : MessageService){
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
    this.service.byCustomer(customer.id).subscribe((next)=>{
      this.appointments = next
    });
    this.service.countByCustomer(customer.id).subscribe((next)=> {this.totalAppointments = next});
  }

  showDetail(){
    this.dialogService.open(DetailsComponent,{
      data:{
        appointment:this.selectedAppointment
      },
      header:'Détail du rendez-vous',
      style:{
        width:'100%'
      }
    }).onClose.subscribe((value)=>{
      console.log(value);

      this.selectedAppointment.payment = value.payment;
    });
  }

  calculateTotal(appointment : Appointment){
    let total = 0;
    appointment.services.forEach((srv)=>{
      total += srv.discount ? srv.price - (srv.price*(srv.discount/100)) : srv.price;
    });
    return appointment.discount ? total - (total * ( appointment.discount/100 )) : total;
  }

  calculateTotalMinutes(appointment : Appointment){
    let total = 0;
    appointment.services.forEach((srv)=>{
      total += srv.duration;
    });
    return total;
  }

  changePage(event){
    let customer = getProfileStorage()
    this.service.byCustomer(customer.id,event.page).subscribe((next)=>{
      this.appointments = next
    });
  }

  delete(appointment : Appointment){
    console.log(appointment);
    this.confirmationService.confirm({message:"Confirmer la suppression du rendez-vous",accept:()=>{
        this.service.drop(appointment._id).subscribe({
          error:(error)=>{
            this.messageService.add({summary:'Erreur',detail:error,severity:'error'});
          },
          next:()=>{
            this.messageService.add({summary:'Réussie',detail:'Le rendez-vous a été supprimé avec succés',severity:'success'});
            this.appointments = this.appointments.filter((apt) => apt !== appointment);
          }
        });
      },
      acceptLabel:"Supprimer",
      rejectLabel:"Annuler",
      acceptButtonStyleClass:"p-button-danger"
    });
  }
  onSearch(){
      const form = this.form.value
      form.customer = getProfileStorage().id
      console.log(form)
      this.service.filterCLI(form)
          .subscribe({
              next:list=>this.appointments = list,
              error:e=>console.log(e)
          })
  }

}
