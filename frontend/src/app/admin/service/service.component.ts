import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    MatTableModule,
    FormComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  models : Service[] = [];
  headers : string[] = ['name','duration','committee','price','actions'];
  state : string = 'idle';
  error : string = '';
  private service : ServiceService = inject(ServiceService);

  constructor ( public dialog : MatDialog){  
    this.service.get().then(serviceList => this.models = serviceList).catch((e) => {this.state = 'error'; this.error = e});
  }
  openFormForAdd() : void{
    const dialogRef = this.dialog.open(FormComponent,{data:{name:'',price:0,committee:0,duration:0}});
  }
  openEditForm(model : Service) : void {
    const dialogRef = this.dialog.open(FormComponent,{data: model});
  }
}