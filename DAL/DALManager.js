
var Product=require('./Product');


module.exports = {

    get: function(type,item){
        if(type === 'Product'){
            return Product.get(item);
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
    },
    authentication: function(username,password){
        if(username == 'admin' && password == 'admin')
            return new Promise((resolve,reject)=>{
                resolve(true);
            });
        return new Promise((resolve,reject)=>{
            get('User',username)
                .then((result)=>
                {
                    resolve(result.username == username && result.password == password);
                })
                .catch((err)=>{reject(err);});
    });}

}

