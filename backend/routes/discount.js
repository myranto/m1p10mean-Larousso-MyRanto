const express = require('express');
const router = express.Router();
const discount = require('../models/discount/discount');
const User = require('../models/person/User');
const { sendMail, HTML_TEMPLATE } = require('../service/MailSender');
var service = require('../models/service');

router.get('/', async function (req, res) {
    try {
        if(req.query.text){
            let regex = new RegExp(req.query.text, 'i'); 
            return res.json(await discount.find({
                $or: [
                    { name: { $regex: regex } },
                ]
            }))
        }
        // await new Promise(resolve => setTimeout(resolve, 2000));
        const currentDate = new Date();
        let futureDiscountsQuery = discount.find().sort({ date_start: -1 });
        // let futureDiscountsQuery = discount.find({ date_start: { $gte: currentDate } }).sort({ date_start: 1 });
        // let pastDiscountsQuery = discount.find({ date_start: { $lt: currentDate } }).sort({ date_start: -1 });
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const row = parseInt(req.query.row);
            futureDiscountsQuery = futureDiscountsQuery.skip(page * row).limit(row);
        }
        const futureDiscounts = await futureDiscountsQuery.exec();
        // if (req.query.page) {
        //     const page = parseInt(req.query.page);
        //     const row = parseInt(req.query.row);
        //     let remaining = row - futureDiscounts.length;
        //     pastDiscountsQuery = pastDiscountsQuery.skip(page * remaining).limit(remaining);
        // }
        // const pastDiscounts = await pastDiscountsQuery.exec();
        // console.log(futureDiscounts.length);
        // console.log(pastDiscounts.length);
        // return res.json([...futureDiscounts, ...pastDiscounts]);
        return res.json(futureDiscounts)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get('/date',async function (req,res){
    try {
        let discount_of_day = await discount.findOne(
            {
                date_end : { $gte:req.query.date ? new Date(req.query.date) : new Date() },
                is_service : false
            }
        );
        return res.json(discount_of_day);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
router.get('/byservice',async function(req,res){
    try {
       const result =  await discount.find({
            date_end: { $gte: new Date() },
            is_service: true
        }).sort({name: 1})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
})
router.get('/week', async function (req, res) {
    try {
        const currentDate = new Date();
        // Calcul du premier jour (Dimanche) de la semaine
        const firstDayOfWeek = new Date(
            currentDate.setDate(currentDate.getDate() - currentDate.getDay())
        );
        // Calcul du dernier jour (Samedi) de la semaine
        const lastDayOfWeek = new Date(
            firstDayOfWeek.getFullYear(),
            firstDayOfWeek.getMonth(),
            firstDayOfWeek.getDate() + 6
        );
        // maka aanze date end ao anatinle plage
        let data = discount.find({
            date_end: {
                $gte: firstDayOfWeek,
                $lte: lastDayOfWeek
            }
        }).sort({ date_start: 1 });

        const totalDocuments = await discount.countDocuments({
            date_end: {
                $gte: firstDayOfWeek,
                $lte: lastDayOfWeek
            }
        });

        if (req.query.page) {
            const page = parseInt(req.query.page);
            const row = parseInt(req.query.row);
            data = data.skip(page * row).limit(row);
        }
        return res.json({
            data: await data,
            total: totalDocuments
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get('/count',async function(req,res){
    try {
        return res.status(200).json(await discount.countDocuments());
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})
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
        const user_list = await User.find({role:'customer'})
        let document =  await discount.create(req.body);
        if(req.body.ids){
            const srv =  await service.findById(req.body.ids);
            srv.discount = document._id
            await srv.save()
        }
        const message = '<p>Voici un nouvel offre que vous ne pouvez laisser passer '+req.body.name+', avec une remise de <strong>'+req.body.percent+'%</strong></p><p>il sera actif dès le '+new Date(req.body.date_start)+'</p>'
            user_list.forEach(async p => {
                const msg = {
                    to: p.mail,
                    from: 'my.randrianantoandro@gmail.com',
                    subject: 'Salon de beauté:Offre spéciale!',
                    text: message,
                    html: HTML_TEMPLATE(message)
                };
                await sendMail(msg, (info) => {
                    console.log("Email sent successfully");
                    console.log("MESSAGE ID: ", info.messageId);
                });
            });
        res.status(200).json(document);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

router.put('/',async function(req,res){
    try {
        // validator(req.body);
        await discount.findByIdAndUpdate(req.body._id,req.body);
        if(req.body.ids){
            const srv =  await service.findById(req.body.ids);
            srv.discount = req.body._id
            await srv.save()
        }
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
