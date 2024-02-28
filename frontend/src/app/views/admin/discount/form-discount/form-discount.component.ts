import {Component, inject, model} from '@angular/core';
import {Base} from "../../../utils/base";
import {Discountservice} from "../../../../utils/services/admin/discountservice";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {Discount} from "../../../../utils/interfaces/discount";
import {InputTextModule} from "primeng/inputtext";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {CheckboxModule} from "primeng/checkbox";
import {ServiceService} from "../../../../utils/services/admin/service.service";
import {DropdownModule} from "primeng/dropdown";
import {NgIf} from "@angular/common";

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
        ReactiveFormsModule,
        DropdownModule,
        NgIf
    ],
  templateUrl: './form-discount.component.html',
  styleUrl: './form-discount.component.scss'
})
export class FormDiscountComponent extends Base{
  update: boolean = false
  model!: Discount
  options = []
  discount={
    _id:undefined,
    name:'',
    percent:'',
    is_service:'true',
    date_start:'',
    date_end:new Date(),
  }
  discount_srv = inject(Discountservice)
    selected=''
  constructor(private config: DynamicDialogConfig, private srv:ServiceService) {
    super()
    this.model = this.config?.data?.model ? this.config.data.model : this.discount
      if (this.config?.data?.model)
          this.model.date_start = new Date(this.model.date_start)
          this.model.date_end = new Date(this.model.date_end)
    this.update = this.config?.data?.update
      srv.get()
          .subscribe({
              next: value => {
                  this.options = value.map(s => ({
                      label: s.name,
                      value: s._id.toString()
                  }))
              }
          })
      console.log(this.model)
      if (this.model._id){
          srv.findByDiscount(this.model._id)
              .subscribe({
                  next:one=>{
                      this.selected = one ? one._id : ''
                  }
              })
      }
  }

  create(){
    console.log(this.model)
      console.log(this.selected)
    return this.discount_srv.save(this.model,this.selected).subscribe({
      error:e=> {
          this.loading = false
        return Promise.reject(new Error(e?.error ? e.error : e.message))
      },
      next:value=>{
          this.loading = false
        this.model = {
          _id:undefined,
          name:'',
          percent:1,
          is_service:true,
          date_start:null,
          date_end:null,
        }
          this.data = 'Création effectuée avec succès'
          super.submit()
      }
    })
  }
  updateModel(){
    // console.log(this.model)
    //   console.log(this.selected)
    return this.discount_srv.modification(this.model,this.selected).subscribe({
      error:e=> {
          this.loading = false
        return Promise.reject(new Error(e?.error ? e.error : e.message))
      },
      next:value=>{
          this.loading = false
          this.data = 'modification effectué, ' + this.model?.name
          super.submit()
      }
    })
  }
    verifierDate(date1: Date, date2: Date): boolean {
        return date1.getTime() < date2.getTime();
    }
    override  submit() {
      this.loading = true
    try {
        if(!this.model.name||!this.model.percent) {
            this.loading = false
            throw new Error('Veuillez remplir les champs')
        }
        if (!this.verifierDate(new Date(this.model.date_start),new Date(this.model.date_end))) {
            this.loading = false
            throw new Error('la date début doit etre inférieur à date fin')
        }
      if (this.update) {
         this.updateModel()
      } else {
         this.create()
      }

    } catch (e: any) {
      this.messageService.add({ severity: 'error', summary: "Erreur d'entrée", detail: e.message })
    }
  }
}
