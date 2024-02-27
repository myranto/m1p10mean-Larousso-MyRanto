import { Component } from '@angular/core';
import { CrudFormComponent } from '../../../../public/CrudFormComponent';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {TypeCostService} from "../../../../utils/services/admin/type-cost.service";
import {TypeCost} from "../../../../utils/interfaces/type-cost";

@Component({
  selector: 'app-form',
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
export class FormComponent extends CrudFormComponent<TypeCost,TypeCostService>{
  constructor(service : TypeCostService){
    super(service);
    this.form = this.formBuilder.group({
      name:[this.model ? this.model.name : null,[Validators.required]]
    });
  }
}
