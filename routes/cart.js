var express = require('express');
var router = express.Router();
var DB = require('../DAL/DALManager');

/* GET users listing. */
router.get('/', function(req, res, next) {

    if(req.cookies.userName==undefined || req.cookies.Password==undefined) {

    }
    DB.authentication(req.cookies.userName,req.cookies.Password)
        .then(
            (isExist)=> {

        });


});

module.exports = router;
