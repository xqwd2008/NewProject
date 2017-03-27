const TipsManager = require('TipsManager');

cc.Class({
    extends: cc.Component,

    properties: {
        labelStatus: cc.Label,
        webview: cc.WebView,
        url: cc.EditBox
    },

    onWebFinishLoad: function (sender, event) {
        var loadStatus = "";
        if (event === cc.WebView.EventType.LOADED) {//加载网页时显示什么
            loadStatus = " is loaded!";
        } else if (event === cc.WebView.EventType.LOADING) {//加载网页中显示什么
            loadStatus = " is loading!";
        } else if (event === cc.WebView.EventType.ERROR) {//加载完成显示什么
            loadStatus = ' load error!';
        }
        this.labelStatus.string = this.url.string + loadStatus;//最后显示什么
    },

    visitURL: function () {
        this.webview.url = this.url.string;//更换网页链接
    }
});
