export interface Appointment {
    _id : string | null,
    customer : string
    date : Date,
    services : {
        id : string,
        name : string,
        duration:number,
        committee : number,
        price:number,
        emp: string
    }[],
    payment : {
        payment_date : Date,
        amount : number
    } | null
    isfinish?:Boolean
}
