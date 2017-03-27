cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: {//声明itemPrefab即预制资源是空值与类型
            default: null,
            type: cc.Prefab
        },
        initItemCount: 0,//初始项目数量
        scrollView: cc.ScrollView,
        bufferZone: 0, //当项目离开缓冲区时，我们重新定位它
    },
    //创建项目
    createItem: function (x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        // item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
    },

    init (menu) {
        this.menu = menu;
        this.sceneList = [];//声明一个空的数组
        this.itemList = [];//声明一个空的数组
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // 使用此变量来检测我们是向上还是向下滚动
        this.initList();//执行初始化
    },

    // 使用此进行初始化，这是用来获取例子合集中的所有场景
    initList () {
        var scenes = cc.game._sceneInfos;//返回所有场景的路径，并且赋值于scenes函数
        var dict = {};//声明一个空的对象,这个部分的作用就是，每一次回到这个场景，那么都可以将dict的值清空

        if (scenes) {//只要变量scenes不是0或假,这个基本上是用来检测是否出bug用的
            var i, j;//声明变量i和j，但不赋值
            for (i = 0; i < scenes.length; ++i) {//声明循环的初始化(为i赋值)；条件；和循环后的改变
                let url = scenes[i].url;//声明url是scenes第几次循环的场景路径
                let dirname = cc.path.dirname(url).replace('db://assets/cases/', '');//获取该路径的名字，并且替换掉当前场景的路径
                if (dirname === 'db://assets/resources/test assets') {//如果获取的路径是db://assets/resources/test assets，中止目前的动作
                    continue;
                }
                let scenename = cc.path.basename(url, '.fire');//通过basename方法获取url的路径文件名，并且去除.fire后缀，然后赋值于scenename函数
                if (scenename === 'TestList') continue;//如果scenename文件名等于TestList，则中止当前动作

                if (!dirname) dirname = '_root';//如果dirname为0或者假，则其路径为目录
                if (!dict[dirname]) {//如果dict[dirname]值为0或者假，则创建为空的对象
                    dict[dirname] = {};
                }
                dict[dirname][scenename] = url;//将url的属性赋值予dict[dirname][scenename]
            }

        } else {
            cc.log('failed to get scene list!');//这个基本上是用来检测是否出bug用的
        }
        // 编译场景dict类型数组
        let dirs = Object.keys(dict);//用Object.keys()方法返回dict所有数组中的可枚举属性，并赋值于dirs
        dirs.sort();//用sort方法对dirs进行排序
        for (let i = 0; i < dirs.length; ++i) {//声明循环的初始化(为i赋值)；条件；和循环后的改变
            this.sceneList.push({
                name: dirs[i],
                url: null
            });
            let scenenames = Object.keys(dict[dirs[i]]);
            scenenames.sort();
            for (let j = 0; j < scenenames.length; ++j) {
                let name = scenenames[j];
                this.sceneList.push({
                    name: name,
                    url: dict[dirs[i]][name]
                });
            }
        }
        let y = 0;
        this.node.height = (this.sceneList.length + 1) * 50;
        for (let i = 0; i < this.initItemCount; ++i) {
            let item = cc.instantiate(this.itemPrefab).getComponent('ListItem');
            let itemInfo = this.sceneList[i];
            item.init(this.menu);
            this.node.addChild(item.node);
            y -= 50;
            item.updateItem (i, y, itemInfo.name, itemInfo.url);
            this.itemList.push(item);
        }
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update (dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
        }
        this.updateTimer = 0;
        let items = this.itemList;
        let buffer = this.bufferZone;
        let isDown = this.node.y < this.lastContentPosY; // scrolling direction
        let curItemCount = this.itemList.length;
        let offset = 50 * curItemCount;
        for (let i = 0; i < curItemCount; ++i) {
            let item = items[i];
            let itemNode = item.node;
            let viewPos = this.getPositionInView(itemNode);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && itemNode.y + offset < 0) {
                    let newIdx = item.index - curItemCount;
                    let newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y + offset, newInfo.name, newInfo.url );
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && itemNode.y - offset > -this.node.height) {
                    let newIdx = item.index + curItemCount;
                    let newInfo = this.sceneList[newIdx];
                    item.updateItem(newIdx, itemNode.y - offset, newInfo.name, newInfo.url);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.node.y;
    },
});
