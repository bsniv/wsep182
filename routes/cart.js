var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

//CHANGE TO POST
/* GET all the products in the cart. */
router.post('/', function(req, res, next) {
    if(req.cookies.userName==undefined || req.cookies.Password==undefined) {
        cart={};
        cart.Session=req.cookies.session;
        DB.get('UserCart',cart)
            .then((ArrayOfProduct)=>{
                res.send(ArrayOfProduct)});
    }
    else{
        DB.authentication(req.cookies.username,req.cookies.Password)
            .then((isExist)=>{
                if(isExist){
                    cart={};
                    cart.Session=req.cookies.username;
                }
                else{
                    cart={};
                    cart.Session=req.cookies.session;
                }
                DB.get('UserCart',cart)
                    .then((ArrayOfProduct)=>{res.send(ArrayOfProduct)});
        });
    }
});


//CHANGE TO POST
/* add products to the cart. */
router.post('/addProductToCart', function(req, res, next) {
    if (req.body.saleId == undefined || req.body.Amount == undefined)
    {
        res.send("missing variables in request, saleId and amount needed");
        return;
    }
    if(req.cookies.username==undefined || req.cookies.password==undefined) {
        DB.set('UserCart',{saleId: req.body.saleId, amount: req.body.Amount, session: req.cookies.session})
            .then((success)=>{
                if (success)
                    res.send("product added to cart")});
    }
    else{
        DB.authentication(req.cookies.username,req.cookies.password)
            .then((isExist)=>{
                if(isExist){
                    session=req.cookies.username;
                }
                else{
                    session=req.cookies.session;
                }
            DB.set('UserCart',{saleId: req.body.saleId, amount: req.body.Amount, session: session})
                .then((success)=>{
                if (success)
                res.send("product added to cart")});
    });
    }
});



/* update cart. */
router.put('/updateProductsInCart', function(req, res, next) {
    if (req.body.saleId == undefined || req.body.Amount == undefined)
    {
        res.send("missing variables in request, productInStoreId and amount needed");
        return;
    }
    if(req.cookies.username==undefined || req.cookies.password==undefined) {
        updateCart(req,res,req.body.saleId,req.body.Amount,req.cookies.session);
    }
    else{
        DB.authentication(req.cookies.username,req.cookies.password)
            .then((isExist)=>{
                if(isExist){
                    session=req.cookies.username;
                }
                else{
                    session=req.cookies.session;
                }
                updateCart(req,res,req.body.saleId,req.body.Amount,session);
            });
    }
});

function updateCart(req, res, saleId, amount, session){
    if (amount == 0)
    {
        DB.get('UserCart', {session: session, saleId: saleId}).then((isExist) => {
            if(isExist) {
                DB.remove('UserCart', {saleId: saleId, session: session})
                    .then((success) => {
                    if(success)
                    res.send("product removed from cart")
            })
                ;
            }
        });
    }
    else {
        DB.get('UserCart', {session: session, saleId: saleId}).then((isExist) => {
            if(isExist) {
                DB.update('UserCart', {saleId: saleId, amount: amount, session: session})
                    .then((success) => {
                    if(success)
                    res.send("cart updated")
            })
                ;
            }
        });
    }
}


module.exports = router;
