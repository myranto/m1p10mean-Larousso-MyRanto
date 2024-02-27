var express = require('express');
var router = express.Router();
var typeCost = require('../models/type_cost');


router.get('/',async function (req,res,next){
    try {
        let params = {}
        if (req.query.text) {
            let regex = new RegExp(req.query.text, 'i'); 

            params = {
                $or: [
                    { name: { $regex: regex } },
                ]
            };
        }
        res.json(await typeCost.find(params));
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id',async function (req,res,next){
    try {
        let model = await typeCost.findById(req.params.id);
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
        let document =  await typeCost.create(req.body);
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/',async function(req,res,next){
    try {
        const {_id,...other} = req.body;
        await typeCost.updateOne({_id},other);
        res.status(200).send();
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id',async function(req,res,next){
    try {
        await typeCost.deleteMany(await typeCost.findById(req.params.id));
        res.status(200).send();
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;