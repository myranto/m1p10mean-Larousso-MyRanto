var express = require('express');
var router = express.Router();
var service = require('../models/service');


router.get('/',async function (req,res,next){
    try {
        let params = {}
        if (req.query.text) {
            let regex = new RegExp(req.query.text, 'i'); 
            let number = Number(req.query.text);
            let isNumber = !isNaN(number);

            params = {
                $or: [
                    { name: { $regex: regex } },
                    ...(isNumber ? [{ price: number }, { committee: number }, { duration: number }] : [])
                ]
            };
        }
        const result = service.find(params).populate({
            path:"discount",
            model:"Discount",
            select:"name percent date_end date_start",
            match: { date_end: { $gt: req.query.date ? new Date(req.query.date) : new Date() } },
            options: { limit: 1 }
        });
        res.json(await result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.get('/:id',async function (req,res,next){
    try {
        let model = await service.findById(req.params.id).populate({
            path:"discount",model:"Discount",
            select:"name percent date_end date_start",
            match: { date_end: { $gt: new Date() } },
            options: { limit: 1 }
        });
        if(!model){
            throw {message:'not found',status:404};
        } 
        res.json(model);
    } catch (error) {
        if(error.status){
            res.status(error.status).json(error.message);
        }
        else{
            res.status(500).json(error);
        }
    }
});

router.post('/',async function (req,res,next){
    try {
        // await new Promise(resolve => setTimeout(resolve, 10000));
        // res.status(200).json('document');
        let document =  await service.create(req.body);
        res.status(200).json(document);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.get('/discount/:id',async function(req, res){
    try {
        const servicess = await service.find({ 'discount': req.params.id }).exec();
        if(!servicess){
            throw {message:'not found',status:404};
        } 
        if (Array.isArray(servicess)) {
            res.json(servicess[0]);
        }else{
            res.json(servicess)
        }
    } catch (error) {
        console.log(error);
        if(error.status){
            res.status(error.status).json(error.message);
        }
        else{
            res.status(500).json(error);
        }
    }
})

router.put('/',async function(req,res,next){
    try {
        await service.findByIdAndUpdate(req.body._id,req.body);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.delete('/:id',async function(req,res,next){
    try {
        await service.findByIdAndDelete(req.params.id);
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;