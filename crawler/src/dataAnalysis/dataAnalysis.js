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
        this.eduMap = dataDictionary.eduMap;
        //  薪酬水平分析
        this.rewardMap = dataDictionary.reward;
        //  前端级别需求
        this.rank = dataDictionary.rank;
        //  公司标签分析
        this.companyTag = dataDictionary.companyTag;
    }
    //  地区分布分析
    areaAnalysis () {
        let area = this.data.map(item => item.area),
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
    eduAnalysis () {

        let edu = this.data.map(item => item.experience),
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
    rewardAnalysis () {

        let _self = this;
        let reward = this.data.map(item => {

            if(item.reward.indexOf('万') > -1) {
                let average = item.reward.replace('万','').split('-');
                return ( Number(average[0]) + Number(average[0]) ) / 2;
            }
            return item.reward;
        });
        let arr = [];
        for(let i in _self.rewardMap) {

            i !== '面议' && arr.push(i);
        }
        reward.forEach((item, index) => {

            if(typeof item === 'string' && item.indexOf('面议') > -1) _self.rewardMap['面议'] ++;
            else if (item >= 100){

                _self.rewardMap['100万及以上'] ++;
            }
            else{
                _self.rewardMap[arr[Math.floor(item / 10)]] ++;
            } 
        });

    }
    //  前端级别需求
    rankAnalysis () {
        let rank = this.data.map(item => item.name),
            _self = this;

        rank.forEach(item => {

            let flag = true;
            for(let i in _self.rank) {
                i !== '初中级' && item.indexOf(i) > -1 ? (_self.rank[i] ++, flag = false) : null;
            }
            flag && _self.rank['初中级'] ++;
        });
    }
    //  公司标签分析
    tagAnalysis () {
        let companyTag = this.data.map(item => item.company.tag),
            _self = this;

        companyTag.forEach(item => {

            for(let i in _self.companyTag) {
                item.indexOf(i) > -1 ? _self.companyTag[i] ++ : null;
            }
        });
    }
    all () {
        let _self = this;
        fetch('./cache/jobs.txt')
        .then(res => res.json())
        .then(data => {
            _self.data = data;
            //  地区分布分析
            this.areaAnalysis();
            //  学历要求分析    
            this.eduAnalysis();
            //  前端级别需求
            this.rankAnalysis();
            //  公司标签分析
            this.tagAnalysis();
            //  薪酬水平分析
            this.rewardAnalysis();
        });
    }
}