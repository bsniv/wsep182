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
            db.run("insert into Users\n" +
                "(userName, password, isActive, isSuperUser)\n" +
                "VALUES (" + item.userName + ",'" + item.password + "'," + item.isActive + ",'" + item.isSuperUser ");",
                function (err) {
                    if (err){
                        reject("error");
                    }
                    else{
                        db.run("select * from Products where userName = "+item.userName+" and " +
                            "password = "+item.password+" and isActive = "+item.basePrice+" and isSuperUser = "+item.isSuperUser,function(err,rows){
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
        db.run("UPDATE Users \n"
            +"SET password = "+item.password + ", isActive = "+item.isActive+", isSuperUser = "+item.isSuperUser+" \n"
            +"WHERE username = "+item.username,
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.run("select * from Products where userName = "+item.userName+" and " +
                        "password = "+item.password+" and isActive = "+item.basePrice+" and isSuperUser = "+item.isSuperUser,function(err,rows){
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
        db.run("DELETE FROM Users \n"
            +"WHERE username = "+item.username,
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



