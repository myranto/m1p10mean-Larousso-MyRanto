import { Component, inject } from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../public/error/error.component';
import { ErrorService } from '../../services/public/error.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    FormComponent,
    ErrorComponent,
    HttpClientModule,
    CommonModule,
    TableModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  models : Service[] = [];
  headers : string[] = ['name','duration','committee','price','actions'];
  error : string = '';
  private service : ServiceService = inject(ServiceService);

  constructor (private errorService : ErrorService){  
  }
}