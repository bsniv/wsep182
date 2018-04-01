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

router.post('/', function(req, res, next) {
    DB.set('Store',req.query)
        .then((stores)=>{
            if(res!=null){
                res.send("The Store has been updated");
            }
            else{
                res.send("err");
            }
    });
});

router.post('/', function(req, res, next) {
    DB.set('Store',req.query)
        .then((stores)=>{
        if(res!=null){
        res.send("The Store has been updated");
    }
else{
        res.send("err");
    }
});
});

module.exports = router;
