var DB = require('../DAL/DALManager');
var sqlite3 = require('sqlite3').verbose();
var createTables = function() {
    var db = new sqlite3.Database('DataBase.db');
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS Users "+
            "( userName varchar(15) PRIMARY KEY, password varchar(15),isActive Integer DEFAULT 1, isSuperUser Integer DEFAULT 0)");
        db.run("INSERT OR IGNORE INTO Users (userName,password, isActive, isSuperUser) VALUES ('admin','123456',1,1)");
        db.run("CREATE TABLE IF NOT EXISTS Store "+
            "( storeId Integer PRIMARY KEY AUTOINCREMENT, storeName varchar(15) unique,isActive Integer DEFAULT 1)");
        db.run("CREATE TABLE IF NOT EXISTS Product "+
            "( productId Integer PRIMARY KEY AUTOINCREMENT, ProductName varchar(10) unique, basePrice Integer)");
        db.run("CREATE TABLE IF NOT EXISTS ProductInStore "+
            "( productInStoreId Integer PRIMARY KEY AUTOINCREMENT, productId Integer,storeId Integer ,storePrice Real, amount Integer,isActive Integer, " +
            "FOREIGN KEY(productId) REFERENCES Product(productId) ON UPDATE CASCADE ," +
            "FOREIGN KEY(storeId) REFERENCES Store(storeId) ON UPDATE CASCADE )" );
        db.run("CREATE TABLE IF NOT EXISTS Sales "+
            " ( saleId Integer PRIMARY KEY AUTOINCREMENT, productInStoreId Integer, kind Integer," +
            " FOREIGN KEY(productInStoreId) REFERENCES ProductInStore(productInStoreId) ON UPDATE CASCADE )");


        db.run("CREATE TABLE IF NOT EXISTS Session "+
            " ( userName varchar(15), cookies varchar PRIMARY KEY," +
            " FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE  )");

        db.run("CREATE TABLE IF NOT EXISTS UserCart "+
            " ( cookies varchar, productInStoreId Integer," +
            " FOREIGN KEY(productInStoreId) REFERENCES ProductInStore(productInStoreId) ON UPDATE CASCADE,"+
            " FOREIGN KEY(cookies) REFERENCES ProductInStore(cookies) ON UPDATE CASCADE, " +
            "CONSTRAINT PKuserCart PRIMARY KEY (cookies, productInStoreId))");


        db.run("CREATE TABLE IF NOT EXISTS StoreOwners "+
            "(storeId Integer, userName varchar(15), " +
            "FOREIGN KEY(storeId) REFERENCES Store(storeId) ON UPDATE CASCADE," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKstoreOwner PRIMARY KEY (userName, storeId))");


        db.run("CREATE TABLE IF NOT EXISTS BuyHistory "+
            "( buyId Integer PRIMARY KEY AUTOINCREMENT, productId Integer ,storeId Integer,date varchar(30) NOT NULL," +
            " productGrade Integer, storeGrade Integer, comment varchar," +
            "FOREIGN KEY(productId) REFERENCES Product(productId) ON UPDATE CASCADE," +
            "FOREIGN KEY(storeId) REFERENCES Store(storeId) ON UPDATE CASCADE)" );

        db.run("CREATE TABLE IF NOT EXISTS Discount "+
            "(productInStore Integer, amountInPrecent Integer, " +
            "FOREIGN KEY(productInStore) REFERENCES ProductInStore(productInStore) ON UPDATE CASCADE," +
            "CONSTRAINT PKdiscount PRIMARY KEY (productInStore, amountInPrecent))");

        db.run("CREATE TABLE IF NOT EXISTS StroreManager "+
            "(storeId Integer, userName varchar(15),addProduct Integer, removeProduct Integer," +
            "editProduct Integer, addDiscount Integer, removeDiscount Integer, editDiscount Integer, " +
            "FOREIGN KEY(storeId) REFERENCES Store(storeId) ON UPDATE CASCADE," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKstroreManager PRIMARY KEY (userName, storeId))");

    });
    db.close();
}
createTables();