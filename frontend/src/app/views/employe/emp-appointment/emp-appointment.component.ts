import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-emp-appointment',
  standalone: true,
  imports: [
    TableModule,
    PaginatorModule,
    CommonModule
  ],
  templateUrl: './emp-appointment.component.html',
  styleUrl: './emp-appointment.component.scss'
})
export class EmpAppointmentComponent {
  appointments : Appointment[];
  totalAppointments : number;
  selectAppointment : Appointment;
  state : string = 'idle';
  constructor(private service : AppointmentService,private dialogService : DialogService){}

  ngOnInit(): void {
    this.state = 'loading';
    let customer = JSON.parse(localStorage.getItem('person_profil'));
    this.service.byEmp(customer.id).subscribe((next)=>{
      this.appointments = next
    });
    this.service.countByEmp(customer.id).subscribe((next)=> {this.totalAppointments = next.count});
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

  calculateTotal(appointment : Appointment){
    let total = 0;
    appointment.services.forEach((srv)=>{
      total += srv.price;
    });
    return total;
  }

  calculateTotalMinute(appointment : Appointment){
    let total = 0;
    let customer = JSON.parse(localStorage.getItem('person_profil'));
    appointment.services.forEach((srv)=>{
      if(srv.emp && srv.emp.id === customer.id){
        total += srv.duration;
      }
    });
    return total;
  }

  calculateCommittee(appointment : Appointment){
    let total = 0;
    let customer = JSON.parse(localStorage.getItem('person_profil'));
    appointment.services.forEach((srv)=>{
      if(srv.emp && srv.emp.id === customer.id){
        total += (srv.committee/100) * srv.price;
      }
    });
    return total;
  }

  changePage(event){
    let emp = JSON.parse(localStorage.getItem('person_profil'));
    this.service.byEmp(emp.id,event.page).subscribe((next)=>{
      this.appointments = next
    });
  }
}
