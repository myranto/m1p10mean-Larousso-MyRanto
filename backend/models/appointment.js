const mongoose = require('mongoose');
const appointmentSchema = mongoose.Schema({
    customer : { type: mongoose.Schema.Types.ObjectId , required: true ,ref:"user"},
    date : { type : Date, required : true,validate:{
        validator:function(value){
            return value > new Date();
        },
        message:'La doit être antérieur au date d\' aujourd\'hui'
    }},
    services : [
        {
            id: {type:String,required:true},
            name:{type: String, required: true},
            price:{type: Number, required: true, min:0},
            committee:{type: Number, required: true, min:0,max:100},
            duration:{type:Number, required:true,min:0},
            discount: { type : Number},
            emp : { type : mongoose.Schema.Types.ObjectId , required: false,ref:"user"}
        }
    ],
    discount : { type : Number},
    payment : {
        payment_date : { type: Date },
        amount : { type : Number }
    },
    isfinish:{type: Boolean, default:false}
});

module.exports = mongoose.model('appointment',appointmentSchema);