import {ChangeDetectorRef, Component} from '@angular/core';
import {Discount} from "../../../utils/interfaces/discount";
import {Discountservice} from "../../../utils/services/admin/discountservice";
import {RefreshService} from "../../utils/refresh-service";
import {ListComponent} from "../../utils/list/list.component";
import {FormDiscountComponent} from "./form-discount/form-discount.component";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {formatDate} from "@angular/common";
import {MaxRows} from "../../../../api-request";
@Component({
  selector: 'app-discount',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss'
})
export class DiscountComponent {
    page:number = 0
    row:number = MaxRows
    totalrow:number
  discount_list:Discount[] = []
  constructor(private discount:Discountservice, private refreshService: RefreshService) {
      this.findAll()
      this.drop = this.drop.bind(this)
      this.discount.count()
          .subscribe({
              next:total => this.totalrow = total
          })
      this.updatePage = this.updatePage.bind(this)
    this.refreshService.refresh.subscribe(()=>this.findAll())
  }
    updatePage(newPage,row){
        this.page =newPage
        this.row=row
        this.findAll()
        this.refreshService.triggerRefresh();
    }
  findAll(){
    this.discount.getPaginate(this.page,this.row).subscribe({
      next:list => this.discount_list = list
    })
  }
  async drop(row:any){
    if (this.discount){
      await this.discount.drop(row._id).toPromise()
      this.refreshService.triggerRefresh()
    }
  }
  column:any = [
    {
      name:'Nom',
      selector:(row:any)=>row?.name,
      sortable:true,
    },
    {
      name:'Pourcentage',
      selector:(row:any)=>row?.percent,
      sortable:true,
    },
    {
      name:'Service',
      selector:(row:any)=>row?.is_service,
      sortable:true,
    },
    {
      name:'Début',
      selector:(row:any)=>  format(new Date(row?.date_start), 'dd MMMM yyyy', {
          locale: fr,
      }),
      sortable:true,
    },
    {
      name:'fin',
      selector:(row:any)=>  format(new Date(row?.date_end), 'dd MMMM yyyy', {
        locale: fr,
      }),
      sortable:true,
    },
  ]
  protected readonly FormDiscountComponent = FormDiscountComponent;
}
