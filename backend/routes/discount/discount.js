const express = require('express');
const router = express.Router();
const discount = require('../../models/discount/discount');
const User = require('../../models/person/User');
const { sendMail, HTML_TEMPLATE } = require('../../service/MailSender');

router.get('/',async function (req,res){
    try {
      res.json(await discount.find());
    } catch (error) {
        console.log(error);
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
