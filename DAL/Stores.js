var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from Store where";
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
            queryString = "select * from Store";
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
        db.all("insert into Store " +
            "VALUES ('" + item.storeId + "','" + item.storeName + "','" + item.isActive+"');",
            function (err) {
                if (err){
                    reject("error1");
                }
                else{
                    db.all("select * from Store where storeId = '"+item.storeId+"' and " +
                        "storeName = '"+item.storeName+"' and isActive = '"+item.isActive+"'",function(err,rows){
                        if(err){
                            reject("error2");
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
        db.all("UPDATE Store \n"
            +"SET storeName = '"+item.storeName + "', isActive = '"+item.isActive+"' \n"
            +"WHERE storeId = '"+item.storeId+"'",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from Store where storeId = '"+item.storeId+"' and " +
                        "storeName = '"+item.storeName+"' and isActive = '"+item.isActive+"'",function(err,rows){
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
        db.all("DELETE FROM Store \n"
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



