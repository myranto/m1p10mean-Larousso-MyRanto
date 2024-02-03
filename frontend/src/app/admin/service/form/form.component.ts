import { Component, Input } from '@angular/core';
import { Service } from '../../../interfaces/service';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import {DialogModule} from 'primeng/dialog';
import {InputGroupModule} from 'primeng/inputgroup';

@Component({
  selector: 'service-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    InputGroupModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() model! : Service;
  @Input() huhu! : boolean;
  @Input() submitAction! : ((traited : Service)=> Observable<void>);
  @Input() closeAction! : (()=> void);
  @Input() show : boolean;
  loading = false;

  form : FormGroup;
  constructor(private formBuilder : FormBuilder){
    this.show = false;
    this.form = this.formBuilder.group({
      name:[this.model ? this.model.name : '',[Validators.required]],
      price:[this.model ? this.model.price : 1,[Validators.min(1)]],
      committee : [this.model ? this.model.committee : 0,[Validators.min(0),Validators.max(100)]],
      duration:[this.model ? this.model.duration : 0,[Validators.min(0)]]
    });
  }
  onSubmit(){
    this.loading = true;
    this.submitAction(this.form.value).subscribe({
      complete:()=> this.loading = false,
    });
  }
  onCancel(){
    this.closeAction();
  }
}
