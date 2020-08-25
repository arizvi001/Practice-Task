let express = require('express');
let signIn= require('./User.js');
let router = express.Router();
let mongoose = require('mongoose');


let productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});



let Product= mongoose.model("product",productSchema);

//Displaying all products
router.get('/',function(request,response){
    Product.find({},function(err,res){
        if(err) 
            response.send("Error in displaying products");
        else 
            response.json(res);
    });
});

//get one product
router.get('/:id',function(request,response){
    Product.findById(request.params.id,function(err,res){
        if(err) 
            response.send("Error in displaying products");
        else 
            response.json(res);
    });
});

//this is for getting the view but in our case we are not using pugs 
router.get('/addProduct',signIn.checkSignIn,function(req,res){
    res.render('addProduct');
});

//Adding product
router.post('/addProduct',function(request,response){ //add signIn.checkSignIn
   if(!request.body.name || !request.body.price)
   {
        response.status('400');
        response.send('Please provide all details');
   }
   else
   {
       let newProduct= new Product({
            _id: new mongoose.Types.ObjectId,
            name: request.body.name,
            price: request.body.price,
       })

       newProduct.save(function(err,product){
           if(err) 
           response.send('Error in saving product in DB');
           else 
            response.send('Product saved successfully with id: '+product._id);
       });
   }
});

//this is for getting the view but in our case we are not using pugs 
router.get('/updateProduct',signIn.checkSignIn,function(req,res){
    res.render('updateProduct');
});

//Updating product
router.put('/updateProduct',function(request,response){//add signIn.checkSignIn
    if(!request.body.idToFind||!request.body.name || !request.body.price)
    {
         response.status('400');
         response.send('Please provide all details');
    }
    else
    {
        Product.findByIdAndUpdate(request.body.idToFind,{name: request.body.name,price: request.body.price},function(err,product){        
                if(err) 
                    response.send('Error in updating database');
                else 
                    response.send('Product updated successfully with id: '+product._id);
        });
    }
});

//this is for getting the view but in our case we are not using pugs
router.get('/deleteProduct',signIn.checkSignIn,function(req,res){
    res.render('deleteProduct');
});

//Deleteing product
router.delete('/deleteProduct/:id',function(request,response){
    console.log("in delete");
    if(!request.params.id)
    {
         response.status('400');
         response.send('Please provide all details');
    }
    else
    {
        Product.findByIdAndDelete(request.params.id,function(err,product){
            if(err) 
                response.send('Error in deleting from DB');
            else 
                response.json('Product has been removed sucessfully with id:' + request.params.id);
        });
    }
});


//Filtering product by name
router.get('/filterProduct/:query',function(request,response){
    Product.find({ name: { "$regex": request.params.query, "$options": "i" }},function(err,products){
        if(err) 
            response.send('Error in filtering products');
        else 
            response.send(products);
    });
});



module.exports = router;
