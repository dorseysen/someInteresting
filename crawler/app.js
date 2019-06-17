const 
    express = require('express'),
    fs = require('fs');

let app = express();

app.use('/index.html', function (req, res) {

    fs.readFile("./index.html", function(err,data){
        if(err)
            console.log("对不起，您所访问的路径出错");
        else{
            res.write(data);
        }
    });
});
//添加爬虫路由
app.use('/crawler', require('./routes/crawler'));

//页面404
app.use(function (req, res) {
    res.send('404 not found');
});

app.listen(10000);