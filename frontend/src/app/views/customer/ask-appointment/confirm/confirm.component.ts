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
import {getProfileStorage} from "../../../../../api-request";
import { Discount } from 'src/app/utils/interfaces/discount';

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
  services : { id : string, name : string , price : number,discount:number, committee : number,duration : number, emp: string | null }[];
  total : any;
  loading : boolean = false;
  discount : Discount;

  constructor(private config : DynamicDialogConfig,private ref : DynamicDialogRef,private messageService : MessageService,private service : AppointmentService){
    this.appointmentDate = this.config.data.date;
    this.services = this.config.data.services;
    this.total = this.config.data.total;
    this.discount = this.config.data.discount;
  }

  valid(){
    const customer = getProfileStorage()
    this.loading = true;
    let appointment : Appointment = {
      _id:undefined,
      customer: customer.id,
      date:this.appointmentDate,
      services : this.services,
      discount : this.discount ? this.discount.percent : 0,
      payment : null
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
  calculateTheDiscount(service){
    if(service.discount){
      return service.price - (service.price*(service.discount/100));
    }
    return service.price;
  }
}
