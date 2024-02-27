import {Injectable} from "@angular/core";
import {User} from "../../interfaces/user";
import {host} from "../host";
import {postCall, putCall} from "../../../../api-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url:string = host +  '/user'
  constructor() {
  }
//   login vers express
  async login(form:any): Promise<User|string> {
    const path = `${this.url }/login`
    console.log(path)
      return  await postCall(path,form,false)
  }
  async update(form:User):Promise<string>{
    return putCall(this.url,form,true)
  }
    async registerother(form:any): Promise<string> {
        return  await postCall(`${this.url }/register`,form)
    }
// register
  async register(form:any): Promise<string> {
    return  await postCall(`${this.url }/register/cli`,form,false)
  }
  async recoverypassword(form: any): Promise<string> {
    return await putCall(`${this.url}/recovery`, form, false)
  }
}
export {User}
