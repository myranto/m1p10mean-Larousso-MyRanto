import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EmpAvg } from 'src/app/utils/interfaces/emp-avg';
import { DashboardService } from 'src/app/utils/services/admin/dashboard.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { host } from 'src/app/utils/services/host';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppointmentDay } from 'src/app/utils/interfaces/appointment-day';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { AppointmentMonth } from 'src/app/utils/interfaces/appointment-month';
import { Sell } from 'src/app/utils/interfaces/sell';
import { SellMonth } from 'src/app/utils/interfaces/sell-month';
import { BonusMonth } from 'src/app/utils/interfaces/bonus-month';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    TableModule,
    AvatarModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    ChartModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit{
  loadings : string[] = [];
  empAvg : EmpAvg[] = [];
  appointmentDay : AppointmentDay[] = [];
  appointmentDayChart:any;
  appointmentMonth : AppointmentMonth[] = [];
  appointmentMonthChart : any;
  appointmentDayFiter : FormGroup;
  sellDay : Sell[] = [];
  sellDayFilter : FormGroup;
  sellDayChart : any;
  sellMonth : SellMonth[] = [];
  sellMonthChart : any;
  bonusMonth : BonusMonth[] = [];
  bonusMonthChart: any = [];

  constructor(private adminService : DashboardService,private messageService : MessageService,builder : FormBuilder){
    this.appointmentDayFiter = builder.group({
      start:[""],
      end:[""]
    });
    this.sellDayFilter = builder.group({
      start:[""],
      end:[""]
    });
  }

  ngOnInit(): void {
    this.loadings.push("emp-avg");
    this.loadings.push("app-day");
    this.loadings.push('app-month');
    this.loadings.push('sell-day');
    this.loadings.push('sell-month');
    this.loadings.push('bonus-month');

    this.adminService.getEmpAvg().subscribe(
      {
        error:(err)=>{
          this.removeLoading("emp-avg");
          this.messageService.add({summary:"Erreur",detail:err.errors,severity:"error"})
        },
        next:(next)=>{
          this.removeLoading("emp-avg");
          this.empAvg = next;
        }
      }
    );
    this.adminService.getAppointmentPerDay().subscribe({
      error:(err)=>{
        this.removeLoading('app-day');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('app-day');
        this.appointmentDay = list;
        this.appointmentDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.count ),
              label:"Nombre de rendez-vous par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });

    this.adminService.getSellPerDay().subscribe({
      error:(err)=>{
        this.removeLoading('sell-day');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('sell-day');
        this.sellDay = list;
        console.log(list);
        this.sellDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.balance ),
              label:"Chiffre d'affaire par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });

    this.adminService.getAppointmentPerMonth().subscribe({
      error:(err)=>{
        this.removeLoading('app-month');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('app-month');
        this.appointmentMonth = list;
        this.appointmentMonthChart = {
          labels: list.map((value)=>{
            let dateRepresent = new Date(value._id.year,value._id.month-1,1);
            return dateRepresent.toLocaleString('fr-FR',{month:'long',year:"numeric"})
          }),
          datasets:[
            {
              data : list.map((value) => value.count ),
              label:"Nombre de rendez-vous par mois",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });

    this.adminService.getSellPerMonth().subscribe({
      error:(err)=>{
        this.removeLoading('sell-month');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('sell-month');
        this.sellMonth = list;
        this.sellMonthChart = {
          labels: list.reverse().map((value)=>{
            let dateRepresent = new Date(value._id.year,value._id.month-1,1);
            return dateRepresent.toLocaleString('fr-FR',{month:'long',year:"numeric"})
          }),
          datasets:[
            {
              data : list.reverse().map((value) => value.balance ),
              label:"Chiffre d'affaire par mois",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });

    this.adminService.getBonusMonth().subscribe({
      error:(err)=>{
        this.removeLoading('bonus-month');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('bonus-month');
        this.bonusMonth = list;
        this.bonusMonthChart = {
          labels: list.reverse().map((value)=>{
            let dateRepresent = new Date(value._id.year,value._id.month-1,1);
            return dateRepresent.toLocaleString('fr-FR',{month:'long',year:"numeric"})
          }),
          datasets:[
            {
              data : list.reverse().map((value) => value.spent ),
              label:"Dépense",
              borderColor: 'red',
              fill:false
            },
            {
              data : list.reverse().map((value) => value.sell ),
              label:"Chiffre d'affaire",
              borderColor: 'green',
              fill:false
            },
            {
              data : list.reverse().map((value) => value.balance ),
              label:"Bénéfice",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });

  }

  private removeLoading(name: string) : void{
    this.loadings =  this.loadings.filter((loading)=> loading !== name);
    
  }
  isLoading(name : string) : boolean{
    return !!this.loadings.find((value)=> value === name );
  }

  getProfile(emp){
    return host+"/profiles/"+emp?.profile;
  }

  filterAppointmentDay(){
    this.loadings.push('app-day');
    this.adminService.getAppointmentPerDay(this.appointmentDayFiter.value.start,this.appointmentDayFiter.value.end).subscribe({
      error:(err)=>{
        this.removeLoading('app-day');
        this.messageService.add({summary:"Erreur",detail:err.errors,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('app-day');
        this.appointmentDay = list;
        this.appointmentDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.count ),
              label:"Nombre de rendez-vous par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    })
  }

  filterSellPerDay(){
    this.loadings.push('sell-day');
    this.adminService.getSellPerDay(this.sellDayFilter.value.start,this.sellDayFilter.value.end).subscribe({
      error:(err)=>{
        this.removeLoading('sell-day');
        this.messageService.add({summary:"Erreur",detail:err.errors,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('sell-day');
        this.sellDay = list;
        this.sellDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.balance ),
              label:"Chiffre d'affaire par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    })
  }
  clearSellPerDay(){
    this.adminService.getSellPerDay().subscribe({
      error:(err)=>{
        this.removeLoading('sell-day');
        this.messageService.add({summary:"Erreur",detail:err.message,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('sell-day');
        this.sellDay = list;
        this.sellDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.balance ),
              label:"Chiffre d'affaire par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    });
  }

  clearAppointmentDay(){

    this.loadings.push('app-day');
    this.adminService.getAppointmentPerDay().subscribe({
      error:(err)=>{
        this.removeLoading('app-day');
        this.messageService.add({summary:"Erreur",detail:err.errors,severity:"error"})
      },
      next:(list)=>{
        this.removeLoading('app-day');
        this.appointmentDay = list;
        this.appointmentDayChart = {
          labels: list.reverse().map((value)=> value._id),
          datasets:[
            {
              data : list.reverse().map((value) => value.count ),
              label:"Nombre de rendez-vous par jour",
              borderColor: 'blue',
              fill:false
            }
          ]
        };
      }
    })
  }
  formatMonth(month : number){
    let date = new Date(1,month -1 ,1);
    return date.toLocaleString('fr-FR',{month:'long'})
  }
}
