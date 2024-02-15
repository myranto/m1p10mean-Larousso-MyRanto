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
    count():Observable<any>{
      return this.http.get(`${host}${this.url}/count`, { headers: this.getHeaders() })
    }
    getPaginate(page?:number,row?:number) : Observable<Discount[]> {
        const uri = `${host}${this.url}?page=${page}&row=${row}`
        return this.http.get<Discount[]>(uri, { headers: this.getHeaders() });
    }
}
