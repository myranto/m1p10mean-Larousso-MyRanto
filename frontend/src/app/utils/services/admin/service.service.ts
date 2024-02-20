import { Injectable } from '@angular/core';
import { Service } from '../../interfaces/service';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../CrudService';

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends CrudService<Service>{
    constructor(http: HttpClient) {
        super(http,'/service');
    }
}
export { Service };

