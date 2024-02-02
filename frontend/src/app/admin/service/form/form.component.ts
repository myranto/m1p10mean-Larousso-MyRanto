import { Component, Inject, Input } from '@angular/core';
import { Service } from '../../../interfaces/service';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'service-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() model! : Service;
  form : FormGroup;
  constructor(private formBuilder : FormBuilder){
    this.form = this.formBuilder.group({
      name:[this.model ? this.model.name : '',[Validators.required]],
      price:[this.model ? this.model.price : 1,[Validators.min(1)]],
      committee : [this.model ? this.model.committee : 0,[Validators.min(0),Validators.max(100)]],
      duration:[this.model ? this.model.duration : 0,[Validators.min(0)]]
    });
  }

  onSubmit(){
    if(this.form.valid){
      
    }
  }
}
