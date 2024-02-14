import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Service } from 'src/app/interfaces/service';
import { User } from 'src/app/utils/interfaces/user';
import { ServiceService } from 'src/app/utils/services/admin/service.service';
import { PersonService } from 'src/app/utils/services/person/person-service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    DropdownModule
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
  fb : FormGroup;
  employes : User[] = [];
  services : Service[] = [];
  customer : User;
  constructor(private service : PersonService,private serviceService : ServiceService,private builder : FormBuilder,private messageService : MessageService){
    this.serviceService.get().subscribe((list)=> this.services = list);
    service.findByrole('employe').then((list)=> this.employes = list).catch((err)=> this.messageService.add({summary:"erreur",detail:err,severity:'error'}));
    service.findInTheSession().subscribe((user)=>{
      this.customer = user;
      this.fb = this.builder.group({
        mail : [user.mail,[Validators.email,Validators.required]],
        name : [user.name,[Validators.required]],
        prefered_emp : [user.prefered_emp],
        prefered_service : [user.prefered_service]
      });
    })
  }
  updateProfile(){
    if(this.fb.invalid){
      this.messageService.add({summary:"Erreur",detail:"Toutes les champs sont obligatoires",severity:"error"});
    }else{
      this.customer.mail = this.fb.value.mail;
      this.customer.name = this.fb.value.name;
      this.customer.prefered_emp = this.fb.value.prefered_emp;
      this.customer.prefered_service = this.fb.value.prefered_service;
      this.service.update(this.customer).then(()=>
        this.messageService.add({summary:"Réussie",detail:"Les modifications ont été enregistrées",severity:"success"})
      ).catch((err)=>
        this.messageService.add({summary:"Erreur",detail:"Les données sont invalides",severity:"error"})
      );
    }
  }
}
