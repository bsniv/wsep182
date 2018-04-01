var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function () {
        return new Promise((resolve,reject)=>{
            resolve(0);
    });
    },
    /**
     *
     */
    set: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.run("insert into Store\n" +
            "(storeId, storeName, isActive)\n" +
            "VALUES (" + item.storeId + ",'" + item.storeName + "'," + item.isActive+");",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.run("select * from Store where storeId = "+item.storeId+" and " +
                        "storeName = "+item.storeName+" and isActive = "+item.isActive,function(err,rows){
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
        db.run("UPDATE Store \n"
            +"SET storeName = "+item.storeName + ", isActive = "+item.isActive+" \n"
            +"WHERE storeId = "+item.storeId,
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.run("select * from Store where storeId = "+item.userName+" and " +
                        "storeName = "+item.storeName+" and isActive = "+item.isActive,function(err,rows){
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
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.run("DELETE FROM Store \n"
            +"WHERE storeId = "+item.storeId,
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



