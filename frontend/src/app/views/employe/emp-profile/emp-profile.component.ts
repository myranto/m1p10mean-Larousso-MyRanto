import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { User } from 'src/app/utils/interfaces/user';
import { PersonService } from 'src/app/utils/services/person/person-service';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { host } from 'src/app/utils/services/host';

@Component({
  selector: 'app-emp-profile',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    CommonModule,
    FileUploadModule,
    AvatarModule
  ],
  templateUrl: './emp-profile.component.html',
  styleUrl: './emp-profile.component.scss'
})
export class EmpProfileComponent {
  employe : User;
  fb : FormGroup;
  selectedPicture;

  constructor(private personService : PersonService,private messageService : MessageService,private builder : FormBuilder){
    this.personService.findInTheSession().subscribe((emp)=>{
      this.employe = emp;
      this.fb = this.builder.group({
        mail : [this.employe.mail,[Validators.required,Validators.email]],
        name : [this.employe.name,[Validators.required]],
        startTime : [ this.employe.start_time.hours+':'+this.employe.start_time.minutes,[Validators.required]],
        endTime:[this.employe.end_time.hours+':'+this.employe.end_time.minutes,[Validators.required]]
      });
    });
  }
  updateProfile(){
    if(this.fb.invalid){
      this.messageService.add({summary:"Erreur",detail:"Toutes les champs sont obligatoires",severity:"error"});
    }else{
      this.employe.mail = this.fb.value.mail;
      this.employe.name = this.fb.value.name;
      let start_time = new Date(this.fb.value.startTime);
      if(!isNaN(start_time.getTime())){
        this.employe.start_time = {
          hours : start_time.getHours(),
          minutes:start_time.getMinutes()
        }
      }
      let end_time = new Date(this.fb.value.endTime);
      if(!isNaN(end_time.getTime())){
        this.employe.end_time = {
          hours : end_time.getHours(),
          minutes : end_time.getMinutes() 
        }
      }
      this.personService.update(this.employe).then(()=>
        this.messageService.add({summary:"Réussie",detail:"Les modifications ont été enregistrées",severity:"success"})
      ).catch((err)=>
        this.messageService.add({summary:"Erreur",detail:"Les données sont invalides",severity:"error"})
      );
    }
  }

  getProfile(){
    return host+"/profiles/"+this.employe?.profile;
  }

  getUrl(){
    return host+"/user/profile/"+this.employe?._id;
  }

  onUpload(event){
    let file = event.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result;
      }
      reader.readAsDataURL(file);
    }
    this.messageService.add({severity:'success',summary:"Photo changée"})
  }
}
