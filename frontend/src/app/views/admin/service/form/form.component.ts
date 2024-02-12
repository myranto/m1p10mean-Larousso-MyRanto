import { Component} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import { CrudFormComponent } from '../../../../public/CrudFormComponent';
import {Service, ServiceService} from "../../../../utils/services/admin/service.service";

@Component({
  selector: 'service-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent extends CrudFormComponent<Service,ServiceService>{
  constructor(service : ServiceService){
    super(service);
    this.form = this.formBuilder.group({
      name:[this.model ? this.model.name : null,[Validators.required]],
      price:[this.model ? this.model.price : null,[Validators.min(1)]],
      committee : [this.model ? this.model.committee : null,[Validators.min(0),Validators.max(100)]],
      duration:[this.model ? this.model.duration : null,[Validators.min(0)]]
    });
  }

}
