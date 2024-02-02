var express = require('express');
var router = express.Router();
var service = require('../models/service');

function validator(model){
    if(!model.name || model.name.trim() === ''){
        throw "Le nom est invalide";
    }
    if(!model.price || model.price < 0 ){
        throw "Le prixe doit être supérieur à 0";
    }
    if(!model.committee || model.committee < 0 || model.committee > 100){
        throw "La commission doit être entre 0 et 100";
    }
    if(!model.duration || model.duration <= 0){
        throw "La durée doit être positif";
    }
}

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
        validator(req.body);
       let document =  await service.create(req.body);
        res.status(201).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/',async function(req,res,next){
    try {
        validator(req.body);
        await service.updateOne(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id',async function(req,res,next){
    try {
        await service.deleteMany(await service.findById(req.params.id));
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;