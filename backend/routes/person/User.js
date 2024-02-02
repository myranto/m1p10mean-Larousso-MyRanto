const express = require('express');
const router = express.Router();
const user = require('../../models/person/User');
const User = require('../../models/person/User');
const { generateAccessToken } = require('../../jwt');

//login user return user{name,mail,role,token}
router.post('/login', async (req, res) => {
    const logged = await user.findOne({ mail: req.body.mail });
    console.log(req.body.mail);
    if (!logged) return res.status(406).json('Mail introuvable.');
    if (req.body.password!==logged.password) return res.status(406).json('Mail ou mot de passe incorrect.')
    res.json({
        name:logged.name,
        mail:logged.mail,
        role:logged.role,
        token:generateAccessToken(logged.mail)
    })
});
// register user
router.post('/register',async (req,res)=>{
    try {
        const person =  new User(req.body)
        if (person.start_time && person.end_time) {
            const startDate = new Date(`2024-01-01T${person.start_time}:00`);
            const endDate = new Date(`2024-01-01T${person.end_time}:00`);
            console.log(startDate);
            console.log(endDate);
            if (startDate > endDate) {
                throw new Error("l'heure de début doit etre inférieur à l'heure de fin")
            }
        }
        await user.create(req.body)
        return res.status(201).json('création réussi!');
    } catch (error) {
        let message = error.message
        if(error.status){
            res.status(error.status).json(message);
        }
        else{
            if(error.code === 11000)
                message = 'Email :'+req.body.mail+' déjà éxistant, veuillez choisir un autre'
            res.status(500).json(message)
        }
    }
})
// updated user
router.put('/',async function(req,res){
    try {
        await user.updateOne(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400).json(error.message);
    }
});
// find by role
router.get('/find/:role',async function(req,res) {
    try {
        let model = await user.find({role: req.params.role});
        if(!model){
            throw {message:'not found',status:404};
        } 
        res.json(model);
    } catch (error) {
        if(error.status){
            res.status(error.status).json(error.message);
        }
        else{
            res.status(406).json(error.message);
        }
    }
})
module.exports = router;