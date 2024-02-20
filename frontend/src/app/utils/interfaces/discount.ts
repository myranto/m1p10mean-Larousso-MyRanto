import {HasId} from "./hasId";

export interface Discount extends HasId{
  percent:number,
  is_service:boolean,
  date_start:Date|null,
  date_end:Date|null,
}
