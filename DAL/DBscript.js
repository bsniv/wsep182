        var DB = require('../DAL/DALManager');
        var sqlite3 = require('sqlite3').verbose();
        var createTables = function() {
        var db = new sqlite3.Database('../bin/DataBase.db');
        db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS Users "+
            "( userName varchar(15) PRIMARY KEY, password varchar(15),isActive Integer DEFAULT 1)");
        // db.run("INSERT OR IGNORE INTO Users (userName,password, isActive, isSuperUser) VALUES ('admin','123456',1,1)");
        db.run("CREATE TABLE IF NOT EXISTS Admins "+
            "( userName varchar(15) ," +
            " FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKuserName PRIMARY KEY (userName) )");
        db.run("CREATE TABLE IF NOT EXISTS Stores "+
            "( storeId Integer PRIMARY KEY AUTOINCREMENT , storeName varchar(15) unique,isActive Integer DEFAULT 1)");
        db.run("CREATE TABLE IF NOT EXISTS Products "+
            "( productId Integer PRIMARY KEY AUTOINCREMENT , productName varchar(20) unique, basePrice Real)");
        db.run("CREATE TABLE IF NOT EXISTS ProductsInStores "+
            "( productInStoreId Integer PRIMARY KEY AUTOINCREMENT , productId Integer, storeId Integer, " +
            "price Real, amount Integer,isActive Integer, " +
            "FOREIGN KEY(productId) REFERENCES Products(productId) ON UPDATE CASCADE ," +
            "FOREIGN KEY(storeId) REFERENCES Stores(storeId) ON UPDATE CASCADE )" );
        db.run("CREATE TABLE IF NOT EXISTS Sales "+
            " ( saleId Integer PRIMARY KEY AUTOINCREMENT , productInStoreId Integer, typeOfSale Integer, amount Integer, " +
            " FOREIGN KEY(productInStoreId) REFERENCES ProductsInStores(productInStoreId) ON UPDATE CASCADE )");

        db.run("CREATE TABLE IF NOT EXISTS RaffleSales "+
            " ( saleId Integer , offer Real, userName varchar(15), dueDate varchar(30) NOT NULL, " +
            " FOREIGN KEY(saleId) REFERENCES Sales(saleId) ON UPDATE CASCADE ," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKraffleSales PRIMARY KEY (userName, saleId))");

        db.run("CREATE TABLE IF NOT EXISTS UserCarts "+
            " ( session varchar, saleId Integer, amount Integer, " +
            " FOREIGN KEY(saleId) REFERENCES Sales(saleId) ON UPDATE CASCADE,"+
            "CONSTRAINT PKuserCart PRIMARY KEY (session, saleId))");

        db.run("CREATE TABLE IF NOT EXISTS StoreOwners "+
            "(storeId Integer, userName varchar(15), " +
            "FOREIGN KEY(storeId) REFERENCES Stores(storeId) ON UPDATE CASCADE," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKstoreOwner PRIMARY KEY (userName, storeId))");

        db.run("CREATE TABLE IF NOT EXISTS BuyHistory "+
            "( buyId Integer PRIMARY KEY AUTOINCREMENT , productId Integer ,storeId Integer,date varchar(30) NOT NULL," +
            " userName varchar(15), price Integer, amount Integer, typeOfSale Integer," +
            "FOREIGN KEY(productId) REFERENCES Products(productId) ON UPDATE CASCADE," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE," +
            "FOREIGN KEY(storeId) REFERENCES Stores(storeId) ON UPDATE CASCADE)" );

        db.run("CREATE TABLE IF NOT EXISTS StoreManagers "+
            "(storeId Integer, userName varchar(15),privilege Integer DEFAULT 0 , " +
            "FOREIGN KEY(storeId) REFERENCES Stores(storeId) ON UPDATE CASCADE," +
            "FOREIGN KEY(userName) REFERENCES Users(userName) ON UPDATE CASCADE, " +
            "CONSTRAINT PKstoreManagers PRIMARY KEY (userName, storeId))");

        db.run("CREATE TABLE IF NOT EXISTS Discounts "+
            "(productInStoreId Integer, percentage Real, dueDate varchar(30) NOT NULL, " +
            "FOREIGN KEY(productInStoreId) REFERENCES ProductsInStores(productInStoreId) ON UPDATE CASCADE," +
            "CONSTRAINT PKdiscount PRIMARY KEY (productInStoreId, percentage))");

        db.run("CREATE TABLE IF NOT EXISTS Coupons "+
            " ( couponId varchar PRIMARY KEY  , productInStoreId Integer, percentage Real, dueDate varchar(30) NOT NULL, " +
            "FOREIGN KEY(productInStoreId) REFERENCES ProductsInStores(productInStoreId) ON UPDATE CASCADE)");

        });
        db.close();
        }
        createTables();