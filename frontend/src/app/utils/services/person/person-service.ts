import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {User} from "../../interfaces/user";
import {deleteCall, getCall, getProfileStorage} from "../../../../api-request";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AuthService{

  constructor(private http : HttpClient){
    super();
  }
  async searchBar(text:string,role){
      return await getCall(`${this.url}/find/${role}?text=${text}`,true)
  }
    async countByrole(role: string): Promise<number> {
        return await getCall(this.url + '/count/' + role,false)
    }
  async findByrole(role: string,page?:any,row?:any): Promise<any[]> {
      console.log(page)
      const uri = `${this.url}/find/${role}?page=${page}&row=${row}`
    return await getCall(uri,false)
  }
  async deletePersonById(idperson: string): Promise<string> {
    return await deleteCall(this.url + '/' + idperson,null,true)
  }

  findById(id : string) : Observable<User> {
    const user = getProfileStorage()
    let headers =  new HttpHeaders({
      'authorization': `Bearer ${user?.token}`,
      'role': user?.role
    });
    return this.http.get<User>(this.url+'/'+id,{headers:headers});
  }
  findInTheSession() : Observable<User> {
    const user = getProfileStorage()
    return this.findById(user.id);
  }
}
