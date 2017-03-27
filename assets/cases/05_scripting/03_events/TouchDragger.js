/*var TouchDragger = cc.Class({
    extends: cc.Component,

    properties: {
        propagate: {
            default: false
        },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            cc.log('Drag stated ...');
            this.opacity = 255;
        }, this.node);//执行对象是本节点
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
        

            if (this.getComponent(TouchDragger).propagate)//
                event.stopPropagation();
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 160;
        }, this.node);//执行对象是本节点
    },
});*/

var TouchDragger = cc.Class({
    extends: cc.Component,

    properties: {
        propagate: {
            default: false
        },
        // ...
    },
    
    onLoad: function () {
        this.node.opacity = 160;//设置节点透明度
        this.node.on(cc.Node.EventType.TOUCH_START, function () {//添加按下事件，方法是改变透明度
            cc.log('Drag stated ...');
            this.opacity = 255;
        }, this.node);//执行对象是本节点
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {//添加移动事件
        //方法是改变透明度，然后获取手指的触摸坐标，然后改变节点所在的X和Y坐标
            this.opacity = 255;
            var delta = event.touch.getDelta();//这里有没有.touch无所谓
            this.x += delta.x;
            this.y += delta.y;
            //任何子节点的事件都会逐层传递到祖辈节点
            //所以这个方法就阻止了节点向祖辈节点传递事件
            //这个判断条件在这个例子里面的意义不大，但是可以告诉你，事件的传递可以根据条件来空值是否停止
            if (this.getComponent(TouchDragger).propagate)
                event.stopPropagation();//这个才是停止传递事件的方法
        }, this.node);//执行对象是本节点
        this.node.on(cc.Node.EventType.TOUCH_END, function () {//添加松开事件，方法是改变透明度
            this.opacity = 160;
        }, this.node);//执行对象是本节点
    },
});