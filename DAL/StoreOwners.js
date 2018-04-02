var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from StoreOwners where";
        if(item.storeId!=null){
            queryString+=" storeId is '"+item.storeId+"'";
            all++;
        }
        if(item.userName!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" userName = '"+item.userName+"' ";
            all++;
        }
        if(all==0){
            queryString = "select * from StoreOwners";
        }
        db.all(queryString,function (err,rows){
            if(err){
                reject(err);
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
        db.all("insert into StoreOwners " +
            "VALUES ('" + item.storeId + "','" + item.userName +"');",
            function (err) {
                if (err){
                    reject("error1");
                }
                else{
                    db.all("select * from StoreOwners where storeId = '"+item.storeId+"' and " +
                        "userName = '"+item.userName+"'",function(err,rows){
                        if(err){
                            reject("error2");
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
            resolve("THIS TABLE CANNOT BE UPDATED!");
        });
    },
    /**
     *
     */
    remove: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        db.all("DELETE FROM storeOwners \n"
            +"WHERE storeId = '"+item.storeId+"'"+" and "+ "userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



