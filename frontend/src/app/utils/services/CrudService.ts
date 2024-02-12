import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {host} from "./host";
import {getProfileStorage} from "../../../api-request";

export class CrudService<T> {
    url : string;
    #http : HttpClient;
    constructor(http : HttpClient,url : string) {
      this.#http = http;
      this.url = url;
    }
    getHeaders(){
        const profile = getProfileStorage()
        return new HttpHeaders({
            'authorization': `Bearer ${profile?.token}`,
            'role': profile?.role
        })
    }
    get() : Observable<T[]> {

      return this.#http.get<T[]>(host+this.url, { headers: this.getHeaders() });
    }

    create(model : T) : Observable<T> {
      return this.#http.post<T>(host+this.url,model,{ headers: this.getHeaders() });
    }
    update(model : T){
      return this.#http.put(host+this.url,model,{ headers: this.getHeaders() });
    }
    drop(id : string){
      return this.#http.delete(host+this.url+`/${id}`,{ headers: this.getHeaders() });
    }
}
