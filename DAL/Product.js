/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
            var all=0;
            var queryString = "select * from Products where";
            if(item.productId!=null){
                queryString+=" productId = "+item.productId;
                all++;
            }
            if(item.productName!=null){
                if(all!=0){
                    queryString+=" and";
                }
                queryString+=" productName is '"+item.productName+"'";
                all++;
            }
            if(item.basePrice!=null){
                if(all!=0){
                    queryString+=" and";
                }
                queryString+=" basePrice = "+item.basePrice;
                all++;
            }
            if(all==0){
                queryString = "select * from Products";
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
                db.all("insert into Products\n" +
                    "(productId, productName, basePrice)\n" +
                    "VALUES (" + item.productId + ",'" + item.productName + "'," + item.basePrice + ");",
                    function (err) {
                        if (err){
                            reject("error");
                        }
                        else{
                            db.all("select * from Products where productId = "+item.productId+" and " +
                                "productName is '"+item.productName+"' and basePrice = "+item.basePrice,function(err,rows){
                                if(err){
                                    reject("error");
                                }
                                else{
                                    resolve(rows[0]);
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
            var querySting="UPDATE Products " +
                "SET productId = " + item.productId +
                ", productName = '"+ item.productName +
                "', basePrice = " + item.basePrice+
                " where productId = " + item.productId;
            db.all(querySting ,
                function (err) {
                    if (err){
                        reject(querySting);
                    }
                    else{
                        db.all("select * from Products where productId = "+item.productId+" and " +
                            "productName is '"+item.productName+"' and basePrice = "+item.basePrice,
                            function(err,rows){
                                if(err){
                                    reject("error");
                                }
                                else{
                                    resolve(rows[0]);
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
    remove: function(item){
        return new Promise((resolve,reject)=>{
            var db=new sqlite3.Database('DataBase.db');
        db.all("DELETE from Products where productId = "+item.productId, function(err){
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
