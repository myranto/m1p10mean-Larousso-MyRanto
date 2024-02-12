import { Component } from '@angular/core';
import { CrudComponent } from '../../../public/CrudComponent';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import {TypeCost} from "../../../utils/interfaces/type-cost";
import {TypeCostService} from "../../../utils/services/admin/type-cost.service";

@Component({
  selector: 'app-type-cost',
  standalone: true,
  imports: [
    FormComponent,
    HttpClientModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  templateUrl: './type-cost.component.html',
  styleUrl: './type-cost.component.scss'
})
export class TypeCostComponent extends CrudComponent<TypeCost,TypeCostService,FormComponent>{
  constructor(service : TypeCostService){
    super(service,'type de dépense',FormComponent)
  }
}
