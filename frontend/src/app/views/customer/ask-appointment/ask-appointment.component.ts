import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { Service } from 'src/app/interfaces/service';
import { ConfirmComponent } from './confirm/confirm.component';
import { ServiceService } from 'src/app/utils/services/admin/service.service';
import { User } from 'src/app/utils/interfaces/user';
import { PersonService } from 'src/app/utils/services/person/person-service';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { host } from 'src/app/utils/services/host';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-ask-appointment',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    CommonModule,
    AvatarModule
  ],
  templateUrl: './ask-appointment.component.html',
  styleUrl: './ask-appointment.component.scss'
})
export class AskAppointmentComponent implements OnInit{
  calendarDate : any;
  services : Service[]= [];
  empList : User[];
  selectedServices : any = [];
  state : string = 'idle';
  form : FormGroup;

  constructor(private serviceService : ServiceService,private messageService : MessageService,private dialogService : DialogService,
    private personService : PersonService,private formBuilder : FormBuilder,private router : Router ){
    this.personService.findInTheSession().subscribe((customer)=>{
      console.log(customer);
      
      this.form = this.formBuilder.group({
        selectedService : [customer.prefered_service,[Validators.required]],
        selectedEmp : [customer.prefered_emp]
      });
    });
  }
  
  ngOnInit(): void {
    this.state = 'loading';
    this.personService.findByrole('employe').then((empList) => {
      this.empList = empList;
      this.state = "idle";
    });

    this.serviceService.get().subscribe({
      error : (error)=>{
        this.messageService.add({summary:'Une erreur est survenue',severity:'error', detail:error})
      },
      next: (value)=>{
        this.state = 'idle';
        this.services = value;
      }
    })
  }

  removeFromSelected(model){
    this.selectedServices = this.selectedServices.filter((service) => service !== model);
  }
  
  getTotalPrice(){
    let total = 0;
    this.selectedServices.forEach((selected)=> total+= selected.price );
    return total;
  }

  confirm(){
    if(!this.calendarDate || this.selectedServices.length === 0){
      this.messageService.add({summary:'Information manquante',detail:'La date est manquante ou aucun service séléctionné',severity:'warn'});
    }else{
      this.dialogService.open(ConfirmComponent,{header:'Confirmation du rendez-vous',data:{
        date:this.calendarDate,
        services:this.selectedServices,
        total:this.getTotalPrice()
      }}).onClose.subscribe((result)=>{
        if(result){
          this.router.navigate(['/views/customer/appointment']);
        }
      });
    }
  }

  add(){
    let selectedService = this.form.value.selectedService;
    if(!selectedService){
      this.messageService.add({summary:'Aucun service',detail:'Aucun service séléctionné',severity:'warn'});
    }else{
      let already = false;
      this.selectedServices.forEach((srv)=>{
        if(srv.id === selectedService._id){
          already = true;
        }
      });
      if(!already){
        let selectedEmp = this.form.value.selectedEmp;
        this.selectedServices.push(
          {
            id : selectedService._id,
            name : selectedService.name,
            price : selectedService.price,
            duration : selectedService.duration,
            committee : selectedService.committee,
            emp : selectedEmp ? selectedEmp._id : null,
            emp_name : selectedEmp ? selectedEmp.name : null,
            emp_avatar : selectedEmp ? selectedEmp.profile : null
          }
        );
        this.form.reset();
      }
    }
  }
  getProfile(profile){
    return host+"/profiles/"+profile;
  }
}