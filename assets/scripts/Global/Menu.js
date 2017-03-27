const i18n = require('i18n');
const SceneList = require('SceneList');

var emptyFunc = function (event) {
    event.stopPropagation();
};

cc.Class({
    extends: cc.Component,

    properties: {
        text: {
            default: null,
            type: cc.Label
        },
        readme: {
            default: null,
            type: cc.Node
        },
        mask: {
            default: null,
            type: cc.Node
        },
        btnInfo: {
            default: null,
            type: cc.Button
        },
        btnBack: {
            default: null,
            type: cc.Button
        }
    },
    //加载运行
    onLoad: function () {
        this.showDebugDraw = false;//赋予showDebugDraw函数布尔值为假,该函数用以显示调式时的绘图
        cc.game.addPersistRootNode(this.node);//声明当前节点常驻根节点，该节点不会被在场景切换中销毁
        this.currentSceneUrl = 'TestList.fire';//声明了函数currentSceneUrl代表当前节点所在场景的文件名
        this.contentPos = null;//声明contentPos为空值
        this.isMenu = true;//赋予isMenu函数布尔值为真,该函数的作用是作为菜单是否运行的判断条件
        this.loadInstruction(this.currentSceneUrl);//根据currentSceneUrl场景执行loadInstruction方法
        this.node.zIndex = 999;//指示当前节点的Z轴深度为999
    },
    //启动时运行
    onEnable: function () {
        // 对于这个组件，应该在调用onEnable之后开始新的场景
        //声明sceneListNode函数为通过find方法根据路径'Canvas/testList/viewport/list'查找到的节点
        //较与之前的捕捉星星游戏例子中的调用同一父节点下其它子节点的组件，这个函数的用法则是调用了其它场景下的组件
        var sceneListNode = cc.find('Canvas/testList/viewport/list');
        if (sceneListNode) {//如果处于sceneListNode这个节点
            //指示sceneList函数即通过getComponent方法获取sceneListNode节点中的'SceneList'组件
            this.sceneList = sceneListNode.getComponent('SceneList');//'SceneList'组件是一个脚本
            this.sceneList.init(this);//将这个组件初始化并且重新执行
        }
        else {
            // 在其他场景中，this.sceneList应该被销毁
            this.sceneList = null;// 于是sceneList函数被清空了
        }
    },
    //返回目录方法
    backToList: function () {
        //执行showReadme方法，清空其事件，并且让其激活状态为假（请对应showReadme方法中的参数进行分析）
        this.showReadme(null, false);
        this.currentSceneUrl = 'TestList.fire';//声明了函数currentSceneUrl代表当前节点所在场景的文件名
        this.isMenu = true;//赋予isMenu函数布尔值为真
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },
    //加载场景的方法
    loadScene: function (url) {
        //通过find方法查找路径路径获取节点，然后通过getComponent方法获取该节点中的ScrollView类型组件，
        //再通过getContentPosition方法获取它的坐标
        this.contentPos = cc.find('Canvas/testList').getComponent(cc.ScrollView).getContentPosition();
        this.currentSceneUrl = url;
        this.isMenu = false;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },
    //加载场景结束
    onLoadSceneFinish: function () {
        let url = this.currentSceneUrl;
        this.loadInstruction(url);
        if (this.isMenu && this.contentPos) {
            cc.find('Canvas/testList').getComponent(cc.ScrollView).setContentPosition(this.contentPos);
        }
    },
    //加载指令
    loadInstruction: function (url) {
        let self = this;
        let urlArr = url.split('/');
        let fileName = urlArr[urlArr.length - 1].replace('.fire', '');
        cc.loader.loadRes('readme/' + fileName, function(err, txt) {
            if (err) {
                self.text.string = i18n.t("scripts/Global/Menu.js.1");
                return;
            }
            self.text.string = txt;
        });
    },
    //展示说明
    showReadme: function (event, active) {
        if (active === undefined) {//如果active未定义
            this.readme.active = !this.readme.active;//则为this.readme.active取反值
        }
        else {
            this.readme.active = active;//否则为this.readme.active赋值active(对应方法上的active)
        }
        if (this.readme.active) {
            this.mask.on('touchstart', emptyFunc, this);
        } else {
            this.mask.off('touchstart', emptyFunc, this);
        }
        let labelTxt = this.readme.active ? '关闭说明' : '查看说明';
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).textKey = labelTxt;

        // en: fix Collider DebugDraw always displayed on top of the problem.
        // zh：解决 Collider DebugDraw 一直显示在最上层的问题。
        var enabledDebugDraw = cc.director.getCollisionManager().enabledDebugDraw;
        if (this.readme.active) {
            this.showDebugDraw = enabledDebugDraw;
            cc.director.getCollisionManager().enabledDebugDraw = false;
        }
        else {
            cc.director.getCollisionManager().enabledDebugDraw = this.showDebugDraw;
        }
        // en: fix Video Player always displayed on top of the problem.
        // zh：修复 Video Player 一直显示在最上层的问题。
        var videoPlayer = cc.find('Canvas/VideoPlayer');
        if (videoPlayer) {
            videoPlayer.active = !this.readme.active;
        }
    }
});
