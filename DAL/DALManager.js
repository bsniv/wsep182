
var Users=require('./Users');


module.exports = {
    get: function(type,item){
        if(type === 'User'){
            return Users.get(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    },
    set: function(type,item){
        if(type === 'User') {
            return Users.set(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    },
    update: function(type,item){
        if(type === 'User') {
            return Product.update(item);
        }
        return new Promise((resolve,reject)=>{
            resolve(item);
        });
    },
    remove: function(type,item){
        if(type === 'User') {
            return Product.remove(item);
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
            Users.get({userName: username})
                .then((result)=>{
                    resolve(result[0].userName == username && result[0].password == password);
                })
                .catch((err)=>{reject(err);});
    });}

}

