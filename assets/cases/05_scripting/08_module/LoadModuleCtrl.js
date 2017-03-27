cc.Class({
    extends: cc.Component,

    properties: {
        monsterTemp: {
            default: null,
            type: cc.Prefab
        },
        btn_createMonster: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.btn_createMonster.on(cc.Node.EventType.TOUCH_END, this.createMoster.bind(this));//给按钮添加点击事件，并且执行方法
    },

    createMoster: function () {
        var monster = cc.instantiate(this.monsterTemp);//复制预制的资源，然后赋值与monster
        var Monster = require("Monster");//命令必须是Monster脚本
        var monsterComp = monster.getComponent(Monster);//获取预制资源中的Monster脚本组件
        var InitData = require("InitData");//要求是InitData脚本，并赋值与InitData变量
        monsterComp.initInfo(InitData.monsterInfo);//执行Monster脚本中的initInfo()方法，传递的参数来自InitData中的数组monsterInfo
        monster.parent = this.node;//预置资源直接在节点中生成子节点
        monster.setPosition(cc.p(0, 0));//并设置坐标
        this.btn_createMonster.active = false;//隐藏掉按钮
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
