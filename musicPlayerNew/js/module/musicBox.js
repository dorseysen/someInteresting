import MusicConfig from "./musicConfig.js";
import Lyric from "./lyric.js";

const MusicBox = {

    init () {
        this.index = 0;
        this.musicNumber = MusicConfig.url.length;
        // this.slideAble = false;

        this.variousListenerEvents();   //添加各类事件监听
        this.adjustProgress();  // 增加鼠标拖拽
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
    adjustProgress () {
        let _self = this;
        /*监听鼠标拖拽*/
        $(".barSlide").on("mousedown",function(e){
            e=e||window.event;
            _self.slideAble=true;
            var ex=e.pageX-$(".barSlide").get(0).offsetLeft;
            //每一次点击都存储一个滑块x初值，由于这里滑块得保持水平，所以不加一个Y，
            // 这里各位可以延伸写一个拖拽组件出来
            $(document).on({
                mousemove:function(e){
                    e=e||window.event;
                    if(_self.slideAble){
                        var l=e.pageX-ex; 
                        l > $(".barBg").width()-1 ? l = $(".barBg").width() - 1 : l; //判断拖拽条是否超界
                        l < 0 ? l = 0 : l;
                        $("#music audio").get(0).currentTime = (l / $(".barBg").width()) * $("#music audio").get(0).duration;
                        $(".barFg").css("width",l + "px");
                        $(".barSlide").css("left",l + "px");
                    }
                },
                mouseup:function(){
                    _self.slideAble=false;
                }
            });
        });
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
            _self.play(_self.index);
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
            min=_self.timeHandle(this.currentTime,"minute");
            sec=_self.timeHandle(this.currentTime,"second");
            /*歌曲播放总时长*/
            if(this.duration){
                
                minAll=_self.timeHandle(this.duration,"minute");
                secAll=_self.timeHandle(this.duration,"second");
            }
            /*播放进度条*/
            let allW=$(".barBg").outerWidth(),slideW;
            slideW=allW*this.currentTime/this.duration;
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