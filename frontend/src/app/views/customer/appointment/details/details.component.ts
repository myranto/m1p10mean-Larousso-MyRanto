import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ButtonModule } from 'primeng/button';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { MessageService } from 'primeng/api';

registerLocaleData(localeFr,'fr');

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  appointment : Appointment;

  constructor(private config : DynamicDialogConfig,private ref : DynamicDialogRef,private service : AppointmentService,private messageService : MessageService){
    this.appointment = this.config.data.appointment;
  }
  closeDialog(){
    this.ref.close(false);
  }
  remove(){
    this.service.drop(this.appointment._id).subscribe({
      error:(error)=>{
        this.messageService.add({summary:'Erreur',detail:error,severity:'error'});
      },
      next:()=>{
        this.ref.close(true);
        this.messageService.add({summary:'Réussie',detail:'Le rendez-vous a été supprimé avec succés',severity:'success'});
      }
    });
  }
}
