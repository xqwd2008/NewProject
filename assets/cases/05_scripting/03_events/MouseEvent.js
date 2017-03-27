cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },
    
    move: function (event) {//设置节点的位置就是鼠标移动的位置
        this.node.x += event.getDeltaX();
        this.node.y += event.getDeltaY();
    },

    // use this for initialization
    onLoad: function () {
        this.scroll = 0;//声明一个滚动用的函数，赋值0
        this.node.opacity = 50;//设置节点透明度是50
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {//添加鼠标按下的事件
            this.node.opacity = 255;//透明度255
            //触发了按下之后就添加鼠标移动事件，并且执行move方法
            this.node.on(cc.Node.EventType.MOUSE_MOVE, this.move, this);
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {//添加鼠标移入的事件
            this.node.opacity = 160;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {//添加鼠标移出的事件
            this.node.opacity = 50;
            this.node.off(cc.Node.EventType.MOUSE_MOVE, this.move, this);//触发移出后，移除移动的事件
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function () {//添加鼠标松手的事件
            this.node.opacity = 50;
            this.node.off(cc.Node.EventType.MOUSE_MOVE, this.move, this);//触发移出后，移除移动的事件
            if (this._callback) {
                this._callback();//执行方法
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (event) {//添加鼠标滚动事件
            this.scroll += event.getScrollY();//获取鼠标的Y轴滚动距离
            var h = this.node.height;//获取节点高度
            this.scroll = cc.clampf(this.scroll, -2 * h, 0.7 * h);//设置scroll的浮点值
            this.node.scale = 1 - this.scroll/h;//设置节点的缩放
        }, this);
    },
});
