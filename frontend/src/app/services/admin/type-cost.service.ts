import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCost } from '../../interfaces/type-cost';
import { Observable } from 'rxjs';
import { host } from '../host';
import { CrudService } from '../CrudService';

@Injectable({
  providedIn: 'root'
})
export class TypeCostService extends CrudService<TypeCost>{

  constructor(protected http : HttpClient ){
    super(http,"/type_cost");
  }
}
