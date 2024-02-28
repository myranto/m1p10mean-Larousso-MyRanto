import { Injectable } from '@angular/core';
import { CrudService } from '../CrudService';
import { Spent } from '../../interfaces/spent';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpentService extends CrudService<Spent> {
  constructor(httpClient : HttpClient){
    super(httpClient,"/spent")
  }
}
