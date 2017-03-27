const i18n = require('i18n');

cc.Class({
    extends: cc.Component,
    
    properties: {
        time: {
            default: 5
        }
    },
    
    _callback: function () {
        this.node.runAction(this.seq);//执行跳跃动作
        if (this.repeat) {//重复是否真
            this.counting = true;
        }
        else {
            this.counting = false;
        }
        this.time = 5;//重置时间
        this.counter.string = this.time.toFixed(2) + ' s';//重置文本
    },

    // use this for initialization
    onLoad: function () {
        //一系列跳跃变形的动作
        var squashAction = cc.scaleTo(0.2, 1, 0.6);
        var stretchAction = cc.scaleTo(0.2, 1, 1.2);
        var scaleBackAction = cc.scaleTo(0.1, 1, 1);
        var moveUpAction = cc.moveBy(1, cc.p(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.p(0, -100)).easing(cc.easeCubicActionIn());
        //执行的动作顺序
        this.seq = cc.sequence(squashAction,
                               stretchAction,
                               moveUpAction,
                               scaleBackAction,
                               moveDownAction,
                               squashAction,
                               scaleBackAction);
        //设置事件文本的内容
        this.counter = cc.find('Canvas/count_label').getComponent(cc.Label);
        this.counter.string = this.time.toFixed(2) + ' s';
        this.counting = false;//用以判断是否计数
        this.repeat = false;//用以判断是否重复
    },

    // called every frame
    update: function (dt) {
        if (this.counting) {//先判断有没有开始计数
            this.time -= dt;//有则设置时间按照帧数开始递减
            this.counter.string = this.time.toFixed(2) + ' s';//并且设置文本内容
        }
    },
    
    stopCounting: function () {
        this.unschedule(this._callback);//取消执行
        this.counting = false;//取消计数
        this.counter.string = i18n.t("cases/05_scripting/04_scheduler/scheduleCallbacks.js.1");//设置文本
        this.time = 5;//设置时间
    },
    
    repeatSchedule: function () {
        this.stopCounting();//先重置一下时间与计数判断
        this.schedule(this._callback, 5);//重复触发this._callback，间隔5秒
        this.repeat = true;//重复为真，计时为真
        this.counting = true;
    },
    
    oneSchedule: function () {
        this.stopCounting();//先重置一下时间与计数判断
        this.scheduleOnce(this._callback, 5);//5秒后触发一次
        this.repeat = false;//重复为假，计时为真
        this.counting = true;
    },
    
    cancelSchedules: function () {
        this.repeat = false;//重复为假
        this.stopCounting();//重置时间与计数判断
    }
});
