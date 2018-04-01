var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');


router.post('/login', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if(DB.authentication(req.body.username,req.body.password)){
        res.cookie('username', req.body.username, {maxAge: 900000, httpOnly: true});
        res.cookie('password', req.body.password, {maxAge: 900000, httpOnly: true});
        res.send('abcde');
    }
});

router.get('/login', function(req, res, next) {
    if(DB.authentication(req.query.username,req.query.password)){
        res.cookie('username', req.query.username, {maxAge: 900000, httpOnly: true});
        res.cookie('password', req.query.password, {maxAge: 900000, httpOnly: true});
        res.send('abcde');
    }
});

router.post('/register', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if (req.body.isAdmin == true && !validateAdminSession(req.cookies.username,req.cookies.password)) {
        res.send('only Admin can add Admins');
        return;
    }
    DB.set('User',req.body.Users)
        .then((result)=>{res.send("The User has been Added")})
    .catch((err)=>{res.send(err);});
});

router.get('/register', function(req, res, next) {
    if (req.query.isAdmin == true && !validateAdminSession(req.cookies.username,req.cookies.password)){
        res.send('only Admin can add Admins');
        return;
    }
    DB.set('User',req.query)
        .then((result)=>{res.send("The User has been Added")})
.catch((err)=>{res.send(err);});
});


router.put('/update', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if(DB.authentication(req.cookies.username,req.cookies.password))
        if (req.cookies.username == req.body.username || validateAdminSession(req.cookies.username,req.cookies.password)){
            DB.update('User',req.body)
                .then((result)=>{res.send("The User has been changed")})
        .catch((err)=>{res.send(err);});
        }
        else res.send('not authorized');
    else res.send('authentication failed');
});

router.delete('/delete', function(req, res, next) {
    if (req.body == undefined)
    {
        res.send('received empty body');
        return;
    }
    if(validateAdminSession(req.cookies.username,req.cookies.password)){
            DB.remove('User',req.body)
                .then((result)=>{res.send("The User has been deleted")})
        .catch((err)=>{res.send(err);});
        }
        else res.send('not authorized');
});


function validateAdminSession(username, password){
    if(DB.authentication(username,password))
        if(DB.get('User',username).isAdmin == true)
            return true;
    return false;
}

module.exports = router;
