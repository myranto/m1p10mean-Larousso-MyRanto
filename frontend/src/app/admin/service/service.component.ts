import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog'
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    MatTableModule,
    FormComponent,
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {
  models : Service[] = [];
  headers : string[] = ['name','duration','committee','price'];
  state : string = 'idle';
  error : string = '';
  private service : ServiceService = inject(ServiceService);

  constructor (){  
    this.service.get().then(serviceList => this.models = serviceList).catch((e) => {this.state = 'error'; this.error = e});
  }
}
