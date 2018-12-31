

const Music = {

    // 获取歌词文本
    getLyric () {
        let _self = this;
        $.ajax({
            url : 'assets/xiaoyaotan.lrc',
            success : function (resp) {

                _self.lyricHandle (resp);   //  解析歌词文本
                _self.initLyricDisplay();   //  解析后显示歌词到页面
                _self.musicRate();          //  监听歌曲进度
            }
        });
    },
    //  歌词文本处理
    lyricHandle (resp) {

        let _self = this,
            lyric = resp.substr(/\d{2}\:\d{2}\.\d{2}\]/.exec(resp).index).split("[").map(item => item.split("]"));

        this.lyric = lyric.map(item => [_self.strToTime(item[0]), item[1]]);
        
    },

    //  歌词字符串转时间
    strToTime (str) {
        let timeArr = str.split(":");
        return parseFloat(timeArr[0]) * 60 + parseFloat(timeArr[1]);
    },

    //  初始化歌词显示
    initLyricDisplay () {
        $(".lyric").html(tmpl("lyricTmpl", this.lyric));
    },

    //  监听歌曲进度
    musicRate () {
        let _self = this;
        let start = 0;
        $('audio').on("timeupdate",function(){
            var scale=this.currentTime;
            
            for(var i = start; i < _self.lyric.length; i ++) {
                if(scale >= _self.lyric[i][0]) {
                    _self.lyricStyleChange(i);
                    start ++;
                    break;
                }
            }
        });
    },
    //  聚焦的歌词文本样式调整
    lyricStyleChange (i) {
        $(".lyric p").eq(i).addClass("active").siblings().removeClass("active");
        $(".lyric").css("top", 250 - $(".lyric p").eq(i).position().top + "px");
    }
}
Music.getLyric();
