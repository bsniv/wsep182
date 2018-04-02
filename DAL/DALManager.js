
var Users=require('./Users');
var Product=require('./Product');
var ProductInStore=require('./ProductInStore');
var StoreManager=require('./StoreManager');
var Sale=require('./Sale');
var StoreOwner=require('./StoreOwner');
var UserCart=require('./UserCart');
var Store=require('./Store');
var Coupons=require('./Coupons');


module.exports = {
    get: function(type,item){
        if(type === 'Product'){
            return Product.get(item);
        }
        if(type == 'ProductInStore') {
            return ProductInStore.get(item);
        }
        if(type == 'StoreManager'){
            return StoreManager.get(item);
        }
        if(type == 'Users'){
            return Users.get(item);
        }
        if(type == 'Sale'){
            return Sale.get(item);
        }
        if(type == 'StoreOwner'){
            return StoreOwner.get(item);
        }
        if(type == 'UserCart'){
            return UserCart.get(item);
        }
        if(type == 'Store'){
            return Store.get(item);
        }
        if(type == 'Coupons'){
            return Coupons.get(item);
        }

    },
    set: function(type,item){
        if(type === 'Product'){
            return Product.set(item);
        if(type === 'User') {
            return Users.set(item);
        }
        if(type == 'ProductInStore') {
            return ProductInStore.set(item);
        }
        if(type == 'StoreManager'){
            return StoreManager.set(item);
        }
        if(type == 'Users'){
            return Users.set(item);
        }
        if(type == 'Sale'){
            return Sale.set(item);
        }
        if(type == 'StoreOwner'){
            return StoreOwner.set(item);
        }
        if(type == 'UserCart'){
            return UserCart.set(item);
        }
        if(type == 'Store'){
            return Store.set(item);
        }
        if(type == 'Coupons'){
            return Coupons.set(item);
        }

    },
    update: function(type,item){
        if(type === 'Product'){
            return Product.update(item);
        }
        if(type == 'ProductInStore') {
            return ProductInStore.update(item);
        }
        if(type == 'StoreManager'){
            return StoreManager.update(item);
        }
        if(type == 'Users'){
            return Users.update(item);
        }
        if(type == 'Sale'){
            return Sale.update(item);
        }
        if(type == 'StoreOwner'){
            return StoreOwner.update(item);
        }
        if(type == 'UserCart'){
            return UserCart.update(item);
        }
        if(type == 'Store'){
            return Store.update(item);
        }
        if(type == 'Coupons'){
            return Coupons.update(item);
        }

    },
    remove: function(type,item){
        if(type === 'Product'){
            return Product.remove(item);
        }
        if(type == 'ProductInStore') {
            return ProductInStore.remove(item);
        }
        if(type == 'StoreManager'){
            return StoreManager.remove(item);
        }
        if(type == 'Users'){
            return Users.remove(item);
        }
        if(type == 'Sale'){
            return Sale.remove(item);
        }
        if(type == 'StoreOwner'){
            return StoreOwner.remove(item);
        }
        if(type == 'UserCart'){
            return UserCart.remove(item);
        }
        if(type == 'Store'){
            return Store.remove(item);
        }
        if(type == 'Coupons'){
            return Coupons.remove(item);
        }

    },
    authentication: function(username,password){
        if(username == 'admin' && password == 'admin')
            return new Promise((resolve,reject)=>{
                resolve(true);
            });
        return new Promise((resolve,reject)=>{
            Users.get({userName: username})
                .then((result)=>{
                    resolve(result[0].userName == username && result[0].password == password);
                })
                .catch((err)=>{reject(err);});
    });}

}

