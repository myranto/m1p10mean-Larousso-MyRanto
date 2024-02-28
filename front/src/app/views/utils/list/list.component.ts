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
import {PaginatorModule} from "primeng/paginator";
import {InputTextModule} from "primeng/inputtext";
import {SkeletonModule} from "primeng/skeleton";
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
        RippleModule,
        PaginatorModule,
        InputTextModule,
        SkeletonModule
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
    @Input() updatePage!:any
    @Input() totalRow!:number
    @Input() acceptNew:boolean = true
    @Input() searchBar:any
    @Input() loaded=false
    text:string=''
    current_page = 0
    skeletons = new Array(5);
    rows = 5
  constructor(private router: Router) {}
  async onRowClick(rowData: any) {

    if (this.isLink) {
      const path = this.clicked(rowData)
      await this.router.navigate([path])
    }
    else this.clicked(rowData)
  }
  changePage(event){
      if (this.updatePage) {
          console.log(event.page)
          this.current_page = event.page
          this.rows= event.rows
          this.updatePage(event.page, event.rows)
      }
  }

}
