/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from ProductsInStore where";
        if(item.productInStoreId!=null){
            queryString+=" productInStoreId = "+item.productInStoreId;
            all++;
        }
        if(item.productId!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" productId = "+item.productId;
            all++;
        }
        if(item.storeId!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" storeId = "+item.storeId;
            all++;
        }
        if(item.storePrice!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" storePrice = "+item.storePrice;
            all++;
        }
        if(item.amount!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" amount = "+item.amount;
            all++;
        }
        if(item.isActive!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" isActive = "+item.isActive;
            all++;
        }
        if(all==0){

            queryString = "select * from ProductsInStore";
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
        db.all("insert into ProductsInStore\n" +
            "(productInStoreId, productId, storeId, storePrice, amount, isActive)\n" +
            "VALUES (" + item.productInStoreId + "," + item.productId + "," + item.storeId + "," + item.storePrice + "," + item.amount +"," + item.isActive +");",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from ProductsInStore where productInStoreId = "+item.productInStoreId,
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
    update: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        var querySting="UPDATE ProductsInStore " +
            "SET productInStoreId = " + item.productInStoreId +
            ", productId = "+ item.productId +
            ", storeId = " + item.storeId+
            ", storePrice = " + item.storePrice+
            ", amount = " + item.amount+
            ", isActive = " + item.isActive+
            " where productInStoreId = " + item.productInStoreId;
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("select * from ProductsInStore where productInStoreId = "+item.productInStoreId,
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
        db.all("DELETE from ProductsInStore where productInStoreId = "+item.productInStoreId, function(err){
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
