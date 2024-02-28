import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ButtonModule } from 'primeng/button';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';
import { MessageService } from 'primeng/api';
import { PaymentComponent } from '../payment/payment.component';
import { host } from 'src/app/utils/services/host';
import { AvatarModule } from 'primeng/avatar';

registerLocaleData(localeFr,'fr');

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    AvatarModule
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  appointment : Appointment;

  constructor(private config : DynamicDialogConfig,private ref : DynamicDialogRef,private service : AppointmentService,private messageService : MessageService,private dialogService : DialogService){
    this.appointment = this.config.data.appointment;
  }
  
  close(){
    this.ref.close();
  }

  pay(){
    this.dialogService.open(PaymentComponent,{header:"Paiement du rendez-vous",data:{appointment:this.appointment,superRef:this.ref}});
  }

  canBePaid(){
    return !this.appointment.payment && new Date(this.appointment.date )> new Date()
  }

  getProfile(emp){
    return host+"/profiles/"+emp?.profile;
  }

  getPrice(service){
    if(service.discount){
      return service.price - (service.price * (service.discount/100));
    }
    return service.price
  }
}
