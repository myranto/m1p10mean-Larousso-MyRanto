import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces/user";
import {MatCard, MatCardContent} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {PersonService} from "../../services/person/person-service";
import {MatOption, MatSelect} from "@angular/material/select";

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
  person_srv= inject(PersonService)
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
  constructor(private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.role = params['role']
      console.log(params['role'])
      this.person.role=this.role
      if (this.role == 'customer'){
        this.person_srv.findByrole('employe')
          .then(r => {
            this.employe = r
          })
          .catch((error)=>console.log(error.message))
      }
    })
  }
  handleSubmit(){
    console.log(this.person)
    this.person_srv.register(this.person)
      .then((data)=>{
        console.log(data)
      })
      .catch((error)=>this.registerValid = error.message)
  }

}
