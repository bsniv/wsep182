var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from Admins where";
        if(item.userName!=null){
            queryString+=" userName is '"+item.userName+"'";
            all++;
        }
        if(all==0){
            queryString = "select * from Admins";
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
        db.all("INSERT into Admins " +
            "values ('"+item.userName+"');",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from Admins where userName = '"+item.userName+"'",function(err,rows){
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
        return new Promise((resolve,reject)=> {
           resolve("UPDATE IS NOT SUPPORTED IN THIS CLASS!");
    });
    },
    /**
     *
     */
    remove: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        db.all("DELETE FROM Admins \n"
            +"WHERE userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



