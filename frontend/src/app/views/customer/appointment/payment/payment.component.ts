import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { Appointment } from 'src/app/utils/interfaces/appointment';
import { CommonModule, registerLocaleData } from '@angular/common';
import LocaleFr from '@angular/common/locales/fr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from 'src/app/utils/services/customer/appointment.service';

registerLocaleData(LocaleFr,'fr');

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    InputMaskModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  appointment : Appointment;
  superRef : DynamicDialogRef;
  fb : FormGroup

  constructor(private ref : DynamicDialogRef,private config : DynamicDialogConfig,private messageService : MessageService,private builder : FormBuilder,private service : AppointmentService){
    this.appointment = this.config.data.appointment;
    this.superRef = this.config.data.superRef;
    this.fb = this.builder.group({
      cardNumber : [null,[Validators.required]],
      expiredIn : [null,[Validators.required]]
    });
  }
  
  calculateTotal(){
    let total = 0;
    this.appointment.services.forEach((srv)=>{
      total += srv.discount ? srv.price - (srv.price*(srv.discount/100)) : srv.price;
    });
    return this.appointment.discount ? total - (total * ( this.appointment.discount/100 )) : total;
  }

  validate(){
    if(this.fb.invalid){
      this.messageService.add({summary:"Erreur",detail:"Les champs sont obligatoires",severity:"warn"})
    }else{
      this.service.pay(this.appointment).subscribe({
        next : (value)=>{
          this.messageService.add({summary:"Réussi",detail:"Paiement réussi",severity:"success"})  
          this.ref.close();
          this.superRef.close(value);
        },
        error: (err)=>{
          this.messageService.add({summary:"Erreur",detail:err.errors,severity:"error"});
        }
      });
    }
  }
}
