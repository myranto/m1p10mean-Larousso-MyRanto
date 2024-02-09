import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { Appointment } from 'src/app/utils/interfaces/appointment';

registerLocaleData(localeFr,'fr');
@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  appointmentDate : any;
  services : { id : string, name : string , price : number, committee : number,duration : number, emp: { id : string, name : string} | null }[];
  total : any;
  loading : boolean = false;

  constructor(private config : DynamicDialogConfig,private ref : DynamicDialogRef,private messageService : MessageService,private service : AppointmentService){
    this.appointmentDate = this.config.data.date;
    this.services = this.config.data.services;
    this.total = this.config.data.total;
  }

  valid(){
    const customer = JSON.parse(localStorage.getItem('person_profil'));
    this.loading = true;
    let appointment : Appointment = {
      _id:undefined,
      customer:{
        id : customer.id,
        name : customer.name
      },
      date:this.appointmentDate,
      services : this.services
    };
    this.service.create(appointment).subscribe(
      {
        error : (error)=> {
          this.loading = false;
          console.log(error);
          this.messageService.add({summary:'un erreur est survenue',detail:error.error,severity:'error'});
        },
        next:()=>{
          this.loading = false;
          this.ref.close(true);
          this.messageService.add({summary:'Succés',detail:'Rendez ajouté avec succés',severity:'success'})
        }
      }
    );
  }
}
