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
    
    _callback: null,//这个似乎没什么用

    // use this for initialization
    onLoad: function () {
        this.node.opacity = 100;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {//点
            this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {//松手
            this.node.opacity = 100;
            if (this._callback) {
                this._callback();
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {//手指在节点之外松手
            this.node.opacity = 100;
        }, this);
    },
});
