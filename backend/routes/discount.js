const express = require('express');
const router = express.Router();
const discount = require('../../models/discount/discount');
const User = require('../../models/person/User');
const { sendMail, HTML_TEMPLATE } = require('../../service/MailSender');

router.get('/', async function (req, res) {
    try {
        const currentDate = new Date();
        let futureDiscountsQuery = discount.find({ date_start: { $gte: currentDate } }).sort({ date_start: 1 });
        let pastDiscountsQuery = discount.find({ date_start: { $lt: currentDate } }).sort({ date_start: -1 });
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const row = parseInt(req.query.row);
            futureDiscountsQuery = futureDiscountsQuery.skip(page * row).limit(row);
            pastDiscountsQuery = pastDiscountsQuery.skip(page * row).limit(row);
        }
        const futureDiscounts = await futureDiscountsQuery.exec();
        const pastDiscounts = await pastDiscountsQuery.exec();
        return res.json([...futureDiscounts, ...pastDiscounts]);
        // if(req.query.valid){
        //     return res.json(await discount.find({
        //         $and:{
        //             start_date:{
        //                 $lte : new Date()
        //             },
        //             end_date:{
        //                 $gte : new Date()
        //             }
        //         }
        //     }));
        // }
        // return res.json(await discount.find());
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
        const message = 'Voici un nouvel offre que vous ne pouvez laisser passer '+req.body.name+', avec une remise de <strong>'+req.body.percent+'%'
            user_list.forEach(async p => {
                const msg = {
                    to: p.mail,
                    from: 'my.randrianantoandro@gmail.com',
                    subject: 'Coiffure:Offre spéciale!',
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
