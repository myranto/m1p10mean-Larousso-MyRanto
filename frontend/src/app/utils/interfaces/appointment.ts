export interface Appointment {
    _id : string | null,
    customer : {
        id : string,
        name : string
    },
    date : Date,
    services : {
        id : string,
        name : string,
        duration:number,
        committee : number,
        price:number,
        emp: {
            id : string,
            name : string
        } | null
    }[]
}
