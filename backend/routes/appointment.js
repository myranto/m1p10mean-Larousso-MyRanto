var express = require('express');
var router = express.Router();
var appointment = require('../models/appointment');
const moment = require('moment');
router.post('/', async function(req,res){
    try {
        await appointment.create(req.body);
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        if(error.errors && error.errors.date){
            return res.status(400).send(error.errors.date.properties.message);
        }
        return res.status(400).send(error);
    }
});

router.get('/',async function(req,res){
    try {
        let result = null;
        if(req.query.customer){
            result = appointment.find({'customer.id':req.query.customer}).sort({date:-1});
        }else if(req.query.employe){
            result = appointment.find({services : { $elemMatch: {'emp.id':req.query.employe}}}).sort({date:-1});
        }
        else{
            result = appointment.find();
        }
        if(req.query.page){
            let page = parseInt(req.query.page);
            result.skip(page*100).limit(100);
        }
        return res.send(await result);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get('/count',async function(req,res){
    try {
        if(req.query.customer){
            return res.send({count :await appointment.countDocuments({'customer.id':req.query.customer}).sort({date:-1}) });
        }else if(req.query.employe){
            return res.send({count :await appointment.countDocuments({services : { $elemMatch: {'emp.id':req.query.employe}}})});
        }
        return res.status(200).send(await appointment.countDocuments());
    } catch(error) {
        return res.sendStatus(500);
    }
});

router.delete('/:id',async function(req,res){
    try {
        let model = await appointment.find({_id : req.params.id});
        if(model.date < new Date()){
            throw 'On ne peut pas supprimer un rendez-vous ayant une date antérieur à aujourd\'hui';
        }
        await appointment.deleteOne({_id:req.params.id});
        return res.status(200).send();
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.put('/date/:id',async function(req,res){
    try {
        let model = await appointment.findById({_id : req.params.id});
        if (!model) {
            throw new Error('Aucun rendez-vous trouvé avec cet ID');
        } 
        model.date = new Date(req.body.start)
        await model.save()
        console.log('mety');
        return res.status(200).send();
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
})

router.get('/calendar',async function(req,res){
    try {
        const { role, id, mode, date } = req.query;
        console.log('role '+role+' id '+id+' mode '+mode+' date '+date);
        const newDate = new Date(date)
        const start = moment(newDate).startOf(mode).toDate();
        const end = moment(newDate).endOf(mode).toDate();
        let result = []
        switch (role) {
            case 'admin':
                result = await appointment.find({
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break;
            case 'customer':
                result = await appointment.find({
                    'customer.id':id,
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break
            case 'employe':
                result = await appointment.find({
                    'services.emp.id':id,
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break
            default:
                throw new Error('requete invalide')
                break;
        }
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
})

module.exports = router;