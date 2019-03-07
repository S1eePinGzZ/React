var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function requiremaster (data,callback){
    console.log(data);
    var findSql = 'SELECT * FROM `userlist` where name = '+ "'" + data.id +"'";
    console.log(findSql);
    connection.query(findSql,function (err, result) {
          if(err){
                console.log('查询错误 - ',err.message);
              return;
          }
          else{
            console.log(result);
            var data = {
              name : result[0].name,
              pagenum : result[0].pagenum,
              sign: result[0].sign,
              register_date : result[0].date
            }
            callback(data);
            return ;
          }
})
};

exports.requiremaster = requiremaster;
