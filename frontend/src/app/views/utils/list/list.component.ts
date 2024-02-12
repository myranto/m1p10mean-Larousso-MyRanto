import {Component, Input, Type} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Router} from "@angular/router";
import {DeleteRowComponent} from "../delete-row/delete-row.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {ModalComponent} from "../modal/modal.component";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {Base} from "../base";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    TableModule,
    ButtonModule,
    NgIf,
    DeleteRowComponent,
    ConfirmDialogModule,
    ToastModule,
    ModalComponent,
    ToolbarModule,
    RippleModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() data: any = [];
  @Input() column: any = [];
  @Input() trash:any='';
  @Input() edit:any='';
  @Input() header:any='Création';
  @Input() clicked:any;
  @Input() nameDelete!:string;
  @Input() isLink:boolean=true;
  @Input() MyComponent!:Type<Base>

  constructor(private router: Router  ) {}

  async onRowClick(rowData: any) {

    if (this.isLink) {
      const path = this.clicked(rowData)
      console.log(path)
      await this.router.navigate([path])
    }
    else this.clicked(rowData)
  }

}
