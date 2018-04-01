
var Product=require('./Product');


module.exports = {

    get: function(type,item){
        if(type === 'Product'){
            return Product.get(item);
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
    }
}

