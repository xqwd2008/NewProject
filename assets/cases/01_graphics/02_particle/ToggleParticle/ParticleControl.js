cc.Class({
    extends: cc.Component,

    properties: {
        particle: cc.Node,
    },
    //切换粒子播放的方法
    toggleParticlePlay: function() {
        var myParticle = this.particle.getComponent(cc.ParticleSystem);//获取该组件中的粒子系统
        if (myParticle.particleCount > 0) { //获取播放粒子的数量，顺带判断这个数量是否大于0
            myParticle.stopSystem(); // 停止播放
        } else {
            myParticle.resetSystem(); // 重新启动粒子系统
        }
    }
});
