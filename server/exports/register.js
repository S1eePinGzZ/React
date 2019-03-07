var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function register (data,callback){
let findSql = 'SELECT * FROM `userlist` where `admin` = ' + "'" + data.admin + "'" ;
console.log(findSql);
connection.query(findSql,function (err, result) {
          if(err){
                console.log('插入错误 - ',err.message);
              return;
          }
          else if (result.length >=1){
            console.log('admin重复');
            callback('登录账号重复');
          }
          else{
            let findSql_2 = 'SELECT * FROM `userlist` where `name` = ' +  "'" + data.name + "'";
            connection.query(findSql_2,function (err, result) {
                      if(err){
                            console.log('插入错误 - ',err.message);
                          return;
                      }
                      else if(result.length >=1){
                        console.log("name重复");
                        callback('用户名重复');
                      }
                      else{
                        
                        var insertData = [data.name,data.admin,data.pass,data.date,'他什么都没写',0]
                        var insertSql = 'INSERT INTO `userlist` (name,admin,passworld,date,sign,pagenum) values(?,?,?,?,?,?)';
                        console.log('data：' + insertData);
                        connection.query(insertSql,insertData,function (err, result) {
                                  if(err){
                                        console.log('插入错误 - ',err.message);
                                      return;
                                  }
                                  else{
                                    console.log("注册成功");
                                    callback('注册成功');
                                    return ;
                                  }
                        });
                      }
            });
          }
});
};

exports.register = register;
