cc.Class({
    extends: cc.Component,

    properties: {

        speed: 0.1,

        horizontal: {
            default: null,
            type: cc.Sprite
        },

        vertical: {
            default: null,
            type: cc.Sprite
        },

        radial_round: {
            default: null,
            type: cc.Sprite
        },

        radial_semicircle: {
            default: null,
            type: cc.Sprite
        }
    },

    update: function (dt) {//每帧更新的方法
        //每帧更新并填充
        this._updataFillStart(this.horizontal, dt);//执行_updataFillStart方法，执行对象是horizontal，每帧
        this._updataFillStart(this.vertical, dt);//执行_updataFillStart方法，执行对象是vertical，每帧
        // 每帧更新填充的范围
        this._updateFillRange(this.radial_round, 1, dt); //执行_updateFillRange方法执行对象是radial_round,整圆，每帧
        this._updateFillRange(this.radial_semicircle, 0.5, dt); //执行_updateFillRange方法执行对象是radial_semicircle,半圆，每帧
    },
    //填充开始
    _updataFillStart: function (sprite, dt) {
        var fillStart = sprite.fillStart;//将当前填充率赋值于fillStart函数
        //填充的百分比是否大于0，如果是，则通过公式改变填充百分比，如果不是，则直接将填充百分比变成100%
        fillStart = fillStart > 0 ?  fillStart -= (dt * this.speed):1;
        
        sprite.fillStart = fillStart;//然后将结果百分比赋值于sprite.fillStart方法，改变填充率
    },
    //填充结束
    _updateFillRange: function (sprite, range, dt) {
        var fillRange = sprite.fillRange;
        fillRange = fillRange < range ? fillRange += (dt * this.speed) : 0;
        sprite.fillRange = fillRange;
    }

});
