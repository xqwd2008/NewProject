const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        touchLocationDisplay: {
            default: null,
            type: cc.Label
        },
        follower: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        self.moveToPos = cc.p(0, 0);//先设置一个坐标点
        self.isMoving = false;//然后设置是否移动的函数
        //以下是为了确定玩家手指或鼠标所在位置，而决定主角是否移动和是否停止
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {//然后添加一个触摸开始事件的监控，并且调用函数
            var touches = event.getTouches();//获取触摸点的数量
            var touchLoc = touches[0].getLocation();//然后获取第一个触摸点的坐标点
            self.isMoving = true;//是否移动为真
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);//改变坐标点为触点的坐标点
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {//添加一个触摸移动事件的监控，并且调用函数
            var touches = event.getTouches();//获取触摸点的数量
            var touchLoc = touches[0].getLocation();//然后获取第一个触摸点的坐标点
            self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);//改变坐标点为触点的坐标点
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {//然后添加一个触摸结束事件的监控，并且调用函数
            self.isMoving = false; //是否移动为假
        }, self.node);
    },

    //用每帧更新的方法使主角进行移动
    update: function (dt) {
        if (!this.isMoving) return;//如果移动不为真则跳出方法（即停止继续执行）
        var oldPos = this.follower.position;//声明oldPos即玩家所在坐标
        //获取两个坐标之间的差，并且使其归一化，然后赋值于direction，作为移动方向的标准
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        //然后以direction的值为基准，然后以followSpeed的值进行缩放，再加上主角所在坐标，得出玩家新的坐标点
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        //把玩家的坐标更新到新的坐标中
        this.follower.setPosition(newPos);
    }
});
