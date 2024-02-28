import {Component, Input} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-delete-row',
  standalone: true,
  imports: [
    ToastModule,
    ConfirmDialogModule,
    NgIf
  ],
  templateUrl: './delete-row.component.html',
  styleUrl: './delete-row.component.scss'
})
export class DeleteRowComponent {
  @Input() row:any
  @Input() name!:string
  @Input() delete!:any
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirm2() {
    this.confirmationService.confirm({
      message: 'voulez-vous vraiment supprimer '+this.row[this.name],
      header: 'Suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        try {
          this.delete(this.row)
          this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Enregistrement supprimer' });
        }catch (e:any) {
          this.messageService.add({ severity: 'error', summary: 'Erreur !', detail: e?.message });
        }
      },
    });
  }
}
