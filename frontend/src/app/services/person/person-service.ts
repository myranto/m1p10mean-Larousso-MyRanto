import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {User} from "../../interfaces/user";
import {getCall} from "../../../api-request";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends AuthService{
  async findByrole(role: string): Promise<User[]> {
    return await getCall(this.url + '/find/' + role)
  }
}
