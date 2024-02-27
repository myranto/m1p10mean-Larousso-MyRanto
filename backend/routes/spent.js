var express = require('express');
var router = express.Router();
var spent = require('../models/spent');
var typeCost = require('../models/type_cost');

router.get('/',async function (req,res){
    try {
        let params = {}
        if (req.query.text) {
            let regex = new RegExp(req.query.text, 'i'); 
            let number = Number(req.query.text);
            let isNumber = !isNaN(number);
            let matchingTypes = await typeCost.find({ name: { $regex: regex } });
            let matchingTypeIds = matchingTypes.map(type => type._id);
            params = {
                $or: [
                    { label: { $regex: regex } },
                    { type: { $in: matchingTypeIds } },
                    ...(isNumber ? [{ amount: number }] : [])
                ]
            };
        }
        let data = spent.find(params).populate({path:"type",model:"typeCost"});
        res.json(await data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

router.post('/',async function(req,res){
    try {
        let model = await spent.create(req.body);
        res.json(model);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/',async function(req,res){
    try {
        let {_id,...other} = req.body;
        let model = await spent.updateOne({_id},other);
        res.json(model);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete('/:id',async function(req,res){
    try {
        await spent.findByIdAndDelete(req.params.id);
        return res.status(200).send();
    } catch (error) {
        
    }
});

module.exports = router;