var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');


router.get('/login', function(req, res, next) {
    if(req.query.userName==undefined||req.query.password==undefined){
        res.send("username or password not inserted");
    }
    else{
        DB.authentication(req.query.userName,req.query.password)
            .then((isExist)=>{
                if(isExist){
                    res.cookie('username', req.query.userName, {maxAge: 900000, httpOnly: true});
                    res.cookie('password', req.query.password, {maxAge: 900000, httpOnly: true});
                    res.send('you are connected')
                }
                else{
                    res.cookie('use1rname', "", {maxAge: 900000, httpOnly: true});
                    res.cookie('password', "", {maxAge: 900000, httpOnly: true});
                    res.send('wrong username or password');
                }
        });
    }
});

router.post('/register', function(req, res, next) {
    if (req.body.userName == undefined || req.body.password==undefined)
    {
        res.send('received empty body');
        return;
    }
    if(req.cookies.username==undefined||req.cookies.password==undefined){
        DB.set('User',{userName:req.body.userName, password: req.body.password, isActive:1})
            .then((result)=>{
                if(result){res.send("The User has been Added")}
                else{res.send("ERR: cant add user")}
            })
            .catch((err)=>{res.send(err);});
    }
    else{
        DB.authentication(req.cookies.username,req.cookies.password)
            .then((isExist)=>{
                if(isExist){
                    res.send("you allready have a user");
                }
                else{
                    DB.set('User',{userName:req.body.userName, password: req.body.password, isActive:1})
                    .then((result)=>{
                                if(result){res.send("The User has been Added")}
                                else{res.send("ERR: cant add user")}
                    })
                    .catch((err)=>{res.send(err);});
                }
        });
    }

});



router.put('/update', function(req, res, next) {
    if (req.body.password == undefined)
    {
        res.send('didnt receive password');
        return;
    }
    if(req.cookies.username==undefined||req.cookies.password==undefined) {
        res.send('Youre not logged in');
        return;
    }
    DB.authentication(req.cookies.username,req.cookies.password)
        .then((isExist)=>{
        if(isExist){
            DB.update('Users',{userName:req.cookies.username, password: req.body.password})
            .then((result)=>{
                if(result){res.send("The Password has been updated")}
                else{res.send("ERR: cant add user")}
            })
        .catch((err)=>{res.send(err);});
        }
        else{
            res.send("you are not connected");
        }
    }).catch((err)=>res.send(err));

});

router.delete('/delete', function(req, res, next) {
    if (req.query.userName == undefined)
    {
        res.send('didnt receive userName');
        return;
    }
    if(req.cookies.username==undefined||req.cookies.password==undefined) {
        res.send('Youre not logged in');
        return;
    }
    DB.get('Users',{userName: req.cookies.username})
        .then((user)=>{
        if(user && user[0].isActive==1 && req.cookies.password == user[0].password){
                if (user[0].isAdmin==1 || user[0].userName == req.query.userName) {
                    DB.remove('Users', {userName: req.query.userName})
                        .then((result) => {
                        if(result) {
                            res.send("The User has been removed")
                        }
                        else{res.send("ERR: cant remove user")
                    }
                    })
                    .catch((err) => {res.send(err);
                    });
                }
                else res.send("trying to delete a user without permissions");
        }
        else res.send("not logged in");
    })
    .catch((err)=>res.send(err));
});


router.put('/restore', function(req, res, next) {
    if (req.query.userName == undefined)
    {
        res.send('didnt receive user to restore');
        return;
    }
    if(req.cookies.userName==undefined||req.cookies.password==undefined) {
        res.send('Youre not logged in');
        return;
    }
    DB.get("Users",{userName: req.cookies.userName})
        .then((user)=>{
            if(user.length>0 && user[0].isAdmin && user[0].isActive==1){
                DB.get("Users",{userName:req.query.userName})
                    .then((user)=>{
                        user[0].isActive=1;
                        DB.update("Users",user[0])
                            .then((result)=>{
                                if(result)
                                    res.send("user has been restored");
                                else
                                    res.send("ERR: user has not restored");
                            });
                });
            }
            else{
               res.send('your are not autorotize for this action');
            }
    });

});

router.post('/superUser', function(req, res, next) {
    if (req.query.userName == undefined)
    {
        res.send('didnt receive user to make superUser');
        return;
    }
    if(req.cookies.userName==undefined||req.cookies.password==undefined) {
        res.send('Youre not logged in');
        return;
    }
    DB.get("Users",{userName: req.cookies.userName})
        .then((user)=>{
        if(user.length>0 && user[0].isAdmin==1 && user[0].isActive==1){
            DB.get("Users",{userName: req.query.userName})
                .then((user)=>{
                    if(user.length==0){
                        res.send('the user you are trying to make admin is not exist');
                    }
                    else{
                        DB.set("Admins",user[0])
                            .then((result)=>{
                                if(result){
                                    res.send('the user is now admin');
                                }
                                else{
                                    res.send('ERR')
                                }
                            }).catch((err)=>{res.send(err)});
                    }
                }).catch((err)=>{res.send(err)});
        }
        else{
                res.send('your are not autorotize for this action');
        }
});

});

router.delete('/superUser', function(req, res, next) {
    if (req.query.userName == undefined)
    {
        res.send('didnt receive user to remove from beeing superUser');
        return;
    }
    if(req.cookies.userName==undefined||req.cookies.password==undefined) {
        res.send('You are not logged in');
        return;
    }
    DB.get("Users",{userName: req.cookies.userName})
        .then((user)=>{
        if(user.length>0 && user[0].isAdmin==1 && user[0].isActive==1){
        DB.get("Users",{userName: req.query.userName})
            .then((user)=>{
            if(user.length==0){
                res.send('the user you are trying to remove from being admin is not exist');
            }
            else{
                DB.remove("Admins",user[0])
                    .then((result)=>{
                        if(result){
                            res.send('the user is now not admin');
                        }
                        else{
                            res.send('ERR')
                        }
                    }).catch((err)=>{res.send(err)});
            }
        }).catch((err)=>{res.send(err)});
    }
    else{
        res.send('your are not autorotize for this action');
    }
});

});


module.exports = router;
