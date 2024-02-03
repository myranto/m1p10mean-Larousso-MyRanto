import { Component} from '@angular/core';
import { Service } from '../../../interfaces/service';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {DynamicDialogRef,DynamicDialogConfig} from 'primeng/dynamicdialog';
import {InputGroupModule} from 'primeng/inputgroup';
import { ServiceService } from '../../../services/admin/service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'service-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent{
  model! : Service;
  update : boolean = false;
  loading = false;

  form! : FormGroup;

  constructor(private formBuilder : FormBuilder,private ref : DynamicDialogRef,private config : DynamicDialogConfig,private service : ServiceService,private messageService : MessageService){
    this.model = this.config.data?.model;
    this.update = this.config.data?.update;
    this.form = this.formBuilder.group({
      name:[this.model ? this.model.name : null,[Validators.required]],
      price:[this.model ? this.model.price : null,[Validators.min(1)]],
      committee : [this.model ? this.model.committee : null,[Validators.min(0),Validators.max(100)]],
      duration:[this.model ? this.model.duration : null,[Validators.min(0)]]
    });
  }


  onSubmit(){
    this.loading = true;
    const {name,price,committee,duration} : {name:string,committee:number,price:number,duration:number} = this.form.value;
    const temp : Service = {
      _id : undefined,
      name,
      price,
      committee,
      duration
    };
    if(this.update){
      temp._id = this.model._id;
    }
    if(this.update){
      this.service.update(temp).subscribe({
        error : (e)=>{
          console.log(e);
          this.loading = false;
          this.messageService.add({severity:'error',summary:'Une erreur est survenue',detail:e.error})
        },
        next : () =>{
          this.loading = false;
          this.messageService.add({severity:'success',summary:'Succés',detail:'Service modifié avec succés'});
          this.ref.close(temp);
        }
      })
    }else{
      this.service.create(temp).subscribe({
        error : (e)=>{
          console.log(e);
          this.loading = false;
          this.messageService.add({severity:'error',summary:'Une erreur est survenue',detail:e.error})
        },
        next: (created) => {
          this.loading = false;
          this.messageService.add({severity:'success',summary:'Succés',detail:'Service ajoutée avec succés'});
          this.ref.close(created);
        }
      });
    }
  }

  onCancel(){
    this.ref.close();
  }
}
