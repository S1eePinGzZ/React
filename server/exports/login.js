var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function login (msg,callback){
let findSql = 'SELECT * FROM `userlist` where `admin` = ' + "'" + msg.user + "'" ;
console.log(msg);
connection.query(findSql,function (err, result) {
          if(err){
              console.log('查询错误 - ',err.message);
              return;
          }
          else if (result.length == 1){
            if(result[0].passworld == msg.pass)
            {
              let data = {
                username: result[0].name,
                sign: result[0].sign,
                register_date: result[0].date,
                pagenum: result[0].pagenum,
                infotext : '登录成功'
              }
              console.log(data);
              callback(data);
              return ;
            }
            else{
              console.log('密码错误');
              let data = {
                username: '',
                sign: '',
                register_date: '',
                pagenum: null,
                infotext : '密码错误'
              }

              callback(data);
              return ;
            }

          }
          else{
            console.log('密码错误');
            let data = {
              username: '',
              sign: '',
              register_date: '',
              pagenum: null,
              infotext : '密码错误'
            }

            callback(data);
          }
});
};

exports.login = login;
