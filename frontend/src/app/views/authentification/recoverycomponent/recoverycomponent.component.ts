import {Component, inject, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {User} from "../../../utils/interfaces/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../utils/services/person/auth-service";
import {CardModule} from "primeng/card";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-recoverycomponent',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    CardModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './recoverycomponent.component.html',
  styleUrl: './recoverycomponent.component.scss'
})
export class RecoverycomponentComponent {
  person ={
    mail:'',
    password:'',
  }
  loading = false
  user = inject(AuthService)
  action = 'sendMail'
  confirmPassword=''
  password_message:any=null
  error=''
  constructor(private route:ActivatedRoute,private router: Router ) {

  }
  async goBack() {
    if (this.action == 'modify')
      this.action = 'sendMail';
    else
      await this.router.navigate(['/'])
  }
  async handleSubmit() {
    switch (this.action) {
      case 'sendMail':
        this.action = 'modify'
        break
      case 'modify':
        if (this.person.password!=this.confirmPassword) {
          this.password_message = 'Les mots de passe ne correspondent pas'
            this.loading = false
          console.log(this.password_message)
        }
        else {
            this.loading = true
          this.user.recoverypassword(this.person)
            .then(async (data) => {
            alert(data)
                this.loading = false
            await this.router.navigate(['/'])
          })
            .catch((error) => {
                this.loading = false
                this.error = error.message
            })
        }
        break
      default:
        this.error = 'action non reconnu'
          this.loading = false
        break
    }
  }
  }
