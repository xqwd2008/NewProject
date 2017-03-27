cc.Class({
    extends: cc.Component,

    properties: {
        root: {
            default: null,
            type: cc.Node
        },
        prefab: {//绑定预制资源
            default: null,
            type: cc.Prefab
        },
        canvas: {
            default: null,
            type: cc.Canvas
        },
        numberToSpawn: 0,//生成的数量
        spawnInterval: 0//生成的间隔
    },
    //整个脚本的作用就是每0.1秒生产一个对象，然后生产满20个之后停止
    addSpawn: function () {
        if (this.spawnCount >= this.numberToSpawn) {//判断已生产数量有没有大于或等于生产的数量
            this.clearRepeater();//虽然可以直接执行this.unschedule(this.addSpawn)，但是这么做是容易出问题的？
            return;
        }
        var monster = cc.instantiate(this.prefab);//复制一个预制资源，并且赋值monster函数
        //这个语句的作用是和this.canvas.node.addChild(monster)一样的，但是没有弄明白monster.parent = this.root的好处在哪
        monster.parent = this.root;
        //this.canvas.node.addChild(monster);
        monster.position = this.getRandomPosition();//为新生产的对象设置坐标
        this.spawnCount++;//计数自增
    },

    // use this for initialization
    onLoad: function () {//设置一些默认函数
        var self = this;
        self.randomRange = cc.p(300, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);//按照时间间隔调用addspawn中的函数
    },

    getRandomPosition: function() {//返回一个随机坐标
        return cc.p(cc.randomMinus1To1() * this.randomRange.x, cc.randomMinus1To1() * this.randomRange.y);
    },

    clearRepeater: function() {
        this.unschedule(this.addSpawn);//取消掉这个方法
    },
});
