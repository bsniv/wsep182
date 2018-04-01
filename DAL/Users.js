var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from Users where";
        if(item.userName!=null){
            queryString+=" userName is '"+item.userName+"'";
            all++;
        }
        if(item.password!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" password = "+item.password;
            all++;
        }
        if(item.isActive!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" isActive = "+item.isActive;
            all++;
        }
        if(item.isSuperUser!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" isSuperUser = "+item.isSuperUser;
            all++;
        }
        if(all==0){
            queryString = "select * from Users";
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

            db.all("INSERT into Users " +
                "values ('"+item.userName+"','"+ item.password +"','" + item.isActive + "','" + item.isSuperUser +"');",
                function (err) {
                    if (err){
                        reject("error");
                    }
                    else{
                        db.all("select * from Users where userName = '"+item.userName+"' and " +
                            "password = '"+item.password+"' and isActive = '"+item.isActive+"' and isSuperUser = '"+item.isSuperUser+"'",function(err,rows){
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
        db.all("UPDATE Users "
            +"SET password = '"+item.password + "', isActive = '"+item.isActive+"', isSuperUser = '"+item.isSuperUser+"' "
            +"WHERE userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from Users where userName = '"+item.userName+"' and " +
                        "password = '"+item.password+"' and isActive = '"+item.isActive+"' and isSuperUser = '"+item.isSuperUser+"'",function(err,rows){
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
        db.all("DELETE FROM Users \n"
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



