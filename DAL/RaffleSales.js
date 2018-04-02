var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from RaffleSales where";
        if(item.saleId !=null){
            queryString+=" saleId is '"+item.saleId+"'";
            all++;
        }
        if(item.offer!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" offer = "+item.offer;
            all++;
        }
        if(item.userName!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" userName = "+item.userName;
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
            queryString = "select * from RaffleSales";
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
        db.all("INSERT into RaffleSales " +
            "values ('"+item.saleId+"','"+ item.offer +"','" + item.userName + "','" + item.dueDate +"');",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from RaffleSales where saleId = '"+item.saleId+"' and " +
                        "offer = '"+item.offer+"' and userName = '"+item.userName+"' and dueDate = '"+item.dueDate+"'",function(err,rows){
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
        db.run("PRAGMA foreign_keys = ON;");
        db.all("UPDATE RaffleSales "
            +"SET offer = '"+item.offer + "', dueDate = '"+item.dueDate+"' "
            +"WHERE saleId = '"+item.saleId+"' and userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
                else{
                    db.all("select * from RaffleSales where saleId = '"+item.saleId+"' and " +
                        "offer = '"+item.offer+"' and userName = '"+item.userName+"' and dueDate = '"+item.dueDate+"'",function(err,rows){
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
        db.run("PRAGMA foreign_keys = ON;");
        db.all("DELETE FROM RaffleSales "
            +"WHERE saleId = '"+item.saleId+"' and userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



