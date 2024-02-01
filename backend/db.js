var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{
    authSource:'admin',
    user:process.env.MONGO_USER,
    pass:process.env.MONGO_PASS,
    autoIndex:true,
}).then(()=> console.log('MongoDB is connected')).catch((e)=>{throw e})