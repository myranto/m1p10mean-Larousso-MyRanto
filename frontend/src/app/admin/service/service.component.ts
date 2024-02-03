import { Component, OnInit, inject } from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../public/error/error.component';
import { ErrorService } from '../../services/public/error.service';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    FormComponent,
    ErrorComponent,
    HttpClientModule,
    CommonModule,
    TableModule,
    SkeletonModule,
    ButtonModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent{
  models : Service[] = [];
  state : string = "idle";
  create : boolean = false;

  constructor (private errorService : ErrorService,private service : ServiceService){
    this.service.get().subscribe({
      next:list => this.models = list
    })
  }

  showCreate(){
    this.create = true;
  }
  closeCreate(){
    this.create = false;
  }
}