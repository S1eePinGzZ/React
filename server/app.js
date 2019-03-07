var http = require("http");
var express = require("express");
var app = express();
var crypto=require('crypto');
var svgCaptcha = require('svg-captcha');
var salt="acdef";
var mysql  = require('mysql');
var session=require("express-session");
var Changecard = require('./exports/changecard');
var Creattable = require('./exports/creattable');
var Creatdir = require('./exports/creatdir');
var Register = require('./exports/register');
var Login = require('./exports/login');
var Newpage = require('./exports/newpage');
var Creatpagetable = require('./exports/creatpagetable');
var Creatpagedir = require('./exports/creatpagedir');
var Requirepage = require('./exports/requirepage');
var Requirefloor = require('./exports/requirefloor');
var Putreply = require('./exports/putreply');
var Requiremaster = require('./exports/requiremaster');
var Requirereplypage = require('./exports/requirereplypage')
var Requiremasterpage = require('./exports/requiremasterpage')
var cookieParser = require('cookie-parser');         //查找用户主页用户信息
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
const path = require('path');

var upload = multer({dest:'../src/user/S1eePinG/'});         //查找用户主页用户信息

const cors = require('cors');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
      origin: 'http://127.0.0.1:3000',
　　credentials: true
}));




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//设置跨域server


app.use(session({
    name:'loginname',
    secret: 'loginandregister',
    cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized:true, //
}));

// app.use(cookieParser());
app.post('/login',function(req,res){
	console.log('bodyParser:' + req.body);
  Login.login(req.body,function(msg){
    res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})
app.post('/register',function(req,res){
	console.log(req.cookies.username)
  Register.register(req.body,function(msg){
    if(msg == '注册成功')
    {
      Creattable.creattable(req.body,msg,function(msg){
          Creatdir.creatdir(req.body,msg,function(msg){
            res.send(JSON.stringify(msg));
          })
      })
    }
    else{
      res.send(JSON.stringify(msg));
    }
  })
    // res.status(200).send(captcha.data);
})

app.post('/newpage',function(req,res){
	console.log('bodyParser:' + req.body);
  Newpage.newpage(req.body,function(msg){
    if(msg == '发表成功')
    {
      Creatpagetable.creattable(req.body,msg,function(msg){
          Creatpagedir.creatpagedir(req.body,msg,function(msg){
            res.send(JSON.stringify(msg));
          })
      })
    }
    else{
      res.send(JSON.stringify(msg));
    }
  })
})

app.post('/requirepage',function(req,res){
	console.log('bodyParser:' + req.body);
  Requirepage.requirepage(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/requirefloor',function(req,res){
	console.log('bodyParser:' + req.body);
  Requirefloor.requirefloor(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/putreply',function(req,res){
	console.log(req.body);
  Putreply.putreply(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/requirebereplypage',function(req,res){
	console.log(req.body);
  Requirebereplypage.requirebereplypage(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/requirereplypage',function(req,res){
	console.log(req.body);
  Requirereplypage.requirereplypage(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/requiremasterpage',function(req,res){
	console.log(req.body);
  Requiremasterpage.requiremasterpage(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/requiremaster',function(req,res){
	console.log(req.body);
  Requiremaster.requiremaster(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

app.post('/changecard',function(req,res){
	console.log(req.body);
  console.log('cook:'+  req.cookies.name);
  Changecard.changecard(req.body,function(msg){
    res.send(JSON.stringify(msg));
  })
    // res.status(200).send(captcha.data);
})

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
    fs.renameSync('./upload/'+file.filename,'./upload/'+'head.jpg');

})


app.listen(8089,function(){
  console.log('port:8089');
});
