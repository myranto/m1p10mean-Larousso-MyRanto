import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {User} from "../../interfaces/user";
import {deleteCall, getCall} from "../../../api-request";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AuthService{
  async findByrole(role: string): Promise<User[]> {
    return await getCall(this.url + '/find/' + role,false)
  }
  async deletePersonById(idperson: string): Promise<string> {
    return await deleteCall(this.url + '/' + idperson,null,true)
  }
}
