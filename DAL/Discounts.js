var sqlite3 = require('sqlite3').verbose();


module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        db.run("PRAGMA foreign_keys = ON;");
        var all=0;
        var queryString = "select * from Discounts where";
        if(item.productInStoreId !=null){
            queryString+=" productInStoreId  is '"+item.productInStoreId +"'";
            all++;
        }
        if(item.percentage!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" percentage = "+item.percentage;
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
            queryString = "select * from Discounts";
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
        db.all("INSERT into Discounts " +
            "values ('"+item.productInStoreId+"','"+ item.percentage +"','" + item.dueDate + "');",
            function (err) {
                if (err){
                    reject(err);
                }
                else{
                    db.all("select * from Discounts where productInStoreId = '"+item.productInStoreId+"' and " +
                        "percentage = '"+item.percentage+"' and dueDate = '"+item.dueDate+"'",function(err,rows){
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
        db.all("UPDATE Discounts "
            +"SET percentage = '"+item.percentage + "', dueDate = '"+item.dueDate+"' "
            +"WHERE productInStoreId = '"+item.productInStoreId+"'",
            function (err) {
                if (err){
                    reject(err);
                }
                else{
                    db.all("select * from Discounts where productInStoreId = '"+item.productInStoreId+"' and " +
                        "percentage = '"+item.percentage+"' and dueDate = '"+item.dueDate+"'",function(err,rows){
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
        db.all("DELETE FROM Discounts \n"
            +"WHERE productInStoreId = '"+item.productInStoreId+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



