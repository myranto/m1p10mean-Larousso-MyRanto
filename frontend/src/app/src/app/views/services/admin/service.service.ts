import { Injectable } from '@angular/core';
import { Service } from '../../interfaces/service';
import { host } from '../host';
import {getCall} from "../../../../api-request";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  readonly url : string = "/service";

  constructor() { }

  async get() : Promise<Service[]> {
    // let response = await fetch(host+this.url);
    // return await response.json();
    return getCall(host+this.url,false)
  }
}
export { Service };

