cc.Class({
    extends: cc.Component,


    // use this for initialization
    onLoad: function () {
        var animation = this.getComponent(cc.Animation);//先创建一个空的动画组件
        
        cc.loader.loadRes("test assets/atlas", cc.SpriteAtlas, (err, atlas) => {//然后通过路径和类型加载资源到项目中
            var spriteFrames = atlas.getSpriteFrames();//获取图集
            
            var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 10);//然后剪辑动画
            clip.name = 'run';//为这个动画命名
            clip.wrapMode = cc.WrapMode.Loop;//为这个设定播放方式

            animation.addClip(clip);//为空的动画组件添加新的动画剪辑
            animation.play('run');//播放指定名字的动画
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
