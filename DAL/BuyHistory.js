//buyId (P.K), productId (F.K), storeId(F.K), userName(F.K), price, date, amount, tyopeOfSale
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from StoreOwners where";
        if(item.buyId!=null){
            queryString+=" buyId is '"+item.buyId+"'";
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
        if(item.userName!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" userName = "+item.userName;
            all++;
        }
        if(item.price!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" price = "+item.price;
            all++;
        }
        if(item.date!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" date = "+item.date;
            all++;
        }
        if(item.amount!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" amount = "+item.amount;
            all++;
        }
        if(item.tyopeOfSale!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" tyopeOfSale = "+item.tyopeOfSale;
            all++;
        }
        if(all==0){
            queryString = "select * from BuyHistory";
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
        db.run("PRAGMA foreign_keys = ON;");
            var query = "insert into BuyHistory "
                +" (productId, storeId, userName, price, date, amount, typeOfSale) \n"
                +"VALUES ('" + item.productId + "','" + item.storeId +"','"+item.userName+"','"+item.price+"','"
                +item.date+"','"+item.amount+"','"+item.typeOfSale+"')";
        db.all(query,
            function (err) {
                if (err){
                    reject(query);
                }
                else{
                    db.all("SELECT * FROM BuyHistory ORDER BY buyId DESC LIMIT 1",function(err,rows){
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
        return new promise((resolve,reject)=>{
            resolve("NOT IMPLEMENTED YET!");
    });
    },
    /**
     *
     */
    remove: function(item){
        return new Promise((resolve,reject)=> {
            resolve("NOT IMPLEMENTED YET!");
    });
    }
};



