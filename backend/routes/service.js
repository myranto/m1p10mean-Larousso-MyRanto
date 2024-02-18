var express = require('express');
var router = express.Router();
var service = require('../models/service');


router.get('/',async function (req,res,next){
    try {
        res.json(await service.find());
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id',async function (req,res,next){
    try {
        let model = await service.findById(req.params.id);
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
        let document =  await service.create(req.body);
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
});

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