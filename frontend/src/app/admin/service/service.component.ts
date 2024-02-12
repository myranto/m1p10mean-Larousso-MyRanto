import { Component} from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CrudComponent } from '../../public/CrudComponent';

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