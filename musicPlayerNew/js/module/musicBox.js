import MusicConfig from "./musicConfig.js";
import Lyric from "./lyric.js";

const MusicBox = {

    init () {
        this.index = 0;
        this.musicNumber = MusicConfig.url.length;
        this.variousListenerEvents();
    },
    next () {
        this.index ++;
        this.index %= this.musicNumber;
        this.play(this.index);
    },

    pre () {
        this.index --;
        this.index <= 0 ? this.index = this.musicNumber : null;
        this.play(this.index);
    },
    
    play (index) {

        $(".playBtn").addClass("hide");
        $(".pauseBtn").removeClass("hide");
        
        if(index !== undefined) {
            this.index = Number(index);
            Lyric.getLyric (MusicConfig.url[this.index].lyricUrl);
            $("#music audio").attr("src", MusicConfig.url[this.index].musicUrl);
        }
        $(".time").children('span').eq(0).html(MusicConfig.url[this.index].musicName);
        setTimeout(function () {
            $("#music audio").get(0).play();
        },1000);
        
    },

    pause () {
        $(".pauseBtn").addClass("hide");
        $(".playBtn").removeClass("hide");
        $("#music audio").get(0).pause();
    },

    timeHandle (times, flag) {
        var time;
        flag==="minute"?time=parseInt(times/60)%60:(flag==="second"?time=parseInt(times%60):(flag==="hour"?time=parseInt(times/3600)%24:null));
        time<10?time="0"+time:time;
        return time;
    },


    variousListenerEvents () {

        let _self = this;
        //导航
        $(".playerNav").on("click", "li", function () {
            $(this).addClass("active-list").siblings().removeClass("active-list");
            $(".playerDetail").children("div").eq($(this).index()).removeClass("hide").siblings().addClass("hide");
        });

        //按钮组点击
        $(".btnGroup").on("click",".playBtn", function () {
            _self.play();
        });
        $(".btnGroup").on("click",".pauseBtn", function () {
            _self.pause();
        });
        $(".btnGroup").on("click",".nextBtn", function () {
            _self.next();
        });
        $(".btnGroup").on("click",".preBtn", function () {
            _self.pre();
        });


        //音乐列表点击
        $(".musicList").on("click","p", function () {
            _self.play($(this).attr("musicIndex"));
            $(this).addClass("active-list").siblings().removeClass("active-list");
        });

        $("#music audio").on("timeupdate",function(){
            let min,sec,minAll="00",secAll="00";
            /*歌曲当前播放进度*/
            min=_self.timeHandle(this.currentTime,"minute");//调用dorseyHf的时间处理函数，算是比较简单的封装吧
            sec=_self.timeHandle(this.currentTime,"second");
            /*歌曲播放总时长*/
            if(this.duration){
                //为什么用if呢？你可以去掉试试，因为当我们切换上下首时，duration监听不到，是一个undefined,会使计算的结果变成NaN，
                // 这样我们的界面也会看到这个NaN（计算的结果非数字值），这样就不好了
                minAll=_self.timeHandle(this.duration,"minute");
                secAll=_self.timeHandle(this.duration,"second");
            }
            /*播放进度条*/
            let allW=$(".barBg").outerWidth(),slideW;
            slideW=allW*this.currentTime/this.duration;//当前播放进度时间除以总歌曲持续时间
            $(".barFg").css("width",slideW+"px");
            $(".barSlide").css("left",slideW+"px");
            $(".time").children('span').eq(1).html(min+":"+sec+"/"+minAll+":"+secAll);
            //播放完毕自动播放下一首
            if(this.currentTime>=this.duration-1){
                
                _self.next();
            }
        });
    }
    


}

export default MusicBox;