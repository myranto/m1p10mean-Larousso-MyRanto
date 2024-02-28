import {HasId} from "./hasId";

export interface Service extends HasId {
    duration:number,
    committee:number,
    price:number,
    discount?:any
}
