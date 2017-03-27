cc.Class({
    extends: cc.Component,

    properties: {
        jumper: {
            default: null,
            type: cc.Node
        },
        colorNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.squashAction = cc.scaleTo(0.2, 1, 0.6);//0.2秒变形
        this.stretchAction = cc.scaleTo(0.2, 1, 1.2);//0.2秒变形
        this.scaleBackAction = cc.scaleTo(0.1, 1, 1);//0.1秒变形
        this.moveUpAction = cc.moveBy(1, cc.p(0, 200)).easing(cc.easeCubicActionOut());//用缓动的方式移动200高度
        this.moveDownAction = cc.moveBy(1, cc.p(0, -200)).easing(cc.easeCubicActionIn());//用缓动的方式降落200高度
        //按顺序执行系列动作
        var seq = cc.sequence(this.squashAction, this.stretchAction, 
            this.moveUpAction, this.scaleBackAction, this.moveDownAction, this.squashAction, this.scaleBackAction);
        this.jumper.runAction(seq);
        //按顺序执行系列动作
        this.colorNode.runAction(cc.sequence(
            cc.tintTo(2, 255, 0, 0),//变色
            cc.delayTime(0.5),//延时
            cc.fadeOut(1),//渐隐
            cc.delayTime(0.5),//延时
            cc.fadeIn(1),//渐显
            cc.delayTime(0.5),//延时
            cc.tintTo(2, 255, 255, 255)//变色
        ).repeat(2));//重复两次
    },
});
