var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function requirepage (data,callback){
    console.log(data);
    var x = data.page *10 - 10;
    var y = data.page *10;
    console.log("x:y" + x + y );
    if(data.code == '*')
    {
      var findSql = 'SELECT * FROM `pagelist` order by id DESC limit ' + x + ',' + y ;
    }
    else{
      var findSql = 'SELECT * FROM `pagelist` where `class` = ' + "'" + data.code + "' order by id DESC" ;
    }
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

exports.requirepage = requirepage;
