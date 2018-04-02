var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');


router.get('/', function(req, res, next) {
    DB.get("ProductInStore",{})
        .then((productsInStores)=>{
            var length=productsInStores.length;
            var i=0;
            productsInStores.forEach((productInStore)=>{
                DB.get("Product",{productId: productInStore.productId})
                    .then((product)=>{
                        productInStore.product=product[0];
                        delete(productInStore.productId);
                        i++;//TODO:: Store
                        if(i==length)
                            res.send(productsInStores);
                    });
            });
        });
});


module.exports = router;
