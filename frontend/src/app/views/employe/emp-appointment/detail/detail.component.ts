import { CommonModule, registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import localeFr from '@angular/common/locales/fr';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
registerLocaleData(localeFr,'fr');
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  appointment : any;

  constructor(private config : DynamicDialogConfig){
    this.appointment = this.config.data.appointment;
  }
}
