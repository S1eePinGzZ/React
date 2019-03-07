var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function changecard (data,callback){
    console.log(data);
    var findSql = 'UPDATE `userlist` SET sign = ' + "'" +data.text + "'" + ' where name = '+ "'" + data.id +"'";
    console.log(findSql);
    connection.query(findSql,function (err, result) {
          if(err){
                console.log('更新错误 - ',err.message);
              return;
          }
            callback('修改成功');
            return ;
})
};

exports.changecard = changecard;
