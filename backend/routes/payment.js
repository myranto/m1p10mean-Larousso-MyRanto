var express = require('express');
var router = express.Router();
var appointment = require('../models/appointment');

router.post('/', async function(req,res){
    try {
        let model = await appointment.findById(req.body.appointment);
        let totalToPay = 0;
        model.services.forEach((service)=> totalToPay+= service.price);
        model.payment = {
            amount : totalToPay,
            payment_date : new Date()
        }
        await appointment.findByIdAndUpdate(req.body.appointment,model);
        return res.status(200).send(model);
    } catch (error) {
        console.log(error);
        if(error.errors && error.errors.date){
            return res.status(400).send(error.errors.date.properties.message);
        }
        return res.status(400).send(error);
    }
});

module.exports = router;