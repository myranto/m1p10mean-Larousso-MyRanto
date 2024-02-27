import { Time } from "@angular/common";

export interface User {
  _id:string|null,
  name:string,
  mail:string,
  password:string,
  role:string,
  profile:string|null,
  prefered_service: any |null,
  prefered_emp: any |null,
  start_time: Time,
  end_time: Time,
}
