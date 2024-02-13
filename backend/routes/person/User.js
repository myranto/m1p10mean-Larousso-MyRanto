const express = require('express');
const router = express.Router();
const user = require('../../models/person/User');
const User = require('../../models/person/User');
const { generateAccessToken } = require('../../jwt');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//login user return user{name,mail,role,token}
router.post('/login', async (req, res) => {
    const logged = await user.findOne({ mail: req.body.mail });
    console.log(req.body.mail);
    if (!logged) return res.status(406).json('Mail introuvable.');

    if (!bcrypt.compare(req.body.password,logged.password)) return res.status(406).json('Mail ou mot de passe incorrect.')
    res.json({
        id:logged._id,
        name:logged.name,
        role:logged.role,
        token:generateAccessToken(logged.mail)
    })
});

function validMail(email) {
    var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}


async function register(req,res) {
    try {
        const person =  new User(req.body)
        if (!validMail(person.mail)) {
            throw new Error("Email invalid")
        }
        req.body.password = await bcrypt.hash(req.body.password,saltRounds)
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
        console.log(error);
        if(error.status){
            return res.status(error.status).json(message);
        }
        else{
            if(error.code === 11000)
                message = 'Email :'+req.body.mail+' déjà éxistant, veuillez choisir un autre'
            return res.status(500).json(message)
        }
    }
}

// register user
router.post('/register',async (req,res)=>{
    await register(req,res)
})
router.post('/register/cli',async (req,res)=>{
    await register(req,res)
})
router.put('/recovery',async function (req,res) {
    try {
    const one = await user.findOne({ mail: req.body.mail })
        console.log(one);
        if (!one) {
           return res.status(404).json('Mail introuvable.')
        }
        one.password = await bcrypt.hash(req.body.password,saltRounds)
        await user.updateOne(one);
        return res.status(200).json('modification réussi');
    } catch (error) {
       return res.status(400).json(error.message);
    }
})
// updated user
router.put('/',async function(req,res){
    try {
        console.log(req.body);
        const { _id, ...updateData } = req.body;
    await user.updateOne({ _id }, { $set: updateData });
        res.status(200).json('modification réussi');
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
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
           return res.status(error.status).json(error.message);
        }
        else{
            return res.status(406).json(error.message);
        }
    }
});

router.get('/:id',async function (req,res){
    try{
        return res.status(200).send(await user.findById(req.params.id));
    }catch(error){
        if(error.status){
            return res.status(error.status).json(error.message);
         }
         else{
             return res.status(404).json(error.message);
         }
    }
});

router.delete('/:id',async function (req,res) {
    try {
        await user.deleteMany(await user.findById(req.params.id));
        res.status(200).json('suppression réussi');
    } catch (error) {
        return res.sendStatus(400).json(error.message);
    }
})
module.exports = router;