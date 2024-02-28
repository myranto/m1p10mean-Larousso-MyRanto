import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ConfirmComponent } from './confirm/confirm.component';
import {Service, ServiceService} from 'src/app/utils/services/admin/service.service';
import { User } from 'src/app/utils/interfaces/user';
import { PersonService } from 'src/app/utils/services/person/person-service';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { host } from 'src/app/utils/services/host';
import { AvatarModule } from 'primeng/avatar';
import { Discount } from 'src/app/utils/interfaces/discount';
import { Discountservice } from 'src/app/utils/services/admin/discountservice';
import { LoaderComponent } from '../../utils/loader/loader.component';
import { CardModule } from 'primeng/card';


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
    AvatarModule,
    LoaderComponent,
    CardModule
  ],
  templateUrl: './ask-appointment.component.html',
  styleUrl: './ask-appointment.component.scss'
})
export class AskAppointmentComponent implements OnInit{
  calendarDate : any = new Date();
  previousCalendardate : any = this.calendarDate;
  services : Service[]= [];
  empList : User[];
  discount : Discount;
  selectedServices : any = [];
  loading : string[] = [];
  form : FormGroup;
new: any;

  constructor(private serviceService : ServiceService,private messageService : MessageService,private dialogService : DialogService,
    private personService : PersonService,private formBuilder : FormBuilder,private router : Router,private discountService : Discountservice){
    this.personService.findInTheSession().subscribe((customer)=>{
      this.form = this.formBuilder.group({
        selectedService : [customer.prefered_service,[Validators.required]],
        selectedEmp : [customer.prefered_emp]
      });
    });
  }

  ngOnInit(): void {
    this.loading.push("emp","service","discount");
    this.personService.findByrole('employe').then((empList) => {
      this.empList = empList;
      this.loading = this.loading.filter((value)=> value !== "emp");
    }).catch((err)=>{
        this.loading = this.loading.filter((value)=> value !== "emp");
        this.messageService.add({ severity:'error',summary:'Un erreur est survenue',detail:err.message });
    });

    this.serviceService.get().subscribe({
      error : (error)=>{
        this.messageService.add({summary:'Une erreur est survenue',severity:'error', detail:error.message})
        this.loading = this.loading.filter((value)=> value !== "service");
      },
      next: (value)=>{
        this.loading = this.loading.filter((value)=> value !== "service");
        this.services = value;
      },
    });

    this.discountService.getByDate(new Date()).subscribe({
      error:(err)=>{
        this.messageService.add({summary:'Erreur',severity:"error",detail:err.message})
        this.loading = this.loading.filter((value)=> value !== "discount");
      },
      next:(value)=>{
        this.discount = value;
        this.loading = this.loading.filter((value)=> value !== "discount");
      }
    });
  }

  removeFromSelected(model){
    this.selectedServices = this.selectedServices.filter((service) => service !== model);
  }

  getTotalPrice(){
    let total = 0;
    this.selectedServices.forEach((selected)=> total+= this.calculateTheDiscount(selected) );
    return this.discount ? (total - (total * (this.discount.percent/100))) : total;
  }

  confirm(){
    if(!this.calendarDate || this.selectedServices.length === 0){
      this.messageService.add({summary:'Information manquante',detail:'La date est manquante ou aucun service séléctionné',severity:'warn'});
    }else{
      this.dialogService.open(ConfirmComponent,{header:'Confirmation du rendez-vous',data:{
        date:this.calendarDate,
        services:this.selectedServices,
        discount:this.discount,
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
            discount : selectedService.discount ? parseFloat(selectedService.discount.percent) : 0,
            emp : selectedEmp ? selectedEmp._id : null,
            emp_name : selectedEmp ? selectedEmp.name : null,
            emp_avatar : selectedEmp ? selectedEmp.profile : null,
          }
        );
        this.form.reset();
      }
    }
  }

  dateChange(selectedDate : Date){
    this.loading.push("service","discount");

    this.serviceService.findByDate(this.calendarDate).subscribe({
      next:(list)=>{
        this.services = list;
        this.loading = this.loading.filter((load) => load !== "service")
      },
      error:(err)=>{
        this.loading = this.loading.filter((load) => load !== "service")
        this.messageService.add({ severity:'error',detail:err.message, summary:'Une erreur est survenue' });
      }
    });
    this.discountService.getByDate(this.calendarDate).subscribe({
      next:(disc)=>{
        this.discount = disc;
        this.loading = this.loading.filter((load)=> load !== "discount");
      },
      error:(err)=>{
        console.log(err);
        
        this.loading = this.loading.filter((load)=> load !== "discount");
        this.messageService.add({ severity:'error',detail:err.message, summary:'Une erreur est survenue' });
      }
    });

  }

  getProfile(profile){
    return host+"/profiles/"+profile;
  }

  calculateTheDiscount(service){
    if(service.discount){
      return service.price - (service.price*(service.discount/100));
    }
    return service.price;
  }
}
