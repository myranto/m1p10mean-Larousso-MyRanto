import { Component} from '@angular/core';
import { Service } from '../../interfaces/service';
import { ServiceService } from '../../services/admin/service.service';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    FormComponent,
    HttpClientModule,
    CommonModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent{
  models : Service[] = [];

  constructor (private service : ServiceService, private dialogService : DialogService,private confirmationService: ConfirmationService,private messageService : MessageService){
    this.service.get().subscribe({
      next:list => this.models = list
    })
  }
  showAddElement(){
    let ref = this.dialogService.open(FormComponent,{
      header:'Ajout de service'
    });
    ref.onClose.subscribe(result=>{
      if(result){
        this.models.push(result);
      }
    })
  }
  showUpdateElement(model : Service){
    let ref = this.dialogService.open(FormComponent,{
      header:'Modification de service',
      data:{
        model:model,
        update:true
      }
    })
    ref.onClose.subscribe((result)=>{
      if(result){
        model.name = result.name;
        model.price = result.price;
        model.committee = result.committee;
        model.duration = result.duration;
      }
    });
  }
  dropElement(model : Service){
    this.confirmationService.confirm({
      header:"Confirmation de la suppresion",
      message:"Voulez vous vraiment supprimer le service "+model.name,
      acceptLabel:"Confirmer",
      accept : ()=>{
        this.service.drop(model._id!).subscribe({
          error: (e)=>{
            this.messageService.add({severity:'error',summary:'Erreur',detail:e.error});
          },
          next: ()=> {
            this.messageService.add({severity:'success',summary:'Réussi',detail:`Service ${model.name} supprimé avec succée`});
            this.models = this.models.filter((tmp)=> tmp._id !== model._id)
          }
        });
      },
      acceptButtonStyleClass:"p-button-danger",
      rejectLabel:"Annuler"
    })
  }
}