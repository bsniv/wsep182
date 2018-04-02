 var admins = require('./Admins');
 var raffleSale = require('./RaffleSales');
 var discount = require('./Discounts');
 var buyHistory = require('./BuyHistory');
 var user = require('./Users');
 var store = require('./Stores');
 var storeOwner = require('./StoreOwners');


/**
 * USERS SECTION
 */
//user.set({userName:"itamar",password:"abc",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//user.set({userName:"shay",password:"a1b2c3",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//user.get({userName:"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// user.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//user.update({userName:"itamar",password:"1234",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//user.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//user.remove({userName:"itamar",password:"1234",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));

/**
 * ADMINS SECTION
 */
// admins.set({"userName":"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// admins.set({"userName":"aviad"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// admins.set({"userName":"shay"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//admins.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// admins.get({userName:"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
 //admins.get({userName:"aviad"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//admins.remove({"userName":"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//admins.get({userName:"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//admins.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));

/**
 * RAFFLESALES SECTION
 */
//raffleSale.set({saleId:"123",offer:50,userName:"itamar",dueDate:"05-05-2015"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//raffleSale.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//raffleSale.update({saleId:"123",offer:1000,userName:"itamar",dueDate:"10-10-2005"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//raffleSale.remove({saleId:"123",offer:1000,userName:"itamar",dueDate:"10-10-2005"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));

/**
 * DISCOUNTS SECTION
 */
//discount.set({productInStoreId:1234,percentage:75,dueDate:"05-05-2002"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//discount.set({productInStoreId:1111,percentage:50,dueDate:"10-10-2010"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//discount.set({productInStoreId:2222,percentage:20,dueDate:"09-12-1990"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// discount.get({productInStoreId:1111}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// discount.get({percentage:20}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// discount.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//discount.update({productInStoreId:1234,percentage:200,dueDate:"17-03-1997"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//discount.remove({productInStoreId:1234,percentage:200,dueDate:"17-03-1997"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));


/**
 * BUY HISTORY
 */
//buyHistory.set({productId:11,storeId:111,userName:"itamar",price:1000,date:"13-07-2010",amount:5,typeOfSale:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//buyHistory.set({productId:22,storeId:222,userName:"bitton",price:3000,date:"25-03-2020",amount:13,typeOfSale:3}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//buyHistory.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
 /**
 * STORE SECTION
 */
//store.set({storeName:"tiv-taam",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//store.set({storeName:"superli",isActive:1}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//store.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// store.remove({storeId:4}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// store.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// store.update({storeId:3,storeName:"superli"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
/**
 * STORE OWNERS SECTION
 */
// storeOwner.set({storeId:11,userName:"itamar"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// storeOwner.set({storeId:22,userName:"bitton"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// storeOwner.set({storeId:33,userName:"jr"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
//storeOwner.get({storeId:11}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// storeOwner.get({userName:"bitton"}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// storeOwner.get({}).then((fromResolve)=>{console.log(fromResolve)}).catch((fromRejecet)=>console.log(fromRejecet));
// storeOwner.remove({storeId:11,userName:"itamar"}).catch((fromRejecet)=>console.log(fromRejecet));

 var check = "itamar";
 console.log(check.length);