var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    //就是为了达到随机图片的效果
    onLoad: function () {
        //调用了Helpers脚本中的getRandomInt方法，并传递参数0, spriteList的列表数,并赋值于randomIdx
        //根据返回的随机数公式是，取随机数0-5之间的实数,不会取值到5，然后把结果向下取整为整数
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);//获取精灵组件然后赋值sprite
        sprite.spriteFrame = this.spriteList[randomIdx];//然后改变sprite的图片资源
    }

});
