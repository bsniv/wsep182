
var Product=require('./Product');


module.exports = {

    get: function(type){
        if(type === 'Product'){
            return Product.get();
        }

    },
    set: function(type,item){
        if(type === 'Product') {
            return Product.set(item);
        }
    },
    update: function(type,item){
        if(type === 'Product') {
            return Product.update(item);
        }
    },
    remove: function(type,item){
        if(type === 'Product') {
            return Product.remove(item);
        }
    },
    authentication: function(username, password){
            if (username == 'admin' && password == 'admin')
                return true;
            DB.get('User',username)
                .then((result)=>{
                return (result['Password']==password);
        }).catch((error)=>{
                console.log("Fatal Error In authentication");
        });
    }
}




