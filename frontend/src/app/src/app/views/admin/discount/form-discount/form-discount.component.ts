import {Component, inject} from '@angular/core';
import {Base} from "../../../utils/base";
import {Discountservice} from "../../../services/admin/discountservice";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Discount} from "../../../interfaces/discount";

@Component({
  selector: 'app-form-discount',
  standalone: true,
  imports: [],
  templateUrl: './form-discount.component.html',
  styleUrl: './form-discount.component.scss'
})
export class FormDiscountComponent extends Base{
  update: boolean = false
  model!: Discount
  discount={
    _id:undefined,
    name:'',
    percent:'',
    is_service:true,
    date_start:'',
    date_end:null,
  }
  discount_srv = inject(Discountservice)

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) {
    super()
    this.model = this.config?.data?.model ? this.config.data.model : this.discount
    this.update = this.config?.data?.update
  }

  create(){
    console.log(this.model)
    return this.discount_srv.create(this.model).subscribe({
      error:e=> {
        return Promise.reject(new Error(e?.error ? e.error : e.message))
      },
      next:value=>{
        this.model = {
          _id:undefined,
          name:'',
          percent:1,
          is_service:true,
          date_start:null,
          date_end:null,
        }
      }
    })
  }
  updateModel(){
    console.log(this.model)
    return this.discount_srv.update(this.model).subscribe({
      error:e=> {
        return Promise.reject(new Error(e?.error ? e.error : e.message))
      },
      next:value=>{
        console.log('modification réussi!')
      }
    })
  }

  override  submit() {
    const res = this.update ? 'modification effectué, ' + this.model?.name : 'Création effectuée avec succès'
    try {
      if (this.update) {
         this.updateModel()
      } else {
         this.create()
      }
      super.submit()
      this.ref.close(res);
    } catch (e: any) {
      console.log(e)
    }
  }
}
