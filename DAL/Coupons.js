/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from Coupons where";
        if(item.couponId!=null){
            queryString+=" couponId = "+item.couponId;
            all++;
        }
        if(item.productInStoreId != null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" productInStoreId = "+item.productInStoreId;
            all++;
        }
        if(item.percentage!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" percentage = "+item.percentage;
            all++;
        }
        if(item.dueDate!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" dueDate = "+item.dueDate;
            all++;
        }
        if(all==0){
            queryString = "select * from Coupons";
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
            var queryString="insert into Coupons\n" +
                "(couponId, productInStoreId, percentage, dueDate)\n" +
                "VALUES ('" + item.couponId + "'," + item.productInStoreId + "," + item.percentage + ",'" + item.dueDate + "');";
        db.all(queryString,
            function (err) {
                if (err){
                    reject(queryString);
                }
                else{
                    db.all("SELECT * FROM Coupons where couponId is '"+item.couponId+"'" ,function(err,rows){
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
    update: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        var querySting="UPDATE Coupons " +
            "SET percentage = "+ item.percentage +
            ", dueDate = '"+ item.dueDate +
            "' where couponId is '"+item.couponId+"'";
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("SELECT * FROM Coupons where couponId is '"+item.couponId+"'" ,function(err,rows){
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
        var querySting="DELETE from Coupons " +
            "where couponId is '"+item.couponId+"'";
        db.all(querySting, function(err){
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
