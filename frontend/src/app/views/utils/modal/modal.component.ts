import {Component, Input, OnDestroy, Type} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {Footer, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {Base} from "../base";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ButtonModule,
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnDestroy{
  @Input() MyComponent!:Type<Base>
  @Input() update:boolean = false
  @Input() model!:any

  constructor(public dialogService: DialogService, public messageService:MessageService) {
  }
  ref:DynamicDialogRef|undefined
  show(){
    this.ref = this.dialogService.open(this.MyComponent,{
      // header: 'Select a Product',
      width: '50vw',
      data:{
        update:this.update,
        model:this.model
      },
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
      templates: {
        footer: Footer
      }
    })
    this.ref.onClose.subscribe((data: any) => {
      console.log(data)
      if (data) {
        this.messageService.add({ severity: 'success', summary: this.update?'Modification réussi':'Action réussi', detail: data });
      }
    });
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

}
