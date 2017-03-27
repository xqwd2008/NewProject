cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        //先移动对象然后销毁对象
        console.log("Pos: " + this.node.getPosition().x + ", " + this.node.getPosition().y);
        this.node.runAction(cc.sequence(cc.moveBy(2, 200, 0), cc.callFunc(function () {
            console.log("Pos: " + this.node.x + ", " + this.node.y);
            this.node.destroy();
        }, this)));
    },
});
