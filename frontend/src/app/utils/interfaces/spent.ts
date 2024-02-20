import { HasId } from "../../interfaces/hasId";

export interface Spent extends HasId{
    type : any,
    label : string,
    date : Date,
    amount : number
}
