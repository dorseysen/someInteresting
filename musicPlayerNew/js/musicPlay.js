import Lyric from "./module/lyric.js";
import MusicConfig from "./module/musicConfig.js";
import MusicBox from "./module/musicBox.js";


const Music = {

    init () {
        this.initPlayerHeight();
        MusicBox.init();
    },
    initPlayerHeight () {
        let height = document.documentElement.clientHeight || window.innerHeight;
        $(".musicPlayer").css("height", (height * 0.98) + "px");
    }
}
export default Music;