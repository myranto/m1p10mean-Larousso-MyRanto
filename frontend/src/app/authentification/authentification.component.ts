import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../services/person/auth-service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatButton,
    NgIf
  ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss'
})
export class AuthentificationComponent {
    public loginValid = null
    public username = ''
    public password = ''
    auth = inject(AuthService)
  handleSubmit(){
    const form = {
      mail:this.username,
      password:this.password
    }
    console.log(form)
    this.auth.login(form)
      .then((data)=>{
           localStorage.setItem('person_profil',JSON.stringify(data))
       })
      .catch((error)=>this.loginValid = error.message)

  }
}
