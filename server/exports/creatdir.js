var fs = require("fs");
function creatdir(user,msg,callback){
  var username = user.name
  console.log(username);
  console.log("创建目录" + username);
  var dirname = '../src/user/' + username;        //新建路径字符串拼接
  console.log(dirname);
  fs.mkdir(dirname,function(err){         //使用./代表当前目录
     if (err) {
         return console.error(err);
     }
     var result = dirname + "目录创建成功。";

     stat = fs.stat;

     var copy = function( src, dst ){

       fs.readdir( src, function( err, paths ){
         if( err ){
              throw err;
            }

            paths.forEach(function( path ){
              var _src = src + '/' + path,
                  _dst = dst + '/' + path,
                  readable, writable;

                  stat( _src, function( err, st ){
                    if( err ){
                      throw err;
                    }

                    // 判断是否为文件
                    if( st.isFile() ){
                      // 创建读取流
                      readable = fs.createReadStream( _src );
                      // 创建写入流
                      writable = fs.createWriteStream( _dst );
                      // 通过管道来传输流
                      readable.pipe( writable );
                    }
                    // 如果是目录则递归调用自身
                    else if( st.isDirectory() ){
                      exists( _src, _dst, copy );
                    }
                  });
                });
              });
            };
            // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
            var exists = function( src, dst, callback ){
              fs.exists( dst, function( exists ){
                // 已存在
                if( exists ){
                  callback( src, dst );
                }
                // 不存在
                else{
                  fs.mkdir( dst, function(){
                    callback( src, dst );
                  });
                }
              });
            };

// 复制目录

  exists( '../src/img/headdeafual', '../src/user/' + username, copy );
  });
  callback(msg);
}

exports.creatdir = creatdir;
