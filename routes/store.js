var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

/* GET Stores listing. */
router.get('/', function(req, res, next) {
    DB.get('Store',req.query)
        .then((stores)=>{
            res.send(stores);
        });

});
/**
 * create new store
 * and a new owner to that store
 * only logged in user can create stores
 */
router.post('/createStore', function(req, res, next) {
    if (req.body.StoreName == undefined)
    {
        res.send('didnt receive userName');
        return;
    }
    if(req.cookies.username==undefined||req.cookies.password==undefined) {
        res.send('Youre not logged in');
        return;
    }
    DB.authentication(req.cookies.username,req.cookies.password)
        .then(
            (isExist)=> {
                if(isExist) {
                    DB.set('Store', {storeName: req.body.StoreName, isActive: 1})
                        .then((newStore) => {
                            if(newStore.length > 0)
                                {
                                    DB.set('StoreOwner',{storeId: newStore[0].storeId, userName: req.cookies.username})
                                        .then((result)=>{
                                        res.send("The Store has been added with id: "+newStore[0].storeId);
                                    });
                                }
                                else
                                {
                                    res.send("unable to add the store");
                                }
                });
                }
                else{
                    res.send("user not logged in");
                }
        });


});
/**
 * update the Store
 * only the owner of the Store can update the Store
 */
router.put('/updateStore', function(req, res, next) {
    DB.authentication(req.cookies.username,req.cookies.password)
        .then((isExist)=>{
            if(isExist){
                DB.get('StoreOwner',{userName: req.cookies.username, storeId: req.body.storeId})
                    .then((owners)=>{
                       if(owners.length > 0){
                           DB.get('Store',{storeId: req.body.storeId})
                               .then((stores)=> {
                                   if(stores.length > 0 && stores[0].isActive){
                                       DB.update('Store',{storeId: req.body.storeId, storeName: req.body.storeName})
                                           .then((new_store)=>{
                                               res.send("the store has been updated");
                                           });
                                    }
                                    else{
                                        res.send("can not update an unactive store")
                                    }
                           });
                       }
                       else{
                           res.send("ERR: you are not the owner of that Store");
                       }
                });
            }
            else{
                res.send("user not logged in");
            }
    });
});


router.delete('/', function(req, res, next) {
    DB.authentication(req.cookies.username,req.cookies.password)
        .then((isExist)=>{
            if(isExist){
                Owner={}
                Owner.StoreId=req.query.StoreId;
                Owner.Username=req.cookies.username;
                if(Owner.StoreId==undefined)
                    res.send("store id not specified");
                DB.get("Owner",Owner)
                    .then((isOwner)=>{
                        if(isOwner){
                            store={};
                            Store.StoreId=req.query.StoreId;
                            DB.remove(Store)
                                .then((isRemoved)=>{
                                    if(isRemoved){
                                        res.send("the store has been Removed");
                                    }
                                    else{
                                        res.send("ERR: the store cant be removed");
                                    }
                                });
                        }
                        else{
                            userobj.Username=req.cookies.username;
                            DB.get(userobj)
                                .then((user)=>{
                                    if(user.isSuperUser){
                                        store={}
                                        Store.StoreId=req.query.StoreId;
                                        DB.remove(Store)
                                            .then((isRemoved)=>{
                                            if(isRemoved){
                                                res.send("the store has been Removed");
                                            }
                                            else{
                                                res.send("ERR: the store cant be removed");
                                             }
                                         });
                                    }
                                    else{
                                       res.send("you are not autorotize to delete this store");
                                    }
                            });

                        }
                });
            }
            else{
                res.send("you are not logged in")
            }
    });
});
module.exports = router;
