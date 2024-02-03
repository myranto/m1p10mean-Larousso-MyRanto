import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrudService } from '../services/CrudService';
import { HasId } from '../interfaces/hasId';
import { inject } from '@angular/core';

export class CrudComponent <T extends HasId,S extends CrudService<T>> {
  models : T[] = [];
  modelName: string;
  private service : S;
  private dialogService : DialogService = inject(DialogService);
  private confirmationService : ConfirmationService = inject(ConfirmationService);
  private messageService : MessageService = inject(MessageService);

  constructor (service : S,modelName:string){
    this.modelName = modelName;
    this.service = service;
    this.service.get().subscribe({
      next:list => this.models = list
    })
  }
  
  showAddElement(){
    let ref = this.dialogService.open(FormComponent,{
      header:'Modification de l\' entité '+this.modelName
    });
    ref.onClose.subscribe(result=>{
      if(result){
        this.models.push(result);
      }
    })
  }
  showUpdateElement(model : T){
    let ref = this.dialogService.open(FormComponent,{
      header:'Modification de l\'entité '+this.modelName,
      data:{
        model:model,
        update:true
      }
    })
    ref.onClose.subscribe((result)=>{
      if(result){
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