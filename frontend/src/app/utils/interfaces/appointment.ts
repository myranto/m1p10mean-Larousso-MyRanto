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
        discount: number,
        emp: any
    }[],
    payment : {
        payment_date : Date,
        amount : number
    } | null
    isfinish?:Boolean,
    discount:number
}
