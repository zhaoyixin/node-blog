/**
 * 应用程序的启动（入口）文件
 */

//加载express模块
var express = require('express');

//加载模板处理模块
var swig = require('swig');

//创建APP应用  ==   nodejs中的Http.createServer();
var app = express();

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应的__dirname + '/public'文件
app.use('/public',express.static(__dirname + '/public'));

//配置应用模板
//定义当前应用所使用的模版引擎
//第一个参数：模版引擎的名称，同时也是模版文件的后缀
//第二个参数：表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);

//设置模板文件存放的目录
//第一个参数必须是views,第二个参数是目录
app.set('views','./views');

//注册所使用的模板引擎
//第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模版引擎的名称（第一个）是一致的
app.set('view engine','html');

//在开发过程中，需要取消模板缓存的设置
swig.setDefaults({cache:false});

/*
    首页
    req:request对象
    res:response对象
    next:函数
*/
app.get('/',function (req, res, next) {
    //res.send('<h1>欢迎光临我的blog</h1>');

    //读取views目录下的指定文件，解析并返回给客户端
    //第一个参数表示模板的文件，相对于views目录  views/index.html
    //第二个参数：传递给模板使用的数据
    res.render('index');
});

//监听HTTP请求
app.listen(8081);

/*
    路由绑定：
    通过app.get()或app.post()等方法可以把一个URL路径和一个或N个函数进行绑定
    app.get('/',function(req,res,next){})

    req:request对象-保存客户端请求相关的一些数据-http.request
    res:response对象-服务端输出对象，提供了I些服务器端输出相关的一些方法-http.response
    next:方法，用于执行下一个和路径匹配的函数

    内容输出：
    通过res.send(string)发送内容至客户端
 */

/*
    用户发送http请求——url——解析路由——找到匹配的规则——执行指定绑定函数，返回对应内容至用户

    /public——静态文件——直接读取指定的目录下的文件，返回给用户
    动态文件——处理业务逻辑，加载模板，解析模板，返回数据给用户
 */









