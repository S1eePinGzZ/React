var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function requiremasterpage (data,callback){
    console.log(data);
    var findSql = 'SELECT * FROM `pagelist` where `author` = ' + "'" + data.master + "'";
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

exports.requiremasterpage = requiremasterpage;
