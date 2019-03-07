var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'pageall_database',
});

function putreply (data,callback){
    console.log(data);
    let insertSql = 'SELECT * FROM ' + data.reply_title + ' where `floor` = ' + "'" + data.reply_floor + "'" ;
    connection.query(insertSql,function (err, result) {
          if(err){
                console.log('插入错误 - ',err.message);
              return;
          }
          else
          {
            if(data.isreply == 0)
            {
              var bereplymsg = null;
            }
            else{
              var bereplymsg = result[0].replymsg;
            }
            var insertData = [data.reply_author,data.date,data.isreply,data.reply_floor,bereplymsg,data.reply_msg]
            var insertSql = 'INSERT INTO `' + data.reply_title + '` (author,date,isreply,bereply,bereplymsg,replymsg) values(?,?,?,?,?,?)';
            console.log('data：' + insertData);
            connection.query(insertSql,insertData,function (err, result) {
                      if(err){
                            console.log('插入错误 - ',err.message);
                          return;
                      }
                      else if (data.isreply != 0)
                      {
                        var connection = mysql.createConnection({
                          host     : 'localhost',
                          user     : 'root',
                          password : '123456',
                          database: 'userall_database',
                        });
                        var findsql = 'SELECT * FROM `' + data.reply_author + '` where `title` = ' + "'" + data.reply_title + "'" ;
                        connection.query(findsql,function (err, result) {
                          if(err){
                                console.log('查询错误 - ',err.message);
                              return;
                          }
                          else if (result.length == 0){
                            var insertData = [data.reply_author,data.reply_title,data.reply_floor];
                            console.log(insertData);
                            var insertSql = 'INSERT INTO `' + data.reply_author + '` (author,title,floor) values(?,?,?)';
                            console.log('data：' + insertData);
                            connection.query(insertSql,insertData,function (err, result) {
                              if(err){
                                    console.log('插入错误 - ',err.message);
                                    return;
                                  }
                                  console.log("插入了新的数据库中");
                                  callback('回复成功');
                                  return ;
                                })
                              }
                              else{
                                callback('回复成功');
                                return ;
                              }

                          })
                        }
                      else{
                        console.log("回复成功");
                        callback('回复成功');
                        return ;
                      }
                  })
          }
})};

exports.putreply = putreply;
