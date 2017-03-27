
var info = cc.Class({//创建一个类，这个类叫info，它的属性是cc.Node，名称是target，数量是num
    name: 'info',
    properties: {
        target: cc.Node,
        num: 0
    }
});
//5 3 10 12
cc.Class({
    extends: cc.Component,

    properties: {
        itemTemp: {// 对预制资源的引用
            default: null,
            type: cc.Prefab
        },
        targetAry: {// 对节点的引用，采用了数组的方式，类型是info数组
            default: [],
            type: [info]
        }
    },

    onLoad: function () {
        this._curTime = 0;
        this._curIndex = 0;
    },
    //用以创建项目
    _createItem: function (parentNode, idx) {
        var item = cc.instantiate(this.itemTemp);//复制一个预制资源
        var label = item.getComponentInChildren(cc.Label);//获取自身的第一个Label类型组件
        label.string = idx;//设置label的字符串为idx
        item.parent = parentNode;//为复制的预制资源定义一个父节点
    },
    //用以判断什么时候创建项目，创建了多少个项目，什么时候停止创建
    update: function (dt) {
        this._curTime += dt;//判断过了多少帧
        if (this._curTime >= 1) {//如果帧数时间大于或等于1秒
            this._curTime = 0;//重置计时器
            for (var i = 0; i < this.targetAry.length; ++i) {
                var num = this.targetAry[i].num;
                var target = this.targetAry[i].target;
                if (target && this._curIndex < num) {
                    this._createItem(target, this._curIndex);
                }
            }
            this._curIndex++;//更新项目的计量
        }
    }

});
