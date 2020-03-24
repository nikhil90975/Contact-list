const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//takes the request and reads the data and analyses instanceof...
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     //console.log('middleware1 called');
//     req.myname="nikhil";
//     next();
// });
// //middleware2
// app.use(function(req,res,next){
//     //console.log('middleware2 called');
//     console.log('my name from mw2',req.myname);
//     next();
// })


var contactlist =[
    {
        name:"nikhil",
        phone:"9097531284"
    },
    {
        name:"nikhil",
        phone:"909753128"
    },
    {
        name:"nikhil",
        phone:"90975312"
    }
]

app.get('/',function(req,res){
    //console.log(req.myname);

    Contact.find({},function(err,contacts){
        if(err){
            console.log('error');
            return;
        }
        return res.render('home',{
            title:"Contact List",
            contact_list:contacts
        });
    });    
});

app.get('/practice',function(req,res){
    
    return res.render('practice');
    
});

app.post('/create-contact',function(req,res){
    //contactlist.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating contact!');
    return;}
    console.log('*******',newContact);
    return res.redirect('back');
    });
});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id= req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }

        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err){
        console.log('Error!',err);
    }
        console.log('running server');
    
});