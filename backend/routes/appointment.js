var express = require('express');
var router = express.Router();
var appointment = require('../models/appointment');
const moment = require('moment');
var user = require('../models/person/User');
const { sendMail, HTML_TEMPLATE } = require('../service/MailSender');

router.post('/', async function(req,res){
    try {
        for(let service of req.body.services){
            if(service.emp){
                let employe = await user.findById(service.emp);
                let start_date = new Date(req.body.date);
                start_date.setHours(employe.start_time.hours);
                start_date.setMinutes(employe.start_time.minutes);
                let end_date = new Date(req.body.date);
                end_date.setHours(employe.end_time.hours);
                end_date.setMinutes(employe.end_time.minutes);
                let appointment_date = new Date(req.body.date);
                appointment_date.setHours(appointment_date.getHours()+3);
                if(appointment_date < start_date || appointment_date > end_date){
                    return res.status(400).send(`L' employé ${employe.name} commence à ${start_date.toLocaleDateString("fr-FR",{hour:'2-digit',minute:'2-digit'})} et fini à ${end_date.toLocaleDateString("fr-FR",{hour:'2-digit',minute:'2-digit'})}`);
                }
            }
        }
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
function getFirstAndLastWeek(date){
    const firstDayOfWeek = new Date(
        date.setDate(date.getDate() - date.getDay())
    );
    const lastDayOfWeek = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + 6
    );
    return {
        start:firstDayOfWeek,
        end:lastDayOfWeek
    }
}
router.get('/', async function (req, res) {
    try {
        let result = null;
        const week = getFirstAndLastWeek(new Date());
        const AdParams = {
            $gte: week.start,
            $lte: week.end
        };
        let query = {};
        if (req.query.customer) {
            query = {
                'customer': req.query.customer
            };
        } else if (req.query.employe) {
            query = {
                services: { $elemMatch: { 'emp': req.query.employe } }
            };
        }
        if (req.query.week && req.query.week!='null') {
            query.date = AdParams;
        }
        console.log(query);
        result = appointment.find(query).sort({ date: -1 });
        if (req.query.page) {
            let page = parseInt(req.query.page);
            result = result.skip(page * 100).limit(100);
        }
        result.populate({ path: "services", populate: { path: "emp", model: "User", select: "name profile" } });
        result.populate({ path: "customer", model: "User", select: "name profile" });
        return res.send(await result);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


router.get('/count',async function(req,res){
    try {
        const week = getFirstAndLastWeek(new Date());
        const AdParams = {
            $gte: week.start,
            $lte: week.end
        };
        let query = {};
        if (req.query.customer) {
            query = {
                'customer': req.query.customer
            };
        } else if (req.query.employe) {
            query = {
                services: { $elemMatch: { 'emp': req.query.employe } }
            };
        }
        if (req.query.week && req.query.week!='null') {
            query.date = AdParams;
        }
        return res.status(200).json(await appointment.countDocuments(query));
    } catch(error) {
        console.log(error);
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
        console.log(error);
        return res.status(400).send(error);
    }
});

router.put('/date/:id',async function(req,res){
    try {
        let model =  appointment.findById({_id : req.params.id});
        model.populate({path:"customer",model:"User",select:"name profile mail"});
       const val = await model
        if (!val) {
            throw new Error('Aucun rendez-vous trouvé avec cet ID');
        } 
        val.date = new Date(req.body.start)
        await val.save()
        const message = 'Cher client, nous vous informons que votre rendez-vous viens d\'etre deplacer'
        const msg = {
            to: val.customer.mail,
            from: 'my.randrianantoandro@gmail.com',
            subject: 'Coiffure:Offre spéciale!',
            text: message,
            html: HTML_TEMPLATE(message)
        };
        await sendMail(msg, (info) => {
            console.log("Email sent successfully");
            console.log("MESSAGE ID: ", info.messageId);
        });
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
                result =  appointment.find({
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break;
            case 'customer':
                result =  appointment.find({
                    'customer':id,
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break
            case 'employe':
                result =  appointment.find({
                    'services.emp':id,
                    date:{
                        $gte: start,
                        $lte: end
                    }
                })
                break
            default:
                throw new Error('requete invalide')
        }
        result.populate({path:"services",populate:{path:"emp",model:"User",select:"name profile"}});
        result.populate({path:"customer",model:"User",select:"name profile"});
        const val = await result
        
        return res.status(200).send(val);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})
router.get('/commission', async function(req, res) {
    const pdate = req.query.date;
    if (pdate) {
        let start = new Date(pdate);
        start.setHours(0,0,0,0);
        let end = new Date(pdate);
        end.setHours(23,59,59,999);
        const aplist = await appointment.find({
            date: {
                $gte: start,
                $lt: end
            }
        });

        let commission = 0;
        for (const row of aplist) {
            for (const key of row.services) {
                
                if (key.emp.toString() === req.query.id) {
                    commission += (key.committee/100) * key.price;
                }
            }
        }
        return res.status(200).json({
            commission: commission,
            listtask: aplist
        });
    } else {
        return res.status(400).json("veuillez indiquer la date");
    }
});
router.post('/filter',async function (req,res) {
    try {
                
        let searchObj = {};
        if (req.body.services) {
            searchObj["services.id"] = { $in: req.body.services };
        }

        if (req.body.min) {
            searchObj["services.price"] = { $gte: req.body.min };
        }

        if (req.body.max) {
            if (!searchObj["services.price"]) {
                searchObj["services.price"] = {};
            }
            searchObj["services.price"]["$lte"] = req.body.max;
        }

        if (req.body.start) {
            searchObj["date"] = { $gte: new Date(req.body.start) };
        }

        if (req.body.end) {
            if (!searchObj["date"]) {
                searchObj["date"] = {};
            }
            searchObj["date"]["$lte"] = new Date(req.body.end);
        }
        if (req.body.emp) {
            searchObj["services.emp"] = req.body.emp;
        }
        
        if (req.body.customer) {
            searchObj["customer"] = req.body.customer;
        }
        console.log(searchObj);
        const result = appointment.find(searchObj)
        result.populate({path:"services",populate:{path:"emp",model:"User",select:"name profile"}});
        result.populate({path:"customer",model:"User",select:"name profile"});
        return res.send(await result)
    } catch (error) {
        console.log(error);
        return res.status(400).json("Erreur d'entrée");
    }
})

module.exports = router;