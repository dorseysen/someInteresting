const 
    https = require('https'),
    express = require('express'),
    cheerio = require('cheerio'),
    fs = require('fs');

let router = express.Router();

router.get('/', function (req, res) {
    res.send('爬虫测试');
});


router.get('/getJobs', function (req, res) {

    let url = 'https://www.liepin.com/zhaopin/?isAnalysis=&dqs=&pubTime=&salary=&subIndustry=&industryType=&compscale=&key=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&init=-1&searchType=1&headckid=b41b3a1f788e456c&flushckid=1&compkind=&fromSearchBtn=2&sortFlag=15&ckid=b41b3a1f788e456c&degradeFlag=0&curPage=1&jobKind=&industries=&clean_condition=&siTag=D_7XS8J-xxxQY6y2bMqEWQ%7Eha394EQxjcUgWMmp6o3mbw&d_sfrom=search_prime&d_pageSize=40&d_headId=ad878683a46e56bca93e6f921e59a95&d_ckId=ad878683a46e56bca93e6f921e59a95c&d_curPage=1';
    
    https.get(url,function(response){
        var chunks = [];
        var size = 0;
        response.on('data',function(chunk){
            chunks.push(chunk);
            size += chunk.length;
        });
        response.on('end',function(){
            let data = Buffer.concat(chunks, size);
            let html = data.toString();
            
            let $ = cheerio.load(html);
            let result = [];

            $('.sojob-list').find('.job-info').each(i => {
                let map = {}
                //  个人基本信息
                map.name = $('.job-info').eq(i).find('h3').attr('title');

                let baseOthersInfo = $('.job-info').eq(i).find('.condition').attr('title');
                baseOthersInfo = baseOthersInfo.split("_");

                map.reward = baseOthersInfo[0];
                map.area = baseOthersInfo[1];
                map.experience = baseOthersInfo[2];

                //  公司信息
                let companyTagDom = $('.company-info').eq(i).find('.temptation').find('span');
                let companyTag = [];
                companyTagDom.each(i => {
                    companyTag.push(companyTagDom.eq(i).text());
                });
                let companyInfo = {
                    name: $('.company-info').eq(i).find('.company-name a').attr('title'),
                    href: $('.company-info').eq(i).find('.company-name a').attr('href'),
                    type: $('.company-info').eq(i).find('.industry-link a').text(),
                    tag: companyTag.join(',')
                }
                map.company = companyInfo;
                result.push(map);
                map = {};
            });
            console.log(result);

            fs.writeFile('./cache/jobs.txt', JSON.stringify(result), { 'flag': 'a' }, function(err) {
                if(err) throw err;
                console.log('写入成功');
            });
            
            res.json({  //返回json格式数据给浏览器端
                jobs: result
            });
        });  
    });
});

//导出该路由
module.exports = router;