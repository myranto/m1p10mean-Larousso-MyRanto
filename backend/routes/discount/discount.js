const express = require('express');
const router = express.Router();
const discount = require('../../models/discount/discount')

router.get('/',async function (req,res){
    try {
        res.json(await discount.find());
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id',async function (req,res){
    try {
        let model = await discount.findById(req.params.id);
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
router.post('/',async function (req,res){
    try {
        // validator(req.body);
        let document =  await discount.create(req.body);
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/',async function(req,res){
    try {
        // validator(req.body);
        await discount.findByIdAndUpdate(req.body._id,req.body);
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.delete('/:id',async function(req,res,next){
    try {
        await discount.deleteMany(await discount.findById(req.params.id));
        res.status(200).json('suppression réussi');
    } catch (error) {
        res.sendStatus(500).json(error.message);
    }
});

module.exports = router;
