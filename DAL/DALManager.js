
var Product=require('./Product');


module.exports = {

    get: function(type,item){
        if(type === 'Product'){
            return Product.get();
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });

    },
    set: function(type,item){
        if(type === 'Product') {
            return Product.set(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    },
    update: function(type,item){
        if(type === 'Product') {
            return Product.update(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    },
    remove: function(type,item){
        if(type === 'Product') {
            return Product.remove(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    }
}

