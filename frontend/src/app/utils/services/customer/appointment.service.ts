import { Injectable } from '@angular/core';
import { CrudService } from '../CrudService';
import { Appointment } from '../../interfaces/appointment';
import { HttpClient } from '@angular/common/http';
import { host } from '../host';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends CrudService<Appointment> {

  constructor(httpClient : HttpClient) {
    super(httpClient,'/appointment');
  }

  byCustomer(id : string,page? : number){
    return this.http.get<Appointment[]>(host+this.url,{params:{customer:id,page: page ? page : 0},headers: this.getHeaders()});
  }
  countByCustomer(id : string){
    return this.http.get<{count:number}>(host+this.url+'/count',{params:{customer:id},headers: this.getHeaders()});
  }
  byEmp(id : string,page? : number){
    return this.http.get<Appointment[]>(host+this.url,{params:{employe : id,page: page ? page : 0},headers: this.getHeaders()});
  }
  countByEmp(id : string){
    return this.http.get<{count:number}>(host+this.url+'/count',{params:{employe : id},headers: this.getHeaders()});
  }
}
