const express = require('express');
const router = express.Router();
const user = require('../../models/person/User')

//login user return user{name,mail,role,token}
router.post('/login', async (req, res) => {
    const logged = await user.findOne({ mail: req.body.mail });
    if (!logged) return res.status(400).send('Mail introuvable.');
    console.log(logged.password);
    if (req.body.password!==logged.password) return res.status(400).send('Mail ou mot de passe incorrect.')
    res.json({
        name:logged.name,
        mail:logged.mail,
        role:logged.role
    })
});
// register user
router.post('/register',async (req,res)=>{
    try {
        await user.create(req.body)
        res.sendStatus(201)
    } catch (error) {
        if(error.status){
            res.status(error.status).json(error.message);
        }
        else{
            res.status(500).json(error.message)
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

module.exports = router;