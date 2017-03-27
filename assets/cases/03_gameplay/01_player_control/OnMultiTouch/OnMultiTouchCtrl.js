const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        target: cc.Node
    },

    onLoad: function () {
        var self = this, parent = this.node.parent;
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {//为节点canvas添加一个事件，触摸移动
            var touches = event.getTouches();//获取触摸的点有多少个
            if (touches.length >= 2) {//如果获取触摸的点超过2个
                var touch1 = touches[0], touch2 = touches[1];
                var delta1 = touch1.getDelta(), delta2 = touch2.getDelta();//获取两个点距离上一次移动的距离
                var touchPoint1 = parent.convertToNodeSpaceAR(touch1.getLocation());//获取这个触点的位置
                var touchPoint2 = parent.convertToNodeSpaceAR(touch2.getLocation());//获取这个触点的位置
                //缩放
                var distance = cc.pSub(touchPoint1, touchPoint2);//返回两个触点的差
                var delta = cc.pSub(delta1, delta2);//返回移动距离向量的差
                var scale = 1;
                if (Math.abs(distance.x) > Math.abs(distance.y)) {
                    scale = (distance.x + delta.x) / distance.x * self.target.scale;
                }
                else {
                    scale = (distance.y + delta.y) / distance.y * self.target.scale;
                }
                self.target.scale = scale < 0.1 ? 0.1 : scale;
            }
        }, self.node);
    }
});
