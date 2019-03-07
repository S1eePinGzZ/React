var fs = require('fs')
var express = require('express')
var multer = require('multer')
const path = require('path');

 var app = express();
 var upload = multer({dest:'upload/'});

//多文件上传 （限定上传文件个数）（没有修改后缀）
app.post('/upload-multi',upload.array('myfile',2),function(req,res,next){
    res.send("2 done");
})
//单文件上传获取信息
app.post('/upload-single',upload.single('myfile'),function(req,res,next){
    var file=req.file;
    // console.log("名称：%s",file.originalname);
    // console.log("mime：%s",file.mimetype);
//以下代码得到文件后缀
    name=file.originalname;
    nameArray=name.split('');
    var nameMime=[];
    l=nameArray.pop();
    nameMime.unshift(l);
    while(nameArray.length!=0&&l!='.'){
    l=nameArray.pop();
    nameMime.unshift(l);
    }
//Mime是文件的后缀
    Mime=nameMime.join('');
    console.log(Mime);
    console.log("名称：%s",file.originalname)
    res.send("done");
//重命名文件 加上文件后缀
    fs.renameSync('./upload/'+file.filename,'./upload/'+file.originalname);

})

//文件下载尝试（chrome会直接在页面上展示。.最后也没有解决）
//设置download文件夹为静态 才能下载
 app.use('/download', express.static(path.join(__dirname, 'download')));
// app.get('/download',function(req,res){
//     var path='./download/aa.mp3';
//     res.download(path,'aa.mp3');
// });
app.get('/download', function(req, res){
  var file = __dirname + '/download/aa.mp3';
  res.download(file);
});
app.get('/index.html',function(req,res,next){
    res.sendFile( __dirname + "/" + "index.html" );
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
