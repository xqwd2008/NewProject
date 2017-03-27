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

    // use this for initialization
    onLoad: function () {
        var touchEvent = this.getComponent('TouchEvent');
        
        //当touchEvent组件触发了_callback事件的时候，直接发送消息'CUSTOM_EVENT'
        //因为这个组件所在的节点并没有添加ActionCallback组件，所以这个节点不会变形
        //因为变形的执行，是在ActionCallback脚本里面
        touchEvent._callback = (function () {
            this.node.emit('CUSTOM_EVENT');//emit方法使直接传递函数而不会影响自身
        }).bind(this);
        //根据路径，把两个节点赋值于两个函数
        var addButton = cc.find('Canvas/add');
        var cancelButton = cc.find('Canvas/cancel');
        
        function onCustomEvent (event) {//变形的方法
            this.runAction(cc.sequence(
                cc.scaleTo(0.5, 2, 1),
                cc.scaleTo(0.25, 1, 1)
            ));
        }
        //发送一个事件，执行的方法，执行的对象,即命令这两货变形
        this.node.on('CUSTOM_EVENT', onCustomEvent, addButton);
        this.node.on('CUSTOM_EVENT', onCustomEvent, cancelButton);
    },
});
