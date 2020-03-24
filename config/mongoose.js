//require library
const mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

//aquire the connection(to check if it is successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));

//up and running then print the msg
db.once('open',function(){
    console.log('successfully connected to database');
});