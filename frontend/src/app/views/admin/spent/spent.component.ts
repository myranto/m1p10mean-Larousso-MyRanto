import { Component } from '@angular/core';
import { CrudComponent } from 'src/app/public/CrudComponent';
import { Spent } from 'src/app/utils/interfaces/spent';
import { SpentService } from 'src/app/utils/services/admin/spent.service';
import { SpentFormComponent } from './spent-form/spent-form.component';
import { FormComponent } from '../service/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import localeFr from '@angular/common/locales/fr';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
registerLocaleData(localeFr,'fr');

@Component({
  selector: 'app-spent',
  standalone: true,
    imports: [
        FormComponent,
        HttpClientModule,
        CommonModule,
        ButtonModule,
        ConfirmDialogModule,
        TableModule,
        FormsModule,
        InputTextModule
    ],
  templateUrl: './spent.component.html',
  styleUrl: './spent.component.scss'
})
export class SpentComponent extends CrudComponent<Spent,SpentService,SpentFormComponent>{
  constructor(service : SpentService){
    super(service,'Dépense',SpentFormComponent);
  }
}
