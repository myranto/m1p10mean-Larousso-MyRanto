import {Component, inject, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {MatCardContent} from "@angular/material/card";
import {MessageModule} from "primeng/message";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {User} from "../../../interfaces/user";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Base} from "../../../utils/base";
import {PersonService} from "../../../services/person/person-service";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DropdownModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    MatCardContent,
    MessageModule,
    NgIf,
    PaginatorModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent extends Base {
  confirmPassword = ''
  person_srv = inject(PersonService)
  password_message: any = null
  public registerValid = null
  person: User = {
    _id: null,
    name: '',
    mail: '',
    password: '',
    role: '',
    profile: null,
    prefered_service: null,
    prefered_emp: null,
    start_time: null,
    end_time: null,
  }
  update: boolean = false
  model!: User

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) {
    super()

    this.model = this.config?.data?.model ? this.config.data.model : this.person
    this.update = this.config?.data?.update
    this.model.password = ''
    this.model.role = 'employe'
  }

  matchPassword() {
    return this.person.password == this.confirmPassword
  }

  // @ts-ignore
  create() {
    if (!this.matchPassword()) return Promise.reject(new Error('Les mots de passe ne correspondent pas'))
    else {
      console.log(this.model)
      return this.person_srv.register(this.model)
        .then(async (data) => {
          console.log(data)
          this.model = {
            _id: null,
            name: '',
            mail: '',
            password: '',
            role: 'employe',
            profile: null,
            prefered_service: null,
            prefered_emp: null,
            start_time: null,
            end_time: null,
          }
          this.confirmPassword = ''
        })
        .catch((error) => {
          return Promise.reject(new Error(error.message))
        })
    }
  }
  updateModel(){
    if (!this.matchPassword()) return Promise.reject(new Error('Les mots de passe ne correspondent pas'))
    else {
      console.log(this.model)
      return this.person_srv.update(this.model)
        .then(async (data) => {
          console.log(data)
          this.model.role = 'employe'
          this.confirmPassword = ''
        })
        .catch((error) => {
          return Promise.reject(new Error(error.message))
        })
    }
  }

  override async submit() {
    const res = this.update ? 'modification effectué, ' + this.model?.name : 'Création effectuée avec succès'
    try {
      if (this.update) {
        await this.updateModel()
      } else {
        await this.create()
      }
      // this.refreshService.triggerRefresh();
      super.submit()
      this.ref.close(res);
    } catch (e: any) {
      this.registerValid = e.message
    }
  }

}
