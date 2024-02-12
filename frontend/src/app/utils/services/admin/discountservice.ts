import {CrudService} from "../CrudService";
import {Discount} from "../../interfaces/discount";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Discountservice extends CrudService<Discount>{
  constructor(protected http : HttpClient ){
    super(http,"/discount");
  }
}
