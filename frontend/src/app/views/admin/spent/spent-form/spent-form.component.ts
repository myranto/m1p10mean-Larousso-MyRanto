import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CrudFormComponent } from 'src/app/public/CrudFormComponent';
import { Spent } from 'src/app/utils/interfaces/spent';
import { SpentService } from 'src/app/utils/services/admin/spent.service';
import { TypeCostService } from 'src/app/utils/services/admin/type-cost.service';
import {TypeCost} from "../../../../utils/interfaces/type-cost";

@Component({
  selector: 'app-spent-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule
  ],
  templateUrl: './spent-form.component.html',
  styleUrl: './spent-form.component.scss'
})
export class SpentFormComponent extends CrudFormComponent<Spent,SpentService>{
  types : TypeCost[];
  constructor(service : SpentService,typeCostService : TypeCostService){
    super(service);
    typeCostService.get().subscribe((list)=> this.types = list);
    this.form = this.formBuilder.group({
      label : [this.model ? this.model.label : null,[Validators.required]],
      date : [this.model ? new Date(this.model.date) : null, [Validators.required]],
      type : [this.model ? this.model.type._id : null, [Validators.required]],
      amount: [this.model ? this.model.amount : null , [Validators.required]]
    });
  }
}
