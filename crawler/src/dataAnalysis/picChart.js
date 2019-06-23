

import { Relation } from './dataDictionary.js';

export class PicChart {

    constructor (data, DOM, keyWord) {

        this.data = data;
        this.DOM = DOM;
        this.keyWord = keyWord;

        this.value = [];
        this.sum = 0;
        this.init();
    }
    init () {
        this.dataChange();
        this.createOption();
        this.createEchartPic();
    }
    dataChange () {
        this.sum = 0;
        for(var i in this.data) {
            this.value.push({
                name: i,
                value: this.data[i]
            });
            this.sum += this.data[i]
        }
    }
    createOption () {

        this.option = {

            title:{
                text: Relation[this.keyWord],
                subtext: '数据样本: ' + this.sum,
                x: 'center',
                y: 30
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y: 'center',
                data: this.value.map(item => item.name)
            },
            color: ['#1790cf','#1bb2d8','#99d2dd','#88b0bb','#1c7099','#038cc4','#75abd0','#afd6dd'],
            series: [
                {
                    name: Relation[this.keyWord],
                    type:'pie',
                    radius: ['30%', '50%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eff',
                            borderColor: '#1bb2d8',
                            borderWidth: 1,
                            padding: 5,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#000',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#1bb2d8',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#000',
                                    backgroundColor: '#eff',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: this.value
                }
            ]
        }
    }
    createEchartPic () {
        
        let myChart = echarts.init(document.querySelector(this.DOM));
        myChart.setOption(this.option);
    }
}
