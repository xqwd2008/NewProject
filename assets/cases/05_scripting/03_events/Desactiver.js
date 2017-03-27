cc.Class({
    extends: cc.Component,

    desactivate: function() {
        this.node.active = false;//把这个子节点的启用给否掉
    }
});
