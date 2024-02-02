import { Host, Injectable } from '@angular/core';
import { Service } from '../../interfaces/service';
import { host } from '../host';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  readonly url : string = "/service";

  constructor(private http: HttpClient) { }

  get() : Observable<Service[]> {
    return this.http.get<Service[]>(host+this.url);
  }
  
  create(model : Service) : Observable<Service> {
    return this.http.post<Service>(host+this.url,model);
  }
  update(model : Service){
    return this.http.put(host+this.url,model);
  }
}
export { Service };

