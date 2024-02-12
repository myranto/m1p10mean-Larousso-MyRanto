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

registerLocaleData(LocaleFr,'fr');

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    PaginatorModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{
  appointments : Appointment[];
  totalAppointments : number;
  selectAppointment : Appointment;
  state : string = 'idle';

  constructor(private service : AppointmentService,private dialogService : DialogService){}

  ngOnInit(): void {
    this.state = 'loading';
    let customer = JSON.parse(localStorage.getItem('person_profil'));
    this.service.byCustomer(customer.id).subscribe((next)=>{
      this.appointments = next
    });
    this.service.countByCustomer(customer.id).subscribe((next)=> {this.totalAppointments = next.count});
  }

  showDetail(){
    console.log(this.selectAppointment);
    this.dialogService.open(DetailsComponent,{
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

  calculateTotalMinutes(appointment : Appointment){
    let total = 0;
    appointment.services.forEach((srv)=>{
      total += srv.duration;
    });
    return total;
  }

  changePage(event){
    let customer = JSON.parse(localStorage.getItem('person_profil'));
    this.service.byCustomer(customer.id,event.page).subscribe((next)=>{
      this.appointments = next
    });
  }
}
