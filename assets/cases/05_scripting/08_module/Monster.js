cc.Class({
    extends: cc.Component,

    properties: {
        nickname: {
            default: null,
            type: cc.Label
        },
        lv: {
            default: null,
            type: cc.Label
        },
        hp: {
            default: null,
            type: cc.Label
        },
        atk: {
            default: null,
            type: cc.Label
        },
        defense: {
            default: null,
            type: cc.Label
        },
        image: {
            default: null,
            type: cc.Sprite
        }
    },

    initInfo: function (info) {//这里的info就是LoadModuleCtrl里传递过来的参数,可以理解成var info = InitData.monsterInfo
        this.nickname.string = info.name;
        this.lv.string = info.lv;
        this.hp.string = info.hp;
        this.atk.string = info.atk;
        this.defense.string = info.defense;

        var image = this.image;
        cc.loader.loadRes(info.imageUrl, cc.SpriteFrame, function (error, spriteFrame) {
            if (!error) {
                image.spriteFrame = spriteFrame;
            }
        });

        //cc.loader.load(, function (error, res) {
        //    console.log(res);
        //}.bind(this));
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
