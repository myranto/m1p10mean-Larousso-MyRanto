import {HasId} from "./hasId";

export interface Spent extends HasId{
    type : any,
    label : string,
    date : Date,
    amount : number
}
