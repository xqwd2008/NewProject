cc.Class({
    extends: cc.Component,

    properties: {
        itemTemplate: { // 创建项目模板来实例化其他项目
            default: null,
            type: cc.Node
        },
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        spawnCount: 0, //我们实际产生了多少项目
        totalCount: 0, //整个列表需要多少项目
        spacing: 0, //每个项目之间的空格
        bufferZone: 0, //当item远离bufferZone时，我们重定位它
        lblScrollEvent: cc.Label,
        btnAddItem: cc.Button,
        btnRemoveItem: cc.Button,
        btnJumpToPosition: cc.Button,
        lblJumpPosition: cc.Label,
        lblTotalItems: cc.Label,
    },

    // use this for initialization
    onLoad: function () {
    	this.content = this.scrollView.content;//指示content函数为滚动内容节点的高度
        this.items = []; // 数组来存储产生的项目
    	this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // 使用此变量来检测我们是向上还是向下滚动
    },

    initialize: function () {
        //设置高度为 项目数量*（项目高度+项目之间的空格）+项目之间的空格
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // 获取总内容高度
    	for (let i = 0; i < this.spawnCount; ++i) { //使用for语句循环生产项目，初始赋值i=0，i小于实际项目数量，让i先自增再赋值
    		let item = cc.instantiate(this.itemTemplate);//复制一个项目
    		this.content.addChild(item);//并将项目添加到节点
    		//设置项目的所在坐标为，X轴为0：Y轴为 - 项目高度 * (0.5+i) - 项目之间的空格 * （i+1）
    		item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
    		//获取item的脚本item，并且执行updateItem方法
    		item.getComponent('Item').updateItem(i, i);
            this.items.push(item);//把新建的项目添加到数组items之中
    	}
    },

    getPositionInView: function (item) { // 在scrollview的节点空间中获取项目位置
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // 我们不需要做每一帧的数学
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // 滚动方向
        let offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // 如果远离缓冲区并且没有达到内容的顶部
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset );
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID - items.length; // 更新项目ID
                    item.updateItem(i, itemId);
                }
            } else {
                // 如果远离缓冲区而没有达到内容的底部
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset );
                    let item = items[i].getComponent('Item');
                    let itemId = item.itemID + items.length;
                    item.updateItem(i, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
        this.lblTotalItems.textKey = "Total Items: " + this.totalCount;
    },

    scrollEvent: function(sender, event) {
        switch(event) {
            case 0: 
               this.lblScrollEvent.string = "Scroll to Top"; 
               break;
            case 1: 
               this.lblScrollEvent.string = "Scroll to Bottom"; 
               break;
            case 2: 
               this.lblScrollEvent.string = "Scroll to Left"; 
               break;
            case 3: 
               this.lblScrollEvent.string = "Scroll to Right"; 
               break;
            case 4: 
               this.lblScrollEvent.string = "Scrolling"; 
               break;
            case 5: 
               this.lblScrollEvent.string = "Bounce Top"; 
               break;
            case 6: 
               this.lblScrollEvent.string = "Bounce bottom"; 
               break;
            case 7: 
               this.lblScrollEvent.string = "Bounce left"; 
               break;
            case 8: 
               this.lblScrollEvent.string = "Bounce right"; 
               break;
            case 9: 
               this.lblScrollEvent.string = "Auto scroll ended"; 
               break;
        }
    },

    addItem: function() {
        this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount + 1;
    },

    removeItem: function() {
        if (this.totalCount - 1 < 30) {
            cc.error("can't remove item less than 30!");
            return;
        }

        this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        this.totalCount = this.totalCount - 1;
    },

    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.p(0, 500), 2);
    }
});
