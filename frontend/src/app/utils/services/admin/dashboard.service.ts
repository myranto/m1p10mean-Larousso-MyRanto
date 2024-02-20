import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpAvg } from '../../interfaces/emp-avg';
import { host } from '../host';
import { getProfileStorage } from 'src/api-request';
import { AppointmentDay } from '../../interfaces/appointment-day';
import { AppointmentMonth } from '../../interfaces/appointment-month';
import { Sell } from '../../interfaces/sell';
import { SellMonth } from '../../interfaces/sell-month';
import { BonusMonth } from '../../interfaces/bonus-month';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private url: string = '/admin';
    constructor(private http: HttpClient) {}

    getHeaders() {
        const profile = getProfileStorage();
        return new HttpHeaders({
            authorization: `Bearer ${profile?.token}`,
            role: profile?.role,
        });
    }

    getEmpAvg(): Observable<EmpAvg[]> {
        return this.http.get<EmpAvg[]>(host + this.url + '/emp_avg', {
            headers: this.getHeaders(),
        });
    }

    getAppointmentPerDay(start?: string, end?: string): Observable<AppointmentDay[]> {
        return this.http.get<AppointmentDay[]>(host + this.url + '/day', {
            headers: this.getHeaders(),
            params: {
                ...(start && {min:start}),
                ...(end && {max:end})
            },
        });
    }
    
    getAppointmentPerMonth() : Observable<AppointmentMonth[]>{
      return this.http.get<AppointmentMonth[]>(host+this.url+'/month',{ headers : this.getHeaders()});
    }

    getSellPerDay(start? : string, end? : string) : Observable<Sell[]>{
      return this.http.get<Sell[]>(host + this.url + '/day/ca', {
        headers: this.getHeaders(),
        params: {
            ...(start && {min:start}),
            ...(end && {max:end})
        },
      });
    }

    getSellPerMonth() : Observable<SellMonth[]>{
      return this.http.get<SellMonth[]>(host + this.url + '/month/ca', {
        headers: this.getHeaders()});
    }

    getBonusMonth() : Observable<BonusMonth[]>{
      return this.http.get<BonusMonth[]>(host + this.url + '/month/bonus', {
        headers: this.getHeaders()});
    }

}
