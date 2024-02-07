import {ChangeDetectorRef, Component} from '@angular/core';
import {Discount} from "../../interfaces/discount";
import {Discountservice} from "../../services/admin/discountservice";
import {RefreshService} from "../../utils/refresh-service";
import {ListComponent} from "../../utils/list/list.component";
import {FormDiscountComponent} from "./form-discount/form-discount.component";

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
  discount_list:Discount[] = []
  constructor(private discount:Discountservice, private refreshService: RefreshService) {
    this.refreshService.refresh.subscribe(()=>this.findAll())
  }
  findAll(){
    this.discount.get().subscribe({
      next:list => this.discount_list = list
    })
  }
  async drop(row:any){
    if (this.discount){
      await this.discount.drop(row._id)
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
      selector:(row:any)=>row?.date_start,
      sortable:true,
    },
    {
      name:'fin',
      selector:(row:any)=>row?.date_end,
      sortable:true,
    },
  ]
  protected readonly FormDiscountComponent = FormDiscountComponent;
}
