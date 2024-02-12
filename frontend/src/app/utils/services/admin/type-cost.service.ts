import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCost } from '../../interfaces/type-cost';
import { CrudService } from '../CrudService';

@Injectable({
  providedIn: 'root'
})
export class TypeCostService extends CrudService<TypeCost>{

  constructor(http : HttpClient ){
    super(http,"/type_cost");
  }
}
