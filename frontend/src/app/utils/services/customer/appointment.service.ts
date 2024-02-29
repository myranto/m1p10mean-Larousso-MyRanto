import { Injectable } from '@angular/core';
import { CrudService } from '../CrudService';
import { Appointment } from '../../interfaces/appointment';
import { HttpClient } from '@angular/common/http';
import { host } from '../host';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CrudService<Appointment> {

  constructor(httpClient : HttpClient) {
    super(httpClient,'/appointment');
  }

  byCustomer(id : string,page? : number, week = null){
    return this.http.get<Appointment[]>(host+this.url,{params:{customer:id,page: page ? page : 0,week:week},headers: this.getHeaders()});
  }
  countByCustomer(id : string, week = null){
    return this.http.get<number>(host+this.url+'/count',{params:{customer:id,week:week},headers: this.getHeaders()});
  }
  byEmp(id : string,page? : number){
    return this.http.get<Appointment[]>(host+this.url,{params:{employe : id,page: page ? page : 0},headers: this.getHeaders()});
  }
  countByEmp(id : string){
    return this.http.get<number>(host+this.url+'/count',{params:{employe : id},headers: this.getHeaders()});
  }
  calendar(role:string,id:string,mode:string,date:string){
      return this.http.get<any[]>(host+this.url+'/calendar',{params:{role : role, id:id, mode: mode, date: date},headers: this.getHeaders()})
  }
  updateDateEvent(id,form){
      return this.http.put(host+this.url+'/date/'+id,form,{ headers: this.getHeaders() })
  }
  pay(model : Appointment){
    return this.http.post(host+"/payment",{appointment:model._id},{headers:this.getHeaders()});
  }
  findTaskByDay(day:any, id:string){
      return this.http.get<any>(host+this.url+'/commission',{params:{ id:id,  date: day},headers: this.getHeaders()})
  }
  filterCLI(object):Observable<Appointment[]>{
      return this.http.post<Appointment[]>(host+this.url+'/filter',object,{headers: this.getHeaders()})
  }
}
