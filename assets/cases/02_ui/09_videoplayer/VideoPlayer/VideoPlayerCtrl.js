cc.Class({
    extends: cc.Component,

    properties: {
        videoPlayer: {
            default: null,
            type: cc.VideoPlayer
        },
        statusLabel: {
            default: null,
            type: cc.Label
        },
        currentTime: {
            default: null,
            type: cc.Label
        },
        totalTime: {
            default: null,
            type: cc.Label
        }
    },


    play: function() {
        this.videoPlayer.play();
    },

    pause: function() {
        this.videoPlayer.pause();
    },

    toggleFullscreen: function() {
        this.videoPlayer.isFullscreen = true;
    },

    stop: function() {
        this.videoPlayer.stop();
    },

    keepRatioSwitch: function() {
        this.videoPlayer.keepAspectRatio = !this.videoPlayer.keepAspectRatio; 
    },
    //当视频的状态发生变化时，会发送函数到这个方法中并执行
    onVideoPlayerEvent: function(sender, event) {
        this.statusLabel.string = event;//把这个文本的文字设置成事件
        if (event === cc.VideoPlayer.EventType.META_LOADED) {//如果事件是正在载入视频
            this.totalTime.string = this.videoPlayer.getDuration().toFixed(2);//那么将总时长更改成正在载入的视频时长，并四舍五入到十分位
        } else if (event === cc.VideoPlayer.EventType.CLICKED) {//视频被点击，则暂停或播放视频
            if(this.videoPlayer.isPlaying()) {
                this.videoPlayer.pause();
            } else {
                this.videoPlayer.play();
            }
        }
    },

    toggleVisibility: function() {
        this.videoPlayer.enabled = !this.videoPlayer.enabled;
    },

    playOnlineVideo: function() {
        this.videoPlayer.resourceType = 0;
        this.videoPlayer.url = "http://benchmark.cocos2d-x.org/cocosvideo.mp4";
        this.videoPlayer.play();
    },

    update: function () {
        this.currentTime.string = this.videoPlayer.currentTime.toFixed(2);//parseFloat(this.videoPlayer.currentTime.toFixed(2));
    }

});
