import { Injectable } from '@angular/core';
import { Service } from '../../interfaces/service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../CrudService';
import {host} from "../host";

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends CrudService<Service>{
    constructor(http: HttpClient) {
        super(http,'/service');
    }

    findByDiscount(id:string){
        return this.http.get<Service>(host+this.url+'/discount/'+id, { headers: this.getHeaders() })
    }

    findByDate(date : Date){
        return this.http.get<Service[]>(host+this.url,{ headers:this.getHeaders(), params:{
            date:date.toISOString()
        } })
    }
}
export { Service };

