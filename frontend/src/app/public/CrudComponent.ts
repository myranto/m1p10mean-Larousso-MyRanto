import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Type, inject } from '@angular/core';
import { CrudFormComponent } from './CrudFormComponent';
import {CrudService} from "../utils/services/CrudService";
import {HasId} from "../interfaces/hasId";

export class CrudComponent <T extends HasId,S extends CrudService<T>,F extends CrudFormComponent<T,S>> {
  models : T[] = [];
  modelName: string;
  protected service : S;
  protected dialogService : DialogService = inject(DialogService);
  protected confirmationService : ConfirmationService = inject(ConfirmationService);
  protected messageService : MessageService = inject(MessageService);
  protected formType;

  constructor (service : S,modelName:string,formType : Type<F>){
    this.modelName = modelName;
    this.service = service;
    this.service.get().subscribe({
      next:list => this.models = list
    });
    this.formType = formType;
  }

  showAddElement(){
    let ref = this.dialogService.open(this.formType,{
      header:'Modification de l\' entité '+this.modelName,
    });
    ref.onClose.subscribe(result=>{
      if(result){
        this.models.push(result);
      }
    })
  }
  showUpdateElement(model : T){
    let ref = this.dialogService.open(this.formType,{
      header:'Modification de l\'entité '+this.modelName,
      data:{
        model:model,
        update:true
      }
    })
    ref.onClose.subscribe((result)=>{
      if(result){
      Object.assign(model,result);
      }
    });
  }
  dropElement(model : T){
    this.confirmationService.confirm({
      header:"Confirmation de la suppresion",
      message:"Voulez vous vraiment supprimer "+model.name,
      acceptLabel:"Confirmer",
      accept : ()=>{
        this.service.drop(model._id!).subscribe({
          error: (e)=>{
            this.messageService.add({severity:'error',summary:'Erreur',detail:e.error});
          },
          next: ()=> {
            this.messageService.add({severity:'success',summary:'Réussi',detail:`Supprimé avec succés`});
            this.models = this.models.filter((tmp)=> tmp !== model)
          }
        });
      },
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"Annuler"
    })
  }
}
