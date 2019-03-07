var mysql  = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database: 'user_database',
});

function newpage (data,callback){
let findSql = 'SELECT * FROM `pagelist` where `title` = ' + "'" + data.title + "'" ;
console.log(findSql);
connection.query(findSql,function (err, result) {
          if(err){
                console.log('插入错误 - ',err.message);
              return;
          }
          else if (result.length >=1){
            console.log('title重复');
            callback('标题重复');
          }
          else
          {
            var insertData = [data.title,data.author,data.class,data.date,0,data.mainbody]
            var insertSql = 'INSERT INTO `pagelist` (title,author,class,date,reportnum,mainbody) values(?,?,?,?,?,?)';
            console.log('data：' + insertData);
            connection.query(insertSql,insertData,function (err, result) {
                      if(err){
                            console.log('插入错误 - ',err.message);
                          return;
                      }
                      else{
                        var selectSql = 'SELECT * FROM `pagelist` where `author` = ' +  "'" + data.author + "'";
                        connection.query(selectSql,function (err, result) {
                          if(err){
                                console.log('查找错误 - ',err.message);
                              return;
                          }
                          else{
                            var len = result.length;
                            var upsql = 'UPDATE `userlist` SET pagenum = ' + "'" + len + "'" + ' where name = '+ "'" + data.author +"'";
                            connection.query(upsql,function (err, result) {
                              if(err){
                                    console.log('更新错误 - ',err.message);
                                  return;
                              }
                              else{
                                console.log("新建成功");
                                callback('发表成功');
                                return;
                              }
                            })
                          }
                        })

                      }
                  })
          }
})
};

exports.newpage = newpage;
