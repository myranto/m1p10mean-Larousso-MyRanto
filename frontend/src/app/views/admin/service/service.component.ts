import { Component} from '@angular/core';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrudComponent } from '../../../public/CrudComponent';
import {Service} from "../../../utils/interfaces/service";
import {ServiceService} from "../../../utils/services/admin/service.service";

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    FormComponent,
    HttpClientModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent extends CrudComponent<Service,ServiceService,FormComponent>{

  constructor (service : ServiceService){
    super(service,'service',FormComponent);
  }
}
