import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { }

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  const url : string = "/service";

  constructor(private http : HttpClient) { }

  get() : Observable<

}
