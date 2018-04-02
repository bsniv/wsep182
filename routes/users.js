var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');


router.get('/login', function(req, res, next) {
    if(req.query.username==undefined||req.query.password==undefined){
        res.send("username or password not inserted");
    }
    else{
        DB.authentication(req.query.username,req.query.password)
            .then((isExist)=>{
                if(isExist){
                    res.cookie('username', req.query.username, {maxAge: 900000, httpOnly: true});
                    res.cookie('password', req.query.password, {maxAge: 900000, httpOnly: true});
                    res.send('you are connected')
                }
                else{
                    res.cookie('username', "", {maxAge: 900000, httpOnly: true});
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
        DB.set('User',{userName:req.body.userName, password: req.body.password})
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
                    DB.set('User',{userName:req.body.userName, password: req.body.password})
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
            DB.update('User',{userName:req.cookies.username, password: req.body.password})
            .then((result)=>{
                if(result){res.send("The User has been Added")}
                else{res.send("ERR: cant add user")}
            })
        .catch((err)=>{res.send(err);});
    }
    });

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
    DB.get('User',{userName: req.cookies.username})
        .then((user)=>{
        if(user && req.cookies.password == user.password){
                if (user.isAdmin || user.username = res.query.userName) {
                    DB.remove('User', {userName: req.cookies.username, password: req.cookies.password})
                        .then((result) = > {
                        if(result) {
                            res.send("The User has been removed")
                        }
                        else{res.send("ERR: cant remove user")
                    }
                    })
                    .catch((err) = > {res.send(err);
                    });
                }
                else res.send("trying to delete a user without permissions");
        }
        else res.send("not logged in");
    });
});


function validateAdminSession(username, password){
    if(DB.authentication(username,password))
        if(DB.get('User',username).isAdmin == true)
            return true;
    return false;
}

module.exports = router;
