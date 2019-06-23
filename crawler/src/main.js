

import 'babel-polyfill' //兼容IE11

import { DataAnalysis } from './dataAnalysis/dataAnalysis.js';
import { PicChart } from './dataAnalysis/picChart.js';

let data = new DataAnalysis();

console.log(data);

setTimeout(function () {
    
    new PicChart(JSON.parse(JSON.stringify(data.areaMap)), '.area', 'areaMap');
    new PicChart(JSON.parse(JSON.stringify(data.eduMap)), '.edu', 'eduMap');
    new PicChart(JSON.parse(JSON.stringify(data.rewardMap)), '.reward', 'rewardMap');
    new PicChart(JSON.parse(JSON.stringify(data.rank)), '.rank', 'rank');
    new PicChart(JSON.parse(JSON.stringify(data.companyTag)), '.companyTag', 'companyTag');
    
}, 1000);