import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../utils/services/person/auth-service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {MessageModule} from "primeng/message";

@Component({
  selector: 'app-authentification',
  standalone: true,
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    imports: [
        MatCard,
        MatCardContent,
        MatError,
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatButton,
        NgIf,
        InputTextModule,
        ButtonModule,
        NgOptimizedImage,
        PasswordModule,
        CheckboxModule,
        RippleModule,
        CardModule,
        MessageModule
    ],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss'
})
export class AuthentificationComponent {
    public loginValid = null
    public username = 'mahatokyrafalimanana@gmail.com'
    loading = false
    role='customer'
    public password = 'mahatoky'
    auth = inject(AuthService)
  constructor(private router: Router,private route:ActivatedRoute  ) {
      let params = this.route.snapshot.queryParams;
      this.role = params['role']
      if (this.role==='admin'){
          this.username= 'my.randria@gmail.com'
          this.password = 'myranto'
      }else if (this.role === 'employe'){
          this.username= 'lars.ratovo@gmail.com'
          this.password = 'lars'
      }
  }
  handleSubmit(){
        this.loading = true
    const form = {
      mail:this.username,
      password:this.password
    }
    console.log(form)
    this.auth.login(form)
      .then(async (data) => {
        // const expiryDate = new Date().getTime() + 12 * 60 * 60 * 1000;
        // localStorage.setItem('expiryDate', String(expiryDate));
          this.loading = false
        sessionStorage.setItem('person_profil', JSON.stringify(data))
        if (typeof data !== "string")
          switch (data.role) {
            case 'admin':
              await this.router.navigate(['/views/admin/home'])
              break
            case 'employe':
              await this.router.navigate(['/views/employe/appointment'])
              break
            default:
              await this.router.navigate(['/views/customer/home-customer'])
              break
          }
      })
      .catch((error)=> {
        console.log(error)
          this.loading=false
        this.loginValid = error.message
      })

  }
}
