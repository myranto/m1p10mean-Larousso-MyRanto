import {Component, inject} from '@angular/core';
import {Base} from "../../../utils/base";
import {Discountservice} from "../../../../utils/services/admin/discountservice";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Discount} from "../../../../utils/interfaces/discount";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {CheckboxModule} from "primeng/checkbox";
import {ModalComponent} from "../../../utils/modal/modal.component";

@Component({
  selector: 'app-form-discount',
  standalone: true,
    imports: [
        InputTextModule,
        RadioButtonModule,
        FormsModule,
        CalendarModule,
        InputNumberModule,
        CheckboxModule,
        ReactiveFormsModule
    ],
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
    is_service:'true',
    date_start:'',
    date_end:new Date(),
  }
  discount_srv = inject(Discountservice)

  constructor(private config: DynamicDialogConfig) {
    super()
    this.model = this.config?.data?.model ? this.config.data.model : this.discount
      if (this.config?.data?.model)
          this.model.date_start = new Date(this.model.date_start)
          this.model.date_end = new Date(this.model.date_end)
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
    verifierDate(date1: Date, date2: Date): boolean {
        return date1.getTime() < date2.getTime();
    }
    override  submit() {
    const res = this.update ? 'modification effectué, ' + this.model?.name : 'Création effectuée avec succès'
    try {
        if(!this.model.name||!this.model.percent) throw new Error('Veuillez remplir les champs')
        if (!this.verifierDate(new Date(this.model.date_start),new Date(this.model.date_end))) throw new Error('la date début doit etre inférieur à date fin')
      if (this.update) {
         this.updateModel()
      } else {
         this.create()
      }
      this.data = res
      super.submit()
    } catch (e: any) {
      this.messageService.add({ severity: 'error', summary: "Erreur d'entrée", detail: e.message })
    }
  }
}
