/**
 *
 */
var sqlite3 = require('sqlite3').verbose();

module.exports = {
    get: function (item) {
        return new Promise((resolve,reject)=>{
            var db = new sqlite3.Database('DataBase.db');
        var all=0;
        var queryString = "select * from Sales where";
        if(item.saleId!=null){
            queryString+=" saleId = "+item.saleId;
            all++;
        }
        if(item.productInStoreId!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" productInStoreId = "+item.productInStoreId;
            all++;
        }
        if(item.typeOfSale!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" typeOfSale = "+item.typeOfSale;
            all++;
        }
        if(item.amount!=null){
            if(all!=0){
                queryString+=" and";
            }
            queryString+=" amount = "+item.amount;
            all++;
        }
        if(all==0){
            queryString = "select * from Sales";
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
        getProductInStoreIdAndTypeOfSale(db,item.productInStoreId,item.typeOfSale).then((result)=>{
            if(result==0)
            {
                db.all("insert into Sales\n" +
                    "(productInStoreId, typeOfSale, amount)\n" +
                    "VALUES (" + item.productInStoreId + ",'" + item.typeOfSale + "'," + item.amount + ");",
                    function (err) {
                        if (err) {
                            reject("error");
                        }
                        else {
                            db.all("SELECT * FROM Sales ORDER BY saleId DESC LIMIT 1", function (err, rows) {
                                if (err) {
                                    reject("error");
                                }
                                else {
                                    resolve(rows);
                                }
                            })
                        }
                    });
            }
            else{
            var querySting="UPDATE Sales " +
                "SET amount = amount + "+ item.amount +
                " where productInStoreId = " + item.productInStoreId
                +" and typeOfSale = "+item.typeOfSale;
            db.all(querySting,function(err){
                if(err){
                    reject("error");
                }
                else{
                    db.all("SELECT * FROM Sales ORDER BY saleId DESC LIMIT 1", function (err, rows) {
                        if (err) {
                            reject("error");
                        }
                        else {
                            resolve(rows);
                        }
                    })
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
        var querySting="UPDATE Sales " +
            "SET amount = "+ item.amount +
            " where productInStoreId = " + item.productInStoreId
            +" and typeOfSale = "+ item.typeOfSale;
        db.all(querySting ,
            function (err) {
                if (err){
                    reject(querySting);
                }
                else{
                    db.all("select * from Sales where productInStoreId = "+item.productInStoreId+" and " +
                        "typeOfSale ="+item.typeOfSale,
                        function(err,rows){
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
        return new Promise((resolve,reject)=>{
            var db=new sqlite3.Database('DataBase.db');
        db.all("DELETE from Sales where productInStoreId = "+item.productInStoreId+" and " +
            "typeOfSale = "+item.typeOfSale, function(err){
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

var getProductInStoreIdAndTypeOfSale =function(db,productInStoreId,typeOfSale){
    return new Promise((resolve,reject)=>{

        db.all("SELECT * from Sales where productInStoreId = "+productInStoreId+" and typeOfSale = "+typeOfSale,function(err,rows){

        resolve(rows.length);
    });
});
}
