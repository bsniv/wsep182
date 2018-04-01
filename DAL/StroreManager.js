/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from StoreManagers where";
        if(item.storeId!=null){
            queryString+=" storeId = "+item.storeId;
            all++;
        }
        if(item.userName!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" userName is '"+item.userName+"'";
            all++;
        }
        if(item.privilege!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" privilege = "+item.privilege;
            all++;
        }
        if(all==0){
            queryString = "select * from StoreManagers";
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
        db.all("insert into StoreManagers\n" +
            "(storeId, userName, privilege)\n" +
            "VALUES (" + item.storeId + ",'" + item.userName + "'," + item.privilege + ");",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("SELECT * FROM StoreManagers where storeId = "+item.storeId+" and userName is '" + item.userName + "' and privilege = " + item.privilege ,function(err,rows){
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
        var querySting="UPDATE StoreManagers " +
            "SET privilege = "+ item.privilege +
            "where storeId = "+item.storeId+" and userName is '" + item.userName + "' and privilege = " + item.privilege;
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("SELECT * FROM StoreManagers where storeId = "+item.storeId+" and userName is '" + item.userName + "' and privilege = " + item.privilege ,function(err,rows){
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
            var querySting="DELETE from StoreManagers " +
            "where storeId = "+item.storeId+" and userName is '" + item.userName + "' and privilege = " + item.privilege;
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
