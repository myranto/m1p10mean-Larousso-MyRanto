import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../services/person/auth-service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  constructor(private router: Router  ) {}
  handleSubmit(){
    const form = {
      mail:this.username,
      password:this.password
    }
    console.log(form)
    this.auth.login(form)
      .then(async (data) => {
        // const expiryDate = new Date().getTime() + 12 * 60 * 60 * 1000;
        // localStorage.setItem('expiryDate', String(expiryDate));
        localStorage.setItem('person_profil', JSON.stringify(data))
        if (typeof data !== "string")
          switch (data.role) {
            case 'admin':
              await this.router.navigate(['/admin/home'])
              break
            case 'employe':
              await this.router.navigate(['/employe/employe-component'])
              break
            default:
              await this.router.navigate(['/customer/home-customer'])
              break
          }

      })
      .catch((error)=>this.loginValid = error.message)

  }
}
