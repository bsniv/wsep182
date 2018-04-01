var express = require('express');
var router = express.Router();
var DB = require('./Product');

// DB.update({"productId":2,"productName":"aviad2","basePrice":3}).then((result)=>{
//     console.log(result);
// });

// DB.remove({"productId":2}).then((result)=>{
//      console.log(result);
//  });
// DB.update({"productInStoreId":2,"productId":3,"storeId":1,"storePrice":140.5,"amount":41,"isActive":1}).then((result)=> {
//     console.log(result);
// });
DB.set({"productName":"Spriteee","basePrice":120}).then((result)=> {
    console.log(result);
});