import {Injectable} from "@angular/core";
import {User} from "../../interfaces/user";
import {host} from "../host";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {postCall} from "../../../api-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url:string = host +  '/user'
  constructor() {
  }
//   login vers express
  async login(form:any): Promise<User|string> {
      return  await postCall(`${this.url }/login`,form)
  }
// register
  async register(form:any): Promise<string> {
    return  await postCall(`${this.url }/register`,form)
  }
}
