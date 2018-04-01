var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

/* GET users listing. */
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
router.post('/', function(req, res, next) {
    DB.authentication(req.cookies.userName,req.cookies.Password)
        .then(
            (isExist)=> {
                if(isExist) {
                    StoreToCreate = {}
                    StoreToCreate.StoreName = req.body.StoreName;
                    StoreToCreate.Owner = {}
                    StoreToCreate.Owner.Username = req.cookies.userName;
                    DB.set('Store', StoreToCreate)
                        .then((stores) => {
                        if(res != null
                )
                    {
                        res.send("The Store has been updated");
                    }
                else
                    {
                        res.send("err");
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
router.put('/', function(req, res, next) {
    DB.authentication(req.cookies.userName,req.cookies.Password)
        .then((isExist)=>{
            if(isExist){
                Owner={};
                Owner.Username=req.cookies.userName;
                Owner.StoreId=req.query.StoreId;
                DB.get('Owner',Owner)
                    .then((owner)=>{
                       if(owner){
                           StoreToUpdate={};
                           StoreToUpdate.StoreId=req.query.StoreId;
                           DB.get('Store',StoreToUpdate)
                               .then((store)=> {
                                   if(store.isActive){
                                       store.StoreName=req.body.StoreName;
                                       DB.update('Store',store)
                                           .then((new_store)=>{
                                               if(new_store){
                                                   res.send("the store has been updated");
                                               }
                                               else{
                                                   res.send("Err cannot update the store");
                                               }
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
    DB.authentication(req.cookies.userName,req.cookies.Password)
        .then((isExist)=>{
            if(isExist){
                Owner={}
                Owner.StoreId=req.query.StoreId;
                Owner.Username=req.cookies.userName;
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
                            userobj.Username=req.cookies.userName;
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
