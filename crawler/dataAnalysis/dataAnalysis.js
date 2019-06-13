import { dataDictionary } from './dataDictionary.js'

export class DataAnalysis {

    constructor () {
        this.init();
        this.all();
    }
    init () {
        //  地区枚举初始化
        this.areaMap = dataDictionary.areaMap;
        //  学历要求分析
        this.eduMap = dataDictionary.education;
        //  薪酬水平分析
        this.rewardMap = dataDictionary.reward;

    }
    //  地区分布分析
    areaAnalysis (data) {
        let area = data.map(item => item.area),
            _self = this;
        
        area.forEach(item => {

            let flag = true;
            for(let i in _self.areaMap) {
                item.indexOf(i) > -1 ? (_self.areaMap[i] ++, flag = false) : null;
            }
            flag && _self.areaMap['其他'] ++;
        });
    }
    //  学历要求分析
    eduAnalysis (data) {

        let edu = data.map(item => item.experience),
            _self = this;
        
        edu.forEach(item => {
            let flag = true;
            for(let i in _self.eduMap) {
                if(item.indexOf(i) > -1) {
                    _self.eduMap[i] ++;
                    flag = false;
                    break;
                }
            }
            flag && _self.eduMap['其他'] ++;
        });
    }
    //  薪酬水平分析
    rewardAnalysis (data) {

        let reward = data.map(item => item.reward), 
            _self = this;

        reward.forEach(item => {

            
        })

    }
    all () {

        fetch('./cache/jobs.txt')
        .then(res => res.json())
        .then(data => {
            //  地区分布分析
            this.areaAnalysis(data);
            //  学历要求分析
            this.eduAnalysis(data);
        });
    }
}