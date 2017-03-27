cc.Class({
    extends: cc.Component,

    properties: {

        speed: 100,

        progressBar: {
            default: null,
            type: cc.Node
        },

        ground: {
            default: null,
            type: cc.Node
        }
    },
    
    init(){
        this.back2=true;
        this.back3=true;
    },
    /*update: function (dt) {
        this._updateWdith(this.progressBar, 500, dt);
        this._updateWdith(this.ground, 1000, dt);
    },*/
    update: function (dt) {
        if(this.progressBar.width > 500){
            this.back2=true;
            this._updateWdith(this.progressBar, true, dt);
        }else{
            if(this.progressBar.width < 0){
                this.back2 = false;
                this._updateWdith(this.progressBar, false, dt);
            }else{
                if(this.back2 === false){
                    this._updateWdith(this.progressBar, false, dt);
                }else{
                    this._updateWdith(this.progressBar, true, dt);
                }
            }
        }
        if(this.ground.width > 1000){
            this.back3 = true;
            this._updateWdith(this.ground, true, dt);
        }else{
            if(this.ground.width < 0){
                this.back3 = false;
                this._updateWdith(this.ground, false, dt);
            }else{
                if(this.back3 === false){
                    this._updateWdith(this.ground, false, dt);
                }else{
                    this._updateWdith(this.ground, true, dt);
                }
            }
        }
    },
    /*_updateWdith: function (node, range, dt) {
        var width = node.width;
        width = width < range ? width += dt * this.speed : 0;
        node.width = width;
    }*/
    
    _updateWdith: function (node, direction, dt) {
        var back = direction;
        var width = node.width;
        back === true ? width -= dt * this.speed : width += dt * this.speed;
        node.width = width;
    }
});
