const express = require('express');
const router = express.Router();
const user = require('../models/person/User');
const User = require('../models/person/User');
const { generateAccessToken } = require('../jwt');
const bcrypt = require('bcryptjs');
const { model } = require('mongoose');
const saltRounds = 10;
const multer = require("multer");

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'public/profiles');
    },
    filename : (req,file,cb) => {
        cb(null,req.params.id+'-'+file.originalname);
    }
});

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
        
        // const person =  new User(req.body)
        if (!validMail(req.body.mail)) {
            throw new Error("Email invalid")
        }
        req.body.password = await bcrypt.hash(req.body.password,saltRounds)
        if (req.body.start_time && req.body.end_time) {
            const startDate = new Date(`2024-01-01T${req.body.start_time}:00`);
            const endDate = new Date(`2024-01-01T${req.body.end_time}:00`);
            if (startDate > endDate) {
                throw new Error("l'heure de début doit etre inférieur à l'heure de fin")
            }
            if (req.body.start_time) {
                const [hours, minutes] = req.body.start_time.split(':').map(Number);
                req.body.start_time = { hours, minutes };
            }
            if (req.body.end_time) {
                const [hours, minutes] = req.body.end_time.split(':').map(Number);
                req.body.end_time = { hours, minutes };
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
router.put('/recovery', async function (req, res) {
    try {
        const one = await user.findOne({ mail: req.body.mail });
        console.log(one);
        if (!one) {
            return res.status(404).json('Mail introuvable.');
        }

        const updateData = {
            password: await bcrypt.hash(req.body.password, saltRounds),
        };

        await user.updateOne({ _id: one._id }, { $set: updateData });
        return res.status(200).json('Modification réussie');
    } catch (error) {
        return res.status(400).json(error.message);
    }
});

// updated user
router.put('/',async function(req,res){
    try {
        if (req.body.start_time) {
            const [hours, minutes] = req.body.start_time.split(':').map(Number);
            req.body.start_time = { hours, minutes };
        }
        if (req.body.end_time) {
            const [hours, minutes] = req.body.end_time.split(':').map(Number);
            req.body.end_time = { hours, minutes };
        }
        const { _id, ...updateData } = req.body;
        await user.updateOne({ _id }, { $set: updateData });
        res.status(200).json('modification réussi');
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

router.get('/count/:role',async function(req,res){
    try {
        return res.status(200).json(await user.countDocuments({role: req.params.role}));
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
})

// find by role
router.get('/find/:role',async function(req,res) {
    try {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        if(req.query.text){
            let regex = new RegExp(req.query.text, 'i'); 
            return res.json(await user.find({
                role: req.params.role,
                $or: [
                    { name: { $regex: regex } },
                    { mail: { $regex: regex } },
                    { role: { $regex: regex } },
                ]
            },{password:0}))
        }
        let model = null
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const row = parseInt(req.query.row);
            model = await user.find({role: req.params.role},{password:0}).skip(page*row).limit(row);
        }
        else{
            model = await user.find({role: req.params.role},{password:0});
        } 
        console.log(model?.length);
        if(!model){
            throw {message:'not found',status:404};
        } 
        return res.json(model);
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
        let model = await user.findById(req.params.id,{password:0}).populate({path:"prefered_emp",model:"User",select:'-password'}).populate({path:"prefered_service",model:"Service"});
        return res.status(200).send(model);
    }catch(error){
        if(error.status){
            return res.status(error.status).json(error.message);
        }else{
            return res.status(404);
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
});

router.post('/profile/:id',multer({storage:storage}).single('file'),async function(req,res){
    await user.updateOne({_id : req.params.id},{$set:{profile:req.params.id+'-'+req.file.originalname}});
    res.status(200).json("Profile enregistré");
});

module.exports = router;