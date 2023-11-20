const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/key');
const {User} = require('./models/user');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

async function connect(){
    await mongoose.connect(config.mongoURI);
    console.log("MongoDB success");
}

connect();

app.get('/',function(req,res){
    res.send('Hello Wolrd! sibal');
});

app.post('/register',async(req,res)=>{

    const user = new User(req.body)

    try{
        const result = await user.save()
        return res.json({success : true});
    }
    catch(err){
        return res.json({success : false, err});
    }
})

app.listen(3000,function(){
    console.log('express is listening');
})