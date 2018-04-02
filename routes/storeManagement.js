var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

router.post('/addProduct', function(req, res, next) {

    if (req.query.ProductId == undefined
        || req.query.StoreId==undefined
        || req.query.Amount==undefined
        || req.query.StorePrice==undefined)
    {
        res.send('Wrong number of arguments error!');
        return;
    }

    DB.authentication(req.cookies.username,req.cookies.password)
            .then((isExist)=>{
                if(isExist) {
                    //an active user is using the system!
                    var pId = req.query.ProductId;
                    var storeId = req.query.StoreId;
                    var amount = req.query.Amount;
                    var storePrice = req.query.StorePrice;

                    DB.get("StoreOwners",{storeId:storId,userName:req.cookies.userName}).then((isStoreOwner)=>{
                        if(isStoreOwner.length == 1){ //if indeed store owner
                        DB.set("ProductsInStore",{productId:pid,storeId:storeId,price:storePrice,amount:amount,isActive:1})
                            .then((res)=>{
                            if(res.length == 1){
                            res.send("Product was added succesfully");
                        }
                    else{
                            res.send("An Error occured when adding the product");
                        }
                    });
                    }
                else{ //if not, need to check if user is a store manager with proper persmission
                        DB.get("StoreManagers",{storeId:storeId,userName:req.cookies.userName,privilege:1})
                            .then((isAllowed)=>{
                            if(isAllowed.length == 1){
                            DB.set("ProductsInStore",{productId:pid,storeId:storeId,price:storePrice,amount:amount,isActive:1})
                                .then((res)=>{
                                if(res.length == 1){
                                res.send("Product was added succesfully");
                            }
                        else{
                                res.send("An Error occured when adding the product");
                            }
                        });
                        }
                    else{
                            res.send("The Manager is not allowed to add a product!");
                        }
                    });
                    }
                });

            }
            else{
                res.send("ERROR: user either not exist or no longer active!");
            }
    }).catch((err)=>{res.send(err);});
});



module.exports = router;
