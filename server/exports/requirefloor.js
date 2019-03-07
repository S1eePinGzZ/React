var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'pageall_database',
});

function requirefloor (data,callback){
    console.log(data);
    var title = data.title;
    var x = data.page *10 - 10;
    var y = data.page *10;
    var findSql = 'SELECT * FROM ' + title +' order by floor limit ' + x + ',' + y ;
    console.log("x:y" + x + y );
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

exports.requirefloor = requirefloor;
