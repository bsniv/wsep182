var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

/* GET users listing. */
router.get('/', function(req, res, next) {

    if(req.cookies.userName==undefined || req.cookies.Password==undefined) {
        cart={};
        cart.Session=req.cookies.session;
        DB.get('Cart',cart)
            .then((ArrayOfProduct)=>{resolve(ArrayOfProduct)});
    }
    else{
        DB.authentication(req.cookies.userName,req.cookies.Password)
            .then((isExist)=>{
                if(isExist){
                    cart={};
                    cart.Session=req.cookies.userName;
                }
                else{
                    cart={};
                    cart.Session=req.cookies.session;
                }
                DB.get('Cart',cart)
                    .then((ArrayOfProduct)=>{resolve(ArrayOfProduct)});

        });

    }

});

router.post('/', function(req, res, next) {
    if(req.cookies.userName==undefined || req.cookies.Password==undefined) {
        cart={};
        cart.Session=req.cookies.session;
        cart.productInStoreId=req.body.productInStoreId
        DB.set('Cart',cart)
            .then((ArrayOfProduct)=>{
                if(ArrayOfProduct){resolve("Product has added to cart")}
                else{resolve("ERR: could not add product to cart")}
            });
    }
    else{
        DB.authentication(req.cookies.userName,req.cookies.Password)
            .then((isExist)=>{
            if(isExist){
                cart={};
                cart.Session=req.cookies.userName;
            }
            else{
                cart={};
                cart.Session=req.cookies.session;
             }
            DB.set('Cart',cart)
                .then((ArrayOfProduct)=>{
                if(ArrayOfProduct){resolve("Product has added to cart")}
                else{resolve("ERR: could not add product to cart")}
            });

        });

    }

});

router.delete('/', function(req, res, next) {
    cart={};
    if(req.body.productInStoreId==undefined){
       res.send("ERR: productInStoreId not sent");
    }
    else{
        cart.productInStoreId=req.body.productInStoreId
        if(req.cookies.userName==undefined || req.cookies.Password==undefined) {
            cart.Session=req.cookies.session;
            DB.remove('Cart',cart)
                .then((isRemoved)=>{
                    if(isRemoved){
                        res.send("The product has been removed from cart")
                    }
                    else{
                        res.send("ERR: faild to remove product from cart");
                    }
            });
        }
        else {
            DB.authentication(req.cookies.userName,req.cookies.Password)
                .then((isExist)=>{
                    if(isExist){
                        cart.Session=req.cookies.userName;
                    }
                    else{
                        cart.Session=req.cookies.session;
                    }
                    DB.remove('Cart',cart)
                        .then((isRemoved)=>{
                        if(isRemoved){resolve("The product has been removed from cart")}
                        else{resolve("ERR: faild to remove product from cart")}});
            });
        }

    }

});

module.exports = router;
