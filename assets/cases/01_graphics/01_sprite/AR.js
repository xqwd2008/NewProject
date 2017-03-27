cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        
        posAR: cc.Label,//声明这个类是文本
        pos: cc.Label,//声明这个类是文本
        goldAR: cc.Node,//声明这个类是节点
        gold: cc.Node//声明这个类是节点
    },

    //加载方法
    onLoad: function () {
        //使用parent方法获取goldAR节点的父节点，并将该值赋予sheep函数
        var sheep = this.goldAR.parent;
        //使用convertToWorldSpaceAR方法获取节点sheep的X与Y的坐标值
        var posAR = sheep.convertToWorldSpaceAR(cc.v2(this.goldAR.x, this.goldAR.y));
        //然后将这个节点的文本显示改成(X坐标,Y坐标)
        this.posAR.string = '(' + parseInt(posAR.x) + ', ' + parseInt(posAR.y) + ')';
        //因为括号(),逗号,等符号不可以单独作为字符串用以显示，所以必须要用单引号进行转义
        
        sheep = this.goldAR.parent;
        var pos = sheep.convertToWorldSpace(cc.v2(this.gold.x, this.gold.y));
        this.pos.string = '(' + parseInt(pos.x) + ', ' + parseInt(pos.y) + ')';
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
