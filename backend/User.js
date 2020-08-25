let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



let userSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:String,
    password: Number
});


let User= mongoose.model("user",userSchema);

//this is for getting the view but in our case we are not using pugs 
router.get('/manageProducts',function(request,response){
    response.render('login');
});

router.post('/login',function(request, response){

    if(!request.body.username||!request.body.password)
    {
        response.status('400');
        response.send("Invalid credentials");
    }
    else
    {
        console.log(request.body.username);
        let conditions = {  
                            username:request.body.username, 
                            password:request.body.password
                        };

        User.find(conditions,function(err,user){
            if(err)
            {
                response.status('400');
                response.send("DB error in retrieving data");
            }
            else if(user)
            {
                request.session.user=user;
                // response.redirect('/admin/main');
                response.json("User logged in!!!");
            }
            else  response.json("user does not exists");
            
        });
    }
});

router.post('/makeAdmin',function(request,response){
    if(!request.body.username||!request.body.password)
    {
        response.status('400');
        response.send("Invalid credentials");
    }
    else{
        let newUser= new User({
            _id: new mongoose.Types.ObjectId,
            username: request.body.username,
            password: request.body.password,
       })

       newUser.save(function(err,user){
           if(err) 
           response.send('Error in saving product in DB');
           else 
            response.send('User saved successfully with id: '+user._id);
       });
    }
});

function checkSignIn(req, res,next){
    if(req.session.user){
       next();     
    } else {
       let err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }
 
//this is for getting the view but in our case we are not using pugs 
router.get('/main',checkSignIn,function(req,res){
    res.render('mainpage');
});

module.exports = router;
module.exports.checkSignIn=checkSignIn;

