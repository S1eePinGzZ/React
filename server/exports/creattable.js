var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'userall_database',
});

function creattable(creatbody,msg,callback){
var creatname = creatbody.name;
console.log(creatname);
var  newSql = 'CREATE TABLE ' + creatname + '(title varchar(32) NOT NULL, author varchar(32) NOT NULL, floor int NOT NULL ,PRIMARY KEY (title))';
console.log(newSql);
connection.query(newSql,function (err, result) {
          if(err){
                console.log('创建错误 - ',err.message);
              return;
                }
                console.log('?????');
                var creatname = creatbody.name;
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password : '123456',
                  database: 'bereply_database',
                });

                var  newSql = 'CREATE TABLE ' + creatname + '(title varchar(32) NOT NULL,newreply int NOT NULL,replyer varchar(32) NOT NULL, author varchar(32) NOT NULL, floor int NOT NULL )';

                connection.query(newSql,function (err, result) {
                  if(err){
                          console.log('创建错误 - ',err.message);
                          return;
                        }
                        console.log('创建表格成功');
                        callback(msg);
                        return;
                })})
                //callback(result);

};
exports.creattable = creattable;
