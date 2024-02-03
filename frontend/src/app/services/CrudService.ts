import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { host } from "./host";

export class CrudService<T> {
    url : string;
    #http : HttpClient;
    constructor(http : HttpClient,url : string) {
      this.#http = http;
      this.url = url;
    }
    get() : Observable<T[]> {
      return this.#http.get<T[]>(host+this.url);
    }
    
    create(model : T) : Observable<T> {
      return this.#http.post<T>(host+this.url,model);
    }
    update(model : T){
      return this.#http.put(host+this.url,model);
    }
    drop(id : string){
      return this.#http.delete(host+this.url+`/${id}`);
    }
}