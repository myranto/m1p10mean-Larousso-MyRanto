const express = require('express');
const router = express.Router();
const user = require('../../models/person/User')

//login user return user{name,mail,role,token}
router.post('/login', async (req, res) => {
    const logged = await user.findOne({ mail: req.body.mail });
    if (!logged) return res.status(406).send('Mail introuvable.');
    console.log(logged.password);
    if (req.body.password!==logged.password) return res.status(406).send('Mail ou mot de passe incorrect.')
    res.json({
        name:logged.name,
        mail:logged.mail,
        role:logged.role
    })
});
// register user
router.post('/register',async (req,res)=>{
    try {
        console.log(req.body);
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
        res.sendStatus(400).json(error);
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
            res.status(500).json(error);
        }
    }
})
module.exports = router;