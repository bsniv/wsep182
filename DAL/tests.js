var express = require('express');
var router = express.Router();
var DB = require('./Coupons');

// DB.update({"productId":2,"productName":"aviad2","basePrice":3}).then((result)=>{
//     console.log(result);
// });

// DB.remove({"productId":2}).then((result)=>{
//      console.log(result);
//  });
// DB.update({"productInStoreId":2,"productId":3,"storeId":1,"storePrice":140.5,"amount":41,"isActive":1}).then((result)=> {
//     console.log(result);
// });
DB.get({}).then((result)=> {
    console.log(result);
});
// DB.update({"couponId":"xxx","productInStoreId":1,"percentage":170,"dueDate":"120.4.2018"}).then((result)=> {
//     console.log(result);
// });
 // DB.remove({"productInStoreId":2,"typeOfSale":2,"amount":10000}).then((result)=> {
 //     console.log(result);
 // });
// DB.update({"productId":1,"productName":"lol","basePrice":100}).then((result)=> {
//     console.log(result);
// });
// DB.remove("hi").then((result)=>{
//     console.log(result);
// });