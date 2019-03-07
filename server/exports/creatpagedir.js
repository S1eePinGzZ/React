var fs = require("fs");
function creatpagedir(user,msg,callback){
  var username = user.title
  console.log(username);
  console.log("创建目录" + username);
  var dirname = '../src/page/' + username;        //新建路径字符串拼接
  console.log(dirname);
  fs.mkdir(dirname,function(err){         //使用./代表当前目录
     if (err) {
         return console.error(err);
     }
     callback(msg);
   })
 }

   exports.creatpagedir = creatpagedir;
