var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from Stores where";
        if(item.storeId!=null){
            queryString+=" storeId is '"+item.storeId+"'";
            all++;
        }
        if(item.storeName!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" storeName = "+item.storeName;
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
            queryString = "select * from Stores";
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
            var query = "insert into Stores "
                +" (storeName, isActive) \n"
                +"VALUES ('" + item.storeName + "','" + item.isActive+"')";
        db.all(query,
            function (err) {
                if (err){
                    reject(err);
                }
                else{
                    db.all("SELECT * FROM Stores ORDER BY storeId DESC LIMIT 1",function(err,rows){
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
        db.run("PRAGMA foreign_keys = ON;");
        db.all("UPDATE Stores "
            +"SET storeName = '"+item.storeName + "'\n"
            +"WHERE storeId = '"+item.storeId+"'",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from Stores where storeId = '"+item.storeId+"' and " +
                        "storeName = '"+item.storeName+"' and isActive = '"+item.isActive+"'",function(err,rows){
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
    remove: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        db.all("UPDATE Stores \n"
            +"SET isActive = 0 \n"
            +"WHERE storeId = '"+item.storeId+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



