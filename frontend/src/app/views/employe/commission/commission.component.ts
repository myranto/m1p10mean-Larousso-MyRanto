import {Component, EventEmitter, Output} from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {Appointment} from "../../../utils/interfaces/appointment";
import {AppointmentService} from "../../../utils/services/customer/appointment.service";
import {getProfileStorage} from "../../../../api-request";
import {DialogService} from "primeng/dynamicdialog";
import {DetailComponent} from "../emp-appointment/detail/detail.component";
import {host} from "../../../utils/services/host";
import {AvatarModule} from "primeng/avatar";
import {DatePipe} from "@angular/common";
import {TableModule} from "primeng/table";
import {InputGroupModule} from "primeng/inputgroup";

@Component({
  selector: 'app-commission',
  standalone: true,
    imports: [
        CalendarModule,
        PaginatorModule,
        AvatarModule,
        DatePipe,
        TableModule,
        InputGroupModule
    ],
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent {
    current_date = new Date()
    date_com:Date = new  Date()
    appointments : Appointment[];
    selectAppointment : Appointment;
    customer:any
    commission:number
    constructor(private service : AppointmentService, private dialogService : DialogService) {
        this.customer = getProfileStorage()
        this.changeValue()
    }
    showDetail(){
        this.dialogService.open(DetailComponent,{
            data:{
                appointment:this.selectAppointment
            },
            header:'Détail du rendez-vous',
            style:{
                width:'100%'
            }
        }).onClose.subscribe((deleted)=>{
            if(deleted){
                this.appointments = this.appointments.filter((appointment) => appointment !== this.selectAppointment);
            }
        });
    }

    calculateTotal(appointment : Appointment){
        let total = 0;
        appointment.services.forEach((srv)=>{
            total += srv.price;
        });
        return total;
    }

    calculateTotalMinute(appointment : Appointment){
        let total = 0;
        let emp = getProfileStorage()
        appointment.services.forEach((srv)=>{
            if(srv.emp && srv.emp === emp.id){
                total += srv.duration;
            }
        });
        return total;
    }

    calculateCommittee(appointment : Appointment){
        let total = 0;
        let emp = getProfileStorage()
        appointment.services.forEach((srv)=>{
            if(srv.emp && srv.emp?._id === emp.id){
                total += (srv.committee/100) * srv.price;
            }
        });
        return total;
    }
    getProfile(customer){
        return host+"/profiles/"+customer?.profile;
    }
    changeValue(){
        this.service.findTaskByDay(this.date_com, this.customer.id).subscribe((next)=>{
            this.appointments = next.listtask
            console.log(next.listtask)
            this.commission = next.commission
        });
    }
}
