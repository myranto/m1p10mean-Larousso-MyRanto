import { FormBuilder,FormGroup } from '@angular/forms';
import {DynamicDialogRef,DynamicDialogConfig} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { inject } from '@angular/core';
import {CrudService} from "../utils/services/CrudService";
import {RefreshService} from "../views/utils/refresh-service";
import {HasId} from "../utils/interfaces/hasId";

export class CrudFormComponent<T extends HasId,S extends CrudService<T>>{
  model! : T;
  update : boolean = false;
  loading = false;

  protected formBuilder : FormBuilder = inject(FormBuilder);
  protected ref : DynamicDialogRef = inject(DynamicDialogRef);
  protected config : DynamicDialogConfig = inject(DynamicDialogConfig);
  protected messageService : MessageService = inject(MessageService);
  protected refreshService: RefreshService = inject(RefreshService)
  protected service : S;
  form! : FormGroup;

  constructor(service : S){
    this.service = service;
    this.model = this.config.data?.model;
    this.update = this.config.data?.update;
  }

  onSubmit(){
    this.loading = true;
    const temp : T = {} as T;
    Object.assign(temp,this.form.value);

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
          this.messageService.add({severity:'success',summary:'Succés',detail:'Modification réussie'});
          this.refreshService.triggerRefresh();
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
          this.messageService.add({severity:'success',summary:'Succés',detail:'Création réussie'});
          this.refreshService.triggerRefresh();
          this.ref.close(created);
        }
      });
    }
  }

  onCancel(){
    this.ref.close();
  }
}
