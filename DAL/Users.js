var sqlite3 = require('sqlite3').verbose();


var getUsers = function(db,item){
    return new Promise((resolve,reject)=>{
    var all=0;
    var queryString = "select * from Users where";
    if(item.userName!=null){
        queryString+=" userName is '"+item.userName+"'";
        all++;
    }
    if(item.password!=null){
        if(all!=0){
            queryString+=" and";
        }
        queryString+=" password = "+item.password;
        all++;
    }
    if(item.isActive!=null){
        if(all!=0){
            queryString+=" and";
        }
        queryString+=" isActive = "+item.isActive;
        all++;
    }
    if(all==0){
        queryString = "select * from Users";
    }

    db.all(queryString,function (err,rows){
        if(err){

            resolve(queryString);
        }
        else{
            resolve(rows);
        }
    });
});
}


module.exports = {
    get: function (item) {
         return new Promise((resolve,reject)=>{
             var db = new sqlite3.Database('DataBase.db');
             getUsers(db,item)
                 .then((rows)=>{
            var returnValue = [];
            var i = 0;
            var j=0;
            rows.forEach((user)=>{
                var query = "SELECT * FROM Admins WHERE userName is '"+user.userName+"'";
                db.all(query,function(err,ans){
                    if(err){
                        console.log("error");
                    }
                    else{
                        if(ans.length === 0){
                            returnValue.push({"userName":user.userName,password:user.password,isActive:user.isActive,isAdmin:0});
                        }
                        else{
                            returnValue.push({userName:user.userName,password:user.password,isActive:user.isActive,isAdmin:1});
                        }
                    }
                    j++;
                    if(j==rows.length)
                        resolve(returnValue);
                });
            });

            // if(returnValue!=undefined)
            //     resolve(returnValue);
            // else
            //     reject("error!");
        db.close();
        });
        });
    },
    /**
     *
     */
    set: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');

            db.all("INSERT into Users " +
                "values ('"+item.userName+"','"+ item.password +"','" + item.isActive + "');",
                function (err) {
                    if (err){
                        reject("error");
                    }
                    else{
                        db.all("select * from Users where userName = '"+item.userName+"' and " +
                            "password = '"+item.password+"' and isActive = '"+item.isActive+"'",function(err,rows){
                            if(err){
                                reject("error2");
                            }
                            else{
                                resolve(rows[0]);
                            }
                        })
                    }
                });
        db.close();
    });
    },
    /**
     *
     */
    update: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.all("UPDATE Users "
            +"SET password = '"+item.password+"'  \n"
            +"WHERE userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject(err);
                }
                else{
                    db.all("select * from Users where userName = '"+item.userName+"' and " +
                        "password = '"+item.password+"' and isActive = '"+item.isActive+"'",function(err,rows){
                        if(err){
                            reject("error");
                        }
                        else{
                            resolve(rows[0]);
                        }
                    })
                }
            });
        db.close();
    });
    },
    /**
     *
     */
    remove: function(item){
        return new Promise((resolve,reject)=> {
            var db = new sqlite3.Database('DataBase.db');
        db.all("UPDATE Users \n"
            +"SET isActive = 0 \n"
            +"WHERE userName = '"+item.userName+"'",
            function (err) {
                if (err){
                    reject("error");
                }
            });
        db.close();
    });
    }
};



