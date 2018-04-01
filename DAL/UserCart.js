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
        if(item.cookies!=null){
            queryString+=" cookies is '"+item.cookies+"'";
            all++;
        }
        if(item.productInStoreId!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" productInStoreId = "+item.productInStoreId;
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
                "(cookies, productInStoreId, amount)\n" +
                "VALUES ('" + item.cookies + "'," + item.productInStoreId+"," + item.amount +");";
        db.all(queryString,
            function (err) {
                if (err){
                    reject(queryString);
                }
                else{
                    db.all("select * from UserCart where cookies is '"+item.cookies+"' and productInStoreId = "+item.productInStoreId,
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
        var querySting="UPDATE UserCart " +
            "SET cookies = '"+ item.cookies +"'"+
            ", productInStoreId = "+ item.productInStoreId +
            ", amount = " + item.amount+
            " where productInStoreId = " + item.productInStoreId +" and cookies is '"+ item.cookies+"'";
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("select * from UserCart where productInStoreId = " + item.productInStoreId +" and cookies is '"+ item.cookies+"'",
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
        db.all("DELETE from UserCart where productInStoreId = "+item.productInStoreId +" and cookies is'"+item.cookies+"'" , function(err){
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
