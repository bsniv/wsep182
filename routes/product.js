var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');



router.post('/', function(req, res, next) {
    if (req.body.username== undefined || req.body.password== undefined)
    {
        res.send('in order to add product you have to be logged in');
        return;
    }
    DB.authentication(req.body.username,req.body.password)
        .then((isExist)=>{
            if(isExist){
                DB.update('Product',{productName: req.body.productName, basePrice: req.body.Price})
                    .then((updatedProduct)=>{res.send('the product has been updated')})
                    .catch((err)=>{res.send(err)});
            }
            else{
                res.send('in order to add product you have to be logged in');
            }
    }).catch((err)=>{res.send(err)});

});

router.put('/updateImportPrice', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if(DB.authentication(req.body.username,req.body.password)){
        DB.update('Product',req.body)
            .then((result)=>{res.send("The Product has been changed")})
    .catch((err)=>{res.send(err);});
    }
});

module.exports = router;
