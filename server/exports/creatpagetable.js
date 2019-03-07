var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'pageall_database',
});
function creattable(creatbody,msg,callback){
var creatname = creatbody.title;
console.log(creatname);
var  newSql = 'CREATE TABLE ' + creatname + '(author varchar(32) NOT NULL, date varchar(32) NOT NULL ,isreply INT NOT NULL , bereply INT NOT NULL,bereplymsg TEXT  NULL, replymsg TEXT NOT NULL)';
connection.query(newSql,function (err, result) {
          if(err){
                console.log('创建错误 - ',err.message);
              return;
                }
            else{
              var alterSql = 'ALTER TABLE ' + creatname + ' ADD `floor` INT NOT NULL auto_increment primary key AFTER `author`'
              connection.query(alterSql,function (err, result) {
                if(err){
                      console.log('更新错误 - ',err.message);
                      return;
                    }
                  else{
                    var insertData = [creatbody.author,creatbody.date,0,0,null,creatbody.text];
                    var insertSql = 'INSERT INTO `'+ creatbody.title  +'` (author,date,isreply,bereply,bereplymsg,replymsg) values(?,?,?,?,?,?)';
                    console.log(insertSql);
                    connection.query(insertSql,insertData,function (err, result) {
                              if(err){
                                    console.log('插入错误 - ',err.message);
                                  return;
                              }
                              else{
                                console.log("新建成功");
                                console.log('创建表格成功');
                                //callback(result);
                                callback(msg);
                                return ;
                              }
                  })
                  }
              })
          }
});
};
exports.creattable = creattable;
