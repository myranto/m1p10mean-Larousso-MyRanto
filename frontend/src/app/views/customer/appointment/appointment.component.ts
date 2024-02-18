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

registerLocaleData(LocaleFr,'fr');

@Component({
  selector: 'app-appointment',
  standalone: true,
    imports: [
        CommonModule,
        TableModule,
        PaginatorModule,
        ConfirmDialogModule,
        InputTextModule
    ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{
  appointments : Appointment[];
  totalAppointments : number;
  selectedAppointment : Appointment;
  state : string = 'idle';

  constructor(private service : AppointmentService,private dialogService : DialogService,private confirmationService : ConfirmationService,private messageService : MessageService){}

  ngOnInit(): void {
    this.state = 'loading';
    let customer = getProfileStorage()
    this.service.byCustomer(customer.id).subscribe((next)=>{
      this.appointments = next
    });
    this.service.countByCustomer(customer.id).subscribe((next)=> {this.totalAppointments = next.count});
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

}
