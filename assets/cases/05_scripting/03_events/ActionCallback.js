cc.Class({
    extends: cc.Component,

    // use this for initialization
    onLoad: function () {
        var touchEvent = this.getComponent('TouchEvent');//获取组件
        var mouseEvent = this.getComponent('MouseEvent');//获取组件
        var event = touchEvent || mouseEvent;//只要这两个变量不都是假，那么event即为真
        event._callback = function () {//在真的情况下，赋值_callback方法
            this.node.runAction(cc.sequence(
                cc.scaleTo(0.5, 2, 1),
                cc.scaleTo(0.25, 1, 1)
            ));
        }
    },
});