const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        showWindow: cc.Node,
        loadAnimTestPrefab: cc.Prefab,
        loadTips: cc.Label,
        loadList: {
            default: [],
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // cur 加载目标
        this._curType = "";
        this._lastType = "";
        this._curRes = null;
        this._btnLabel = null;
        this._audioSource = null;
        this._isLoading = false;//用于判断是否加载
        //添加加载的地址，这是数组
        this._urls = {
            // Raw Asset
            Audio: "test assets/audio",
            Txt: "test assets/text",
            Texture: "test assets/PurpleMonster",
            Font: "test assets/font",
            // Raw Asset, use raw url
            Plist: cc.url.raw("resources/test assets/atom.plist"),
            // Asset
            SpriteFrame: "test assets/image",
            Prefab: "test assets/prefab",
            Animation: "test assets/sprite-anim",
            Scene: "test assets/scene",
            Spine: "spineboy/spineboy",
        };
        //执行_onRegisteredEvent()方法
        this._onRegisteredEvent();
    },
    //为所有按钮注册事件
    _onRegisteredEvent: function () {
        for (var i = 0; i < this.loadList.length; ++i) {
            this.loadList[i].on(cc.Node.EventType.TOUCH_END, this._onClick.bind(this));
        }//这个事件就是松开按钮，然后执行_onClick方法
    },

    _onClick: function (event) {
        if (this._isLoading) {//判断是否在加载
            return;//是则跳出
        }

        this._onClear();//执行_onClear()方法清空SHOW台
        //获取触发事件对象的名称，并用split('')方法以_分割字符串，然后取[1]第二个字符串作为名称
        this._curType = event.target.name.split('_')[1];
        //首先_lastType不能等于" ",其次_curType必须全等于_lastType,就是判断这个按钮是否已经加载过
        if (this._lastType !== "" && this._curType === this._lastType) {
            this._onShowResClick(event);//条件全为真则执行_onShowResClick(event)方法
            return;
        }
        //这个是为了改变按钮上的文字
        if (this._btnLabel) {//btnLabel是否为真或者有值
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.1") + this._lastType;
        }

        this._lastType = this._curType;//把_curType的值赋予_lastType
        
        //获取触发事件节点的子节点Label，并获取cc.Label类型的组件
        this._btnLabel = event.target.getChildByName("Label").getComponent("cc.Label");
        
        this.loadTips.textKey = this._curType + " Loading....";
        this._isLoading = true;//设置正在加载

        this._load();//执行方法
    },

    _load: function () {
        var url = this._urls[this._curType];//通过_curType索引到_urls的数组里的具体对象，然后赋值给url
        var loadCallBack = this._loadCallBack.bind(this);//执行_loadCallBack方法，执行对象绑定为使用它的对象
        switch (this._curType) {
            case 'SpriteFrame':
                // specify the type to load sub asset from texture's url
                cc.loader.loadRes(url, cc.SpriteFrame, loadCallBack);
                break;
            case 'Spine':
                // specify the type to avoid the duplicated name from spine atlas
                cc.loader.loadRes(url, sp.SkeletonData, loadCallBack);
                break;
            case 'Font':
                cc.loader.loadRes(url, cc.Font, loadCallBack);
                break;
            case 'Animation':
            case 'Prefab':
            case 'Scene':
            case 'Texture':
            case 'Txt':
            case 'Audio':
                cc.loader.loadRes(url, loadCallBack);
                break;
            default:
                cc.loader.load(url, loadCallBack);
                break;
        }
    },

    _loadCallBack: function (err, res) {
        this._isLoading = false;//首先表明不加载了
        if (err) {//首先这个是用来检测有没有填错的
            cc.log('Error url [' + err + ']');
            return;
        }
        this._curRes = res;
        if (this._curType === "Audio") {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.2");
        }
        else {
            this._btnLabel.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.3");
        }
        this._btnLabel.textKey += this._curType;
        this.loadTips.textKey = this._curType + " Loaded Successfully!";
    },
    //这个方法使为了清空SHOW台
    _onClear: function () {
        this.showWindow.removeAllChildren(true);
        //_audioSource不可以是空值或假，并且_audioSource必须是cc.AudioSource类型
        if (this._audioSource && this._audioSource instanceof cc.AudioSource) {//反正就是停止播放音频的条件
            this._audioSource.stop();//停止播放
        }
    },

    _onShowResClick: function (event) {
        if (this._curType === "Scene") {//加载场景的方法
            cc.director.runScene(this._curRes.scene);//运行场景
            cc.loader.releaseAsset(this._curRes);//删除子节点
            this._curRes = null;

            return;
        }
        this._createNode(this._curType, this._curRes);
    },

    _createNode: function (type, res) {
        this.loadTips.textKey = "";
        var node = new cc.Node("New " + type);
        node.setPosition(0, 0);
        var component = null;//重置组件
        switch (this._curType) {//各种组件创建的方法
            case "SpriteFrame":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = res;
                break;
            case "Texture":
                component = node.addComponent(cc.Sprite);
                component.spriteFrame = new cc.SpriteFrame(res);
                break;
            case "Audio":
                component = node.addComponent(cc.AudioSource);
                component.clip = res;
                component.play();
                this._audioSource = component;
                this.loadTips.textKey = i18n.t("cases/05_scripting/07_asset_loading/AssetLoading.js.4");
                break;
            case "Txt":
                component = node.addComponent(cc.Label);
                component.lineHeight = 40;
                component.string = res;
                break;
            case "Font":
                component = node.addComponent(cc.Label);
                component.font = res;
                component.lineHeight = 40;
                component.string = "This is BitmapFont!";
                break;
            case "Plist":
                component = node.addComponent(cc.ParticleSystem);
                component.file = this._urls.Plist;
                component.resetSystem();
                break;
            case "Prefab":
                var prefab = cc.instantiate(res);
                prefab.parent = node;
                prefab.setPosition(0, 0);
                break;
            case "Animation":
                var loadAnim = cc.instantiate(this.loadAnimTestPrefab);
                loadAnim.parent = node;
                loadAnim.setPosition(0, 0);
                var AanimCtrl = loadAnim.getComponent(cc.Animation);
                AanimCtrl.addClip(res);
                AanimCtrl.play(res.name);
                break;
            case "Spine":
                component = node.addComponent(sp.Skeleton);
                component.skeletonData = res;
                component.animation = "walk";
                node.y = -248;
                break;
        }
        this.showWindow.addChild(node);
    }
});
