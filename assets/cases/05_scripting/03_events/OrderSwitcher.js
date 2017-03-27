cc.Class({
    extends: cc.Component,

    properties: {
        container: cc.Node
    },

    // use this for initialization
    switch: function () {
        var children = this.container.children;//先获取所有的子节点
        var length = children.length;//再获取这些子节点的列表
        if (length > 1) {//如果列表数量大于1
            var src = Math.floor( Math.random() * length );//那么就设置一个0-列表数量之间的随机数
            var node = children[src];//把第N个子节点赋值于node
            //列表数量减少1之后是否=随机数？如果是，就给dst赋值0，如果不是，就给dst赋值随机数+1
            var dst = src === length-1 ? 0 : src+1;
            node.setSiblingIndex(dst);//设置节点同级索引，就是把对应dst的children数组对象给置顶的意思
        }
    },
});
