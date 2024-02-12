export interface User {
  _id:string|null,
  name:string,
  mail:string,
  password:string,
  role:string,
  profile:string|null,
  prefered_service:string|null,
  prefered_emp:string|null,
  start_time:Date|null,
  end_time:Date|null,
}
