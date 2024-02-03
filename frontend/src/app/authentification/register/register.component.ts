import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {MatCard, MatCardContent} from "@angular/material/card";
import {FormBuilder, FormControl, FormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PersonService} from "../../services/person/person-service";
import {MatOption, MatSelect} from "@angular/material/select";
import {Service, ServiceService} from "../../services/admin/service.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    NgIf,
    MatFormField,
    MatInput,
    MatButton,
    MatError,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  public registerValid = null
  role = 'admin'
  employe:User[] = []
  service_list:Service[] = []
  error_log = ''
  person_srv= inject(PersonService)
  service = inject(ServiceService)
  confirmPassword= ''
  password_message:any= null
  person:User ={
    _id:null,
    name:'',
    mail:'',
    password:'',
    role:'',
    profile:null,
    prefered_service:null,
    prefered_emp:null,
    start_time:null,
    end_time:null,
  }
  matchPassword(){
    return this.person.password == this.confirmPassword
  }
  constructor(private route:ActivatedRoute,private router: Router ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.role = params['role']
      console.log(params['role'])
      this.person.role=this.role
      if (this.role == 'customer'){
        this.service.get()
          .then(r => {
            this.service_list = r
          })
          .catch((error)=> {
            this.error_log = error.message
          })
        this.person_srv.findByrole('employe')
          .then(r => {
            this.employe = r
          })
          .catch((error)=> {
            this.error_log = error.message
          })
      }
    })
  }
  handleSubmit(){
    if (!this.matchPassword()) this.password_message = 'Les mots de passe ne correspondent pas'
    else
    {
    console.log(this.person)
      this.person_srv.register(this.person)
        .then(async (data) => {
          console.log(data)
          if (this.role == 'customer') {
            await this.router.navigate(['/'])
          }
        })
        .catch((error) => this.registerValid = error.message)
    }
  }
}

