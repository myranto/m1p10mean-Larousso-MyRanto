import { Component } from '@angular/core';
import {format, startOfWeek} from "date-fns";
import {fr} from "date-fns/locale";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "primeng/api";
import {DataViewModule} from "primeng/dataview";
import {ButtonModule} from "primeng/button";
import {getProfileStorage, MaxRows} from "../../../../api-request";
import {Discountservice} from "../../../utils/services/admin/discountservice";
import {Discount} from "../../../utils/interfaces/discount";
import {RefreshService} from "../../utils/refresh-service";
import {PaginatorModule} from "primeng/paginator";
import {Appointment} from "../../../utils/interfaces/appointment";
import {AppointmentService} from "../../../utils/services/customer/appointment.service";
import {TableModule} from "primeng/table";
import {DetailsComponent} from "../appointment/details/details.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-home-customer',
  standalone: true,
    imports: [
        NgForOf,
        SharedModule,
        DataViewModule,
        ButtonModule,
        PaginatorModule,
        DatePipe,
        NgIf,
        TableModule
    ],
  templateUrl: './home-customer.component.html',
  styleUrl: './home-customer.component.scss'
})
export class HomeCustomerComponent {
    current_date
    page:number = 0
    row:number = MaxRows
    totalrow:number
    totalAppointments:number
    user:any
    discount_list:Discount[] = []
    appointment_list:Appointment[] = []
    selectedAppointment : Appointment;

    constructor(private discount:Discountservice,private service : AppointmentService,private dialogService : DialogService,private refreshService: RefreshService) {
        let date = new Date();
        let startOfWeekDate = startOfWeek(date, { locale: fr });
        this.current_date = `${format(startOfWeekDate, 'd MMMM yyyy', { locale: fr })}`;
        this.findAllDiscount()
        this.user = getProfileStorage()
        this.service.byCustomer(this.user.id,0,true).subscribe((next)=>{
            console.log(next)
            this.appointment_list = next
        });
        this.service.countByCustomer(this.user.id,true).subscribe((next)=> {
            this.totalAppointments = next
        });
        this.refreshService.refresh.subscribe(()=>this.findAllDiscount())
    }
    showDetail(){
        this.dialogService.open(DetailsComponent,{
            data:{
                appointment:this.selectedAppointment
            },
            header:'Détail du rendez-vous',
            style:{
                width:'100%'
            }
        }).onClose.subscribe((value)=>{
            console.log(value);

            this.selectedAppointment.payment = value.payment;
        });
    }
    updatePage(event){
        this.page =event.page
        this.row=event.rows
        this.findAllDiscount()
        this.refreshService.triggerRefresh();
    }
    changePage(event){
        this.service.byCustomer(this.user.id,event.page,true).subscribe((next)=>{
            this.appointment_list = next
        });
    }
    findAllDiscount(){
        this.discount.paginateWeekDiscount(this.page,this.row)
            .subscribe({
                next:data => {
                    this.totalrow = data?.total
                    this.discount_list = data?.data
                }
            })
    }
    formatDate(date){
        return format(new Date(date), 'dd MMMM yyyy', {
            locale: fr,
        })
    }
    calculateTotal(appointment : Appointment){
        let total = 0;
        appointment.services.forEach((srv)=>{
            total += srv.price;
        });
        return total;
    }

    calculateTotalMinutes(appointment : Appointment){
        let total = 0;
        appointment.services.forEach((srv)=>{
            total += srv.duration;
        });
        return total;
    }
    protected readonly Date = Date;
    protected readonly fr = fr;
}
