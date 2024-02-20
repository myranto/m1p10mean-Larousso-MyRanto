import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../CrudService';
import {TypeCost} from "../../interfaces/type-cost";

@Injectable({
  providedIn: 'root'
})
export class TypeCostService extends CrudService<TypeCost>{

  constructor(http : HttpClient ){
    super(http,"/type_cost");
  }
}
