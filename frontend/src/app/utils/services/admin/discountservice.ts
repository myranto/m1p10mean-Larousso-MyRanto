import {CrudService} from "../CrudService";
import {Discount} from "../../interfaces/discount";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {host} from "../host";

@Injectable({
  providedIn: 'root'
})
export class Discountservice extends CrudService<Discount>{
  constructor(http : HttpClient ){
    super(http,"/discount");
  }
    save(body,id){
        const data = {
            ...body,
            ids: id
        };
        return this.http.post<any>(host+this.url,data,{ headers: this.getHeaders() });
    }
    modification(body,id){
        const data = {
            ...body,
            ids: id
        };
        return this.http.put(host+this.url,data,{ headers: this.getHeaders() });
    }
    count():Observable<any>{
      return this.http.get(`${host}${this.url}/count`, { headers: this.getHeaders() })
    }
    getPaginate(page?:number,row?:number) : Observable<Discount[]> {
        const uri = `${host}${this.url}?page=${page}&row=${row}`
        return this.http.get<Discount[]>(uri, { headers: this.getHeaders() });
    }
    paginateWeekDiscount(page?:number,row?:number){
        const uri = `${host}${this.url}/week?page=${page}&row=${row}`
        return this.http.get<any>(uri, { headers: this.getHeaders() });
    }
    getAllByService():Observable<Discount[]>{
      return this.http.get<Discount[]>(`${host}${this.url}/byservice`, { headers: this.getHeaders() })
    }

    getByDate( date : Date){
      return this.http.get<Discount>(`${host}${this.url}/date`,{ headers : this.getHeaders(),params:{
        date:date.toISOString()
      }});
    }
}
