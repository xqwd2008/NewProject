const MyCustomComponent = require('MyCustomComponent');

cc.Class({
    extends: cc.Component,

    properties: {
        myNode: {
            default: null,
            type: cc.Node
        },
        mySprite: {
            default: null,
            type: cc.Sprite
        },
        myLabel: {
            default: null,
            type: cc.Label
        },
        myComponent: {
            default: null,
            type: MyCustomComponent
        },
        mySpriteFrame: {
            default: null,
            type: cc.SpriteFrame
        },
        myAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },
        myPrefab: {
            default: null,
            type: cc.Prefab
        },
        myAudioClip: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.myLabel.string = this.myComponent.getPower().toString();//这个例子是把节点转化为脚本，并且可以直接调用？
    },

    // called every frame
    update: function (dt) {

    },
});
