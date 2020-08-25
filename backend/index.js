var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');


app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));


let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task',function(error){
    if(error) console.log(error);

        console.log("connection successful");
});



let Product = require('./Product.js');
let User = require('./User.js'); 

//Use the Router on the sub route /movies
app.use('/products', Product);
app.use('/admin',User);

app.listen(8081);