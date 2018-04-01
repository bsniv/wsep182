/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from UserCart where";
        if(item.session!=null){
            queryString+=" session is '"+item.session+"'";
            all++;
        }
        if(item.saleId!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" saleId = "+item.saleId;
            all++;
        }
        if(item.amount!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" amount = "+item.amount;
            all++;
        }

        if(all==0){

            queryString = "select * from UserCart";
        }
        db.all(queryString,function (err,rows){
            if(err){
                reject(queryString);
            }
            else{
                resolve(rows);
            }
        });
    });
    },
    /**
     *
     */
    set: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
            var queryString="insert into UserCart\n" +
                "(session, saleId, amount)\n" +
                "VALUES ('" + item.session + "'," + item.saleId+"," + item.amount +");";
        db.all(queryString,
            function (err) {
                if (err){
                    reject(queryString);
                }
                else{
                    db.all("select * from UserCart where session is '"+item.session+"' and saleId = "+item.saleId,
                        function(err,rows){
                            if(err){
                                reject("error");
                            }
                            else{
                                resolve(rows);
                            }
                        })
                }
            });
        db.close();
    });
    },
    /**
     *
     */
    update: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        var querySting="UPDATE UserCart " +
            "SET amount = " + item.amount+
            " where saleId = " + item.saleId +" and session is '"+ item.session+"'";
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("select * from UserCart where saleId = " + item.saleId +" and session is '"+ item.session+"'",
                        function(err,rows){
                            if(err){
                                reject("error");
                            }
                            else{
                                resolve(rows);
                            }
                        });
                }
            });
        db.close();
    });
    },
    /**
     *
     */
    remove: function(item){
        return new Promise((resolve,reject)=>{
            var db=new sqlite3.Database('DataBase.db');
        db.all("DELETE from UserCart where saleId = "+item.saleId +" and session is'"+item.session+"'" , function(err){
            if(err){
                resolve("error");
                return;
            }
            resolve("deleted");
        });
        db.close();
    });
    }
};
