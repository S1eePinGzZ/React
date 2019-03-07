var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'userall_database',
});

function requirereplypage (data,callback){
    console.log(data);
    var findSql = 'SELECT * FROM `' + data.master + '`';
    console.log(findSql);
    connection.query(findSql,function (err, result) {
          if(err){
                console.log('查询错误 - ',err.message);
              return;
          }
          else{
            console.log(result);
            callback(result);
            return ;
          }
})
};

exports.requirereplypage = requirereplypage;
