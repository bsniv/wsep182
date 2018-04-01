var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');


router.post('/addProduct', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if (DB.get('Product'),req.body.productName != undefined)
        return;
    if(DB.authentication(req.body.username,req.body.password)){
        DB.update('Product',req.body)
            .then((result)=>{res.send("The Product has been changed")})
    .catch((err)=>{res.send(err);});
        }
});

router.put('/updateImportPrice', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if (DB.get('Product'),req.body.productName != undefined)
        return;
    if(DB.authentication(req.body.username,req.body.password)){
        DB.update('Product',req.body)
            .then((result)=>{res.send("The Product has been changed")})
    .catch((err)=>{res.send(err);});
    }
});

module.exports = router;
