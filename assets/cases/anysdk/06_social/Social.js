const SuspensionTips = require('SuspensionTips');
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {
        if(cc.sys.isMobile && anysdk.agentManager.getSocialPlugin){
            this.socialPlugin = anysdk.agentManager.getSocialPlugin();
            if(this.socialPlugin){
                this.socialPlugin.setListener(this.onSocialResult, this);
            }
        }
    },
	submitScore:function(){
	    if (!this.socialPlugin){
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
        var score = 131;
        this.socialPlugin.submitScore("friend", score);
	},
	showLeaderboard:function(){
	    if (!this.socialPlugin) {
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
		this.socialPlugin.showLeaderboard("friend");
	},
	unlockAchievement:function(){
	    if (!this.socialPlugin){
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
        var achInfo = {"rank":"friends"}
        this.socialPlugin.unlockAchievement(achInfo);
	},
	
	showAchievements: function (){
	    if (!this.socialPlugin){
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
		this.socialPlugin.showAchievements();
	},
	
	signIn: function (){
	    if (!this.socialPlugin){
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
		this.socialPlugin.signIn();
	},
	
	signOut: function (){
	    if (!this.socialPlugin){
            SuspensionTips.init.showTips(' this.socialPlugin is null ');
            return;
        }
		this.socialPlugin.signOut();
	},
	
	onSocialResult:function(code, msg){
        cc.log(' SOCIAL RESULT ########## code: ' + code + ',msg: ' + msg);
		switch(code){
			case anysdk.SocialRetCode.kScoreSubmitSucceed:
	    		SuspensionTips.init.showTips(' kScoreSubmitSucceed ');
				break;
			case anysdk.SocialRetCode.kScoreSubmitfail:
	    		SuspensionTips.init.showTips(' kScoreSubmitfail ');
				break;
			case anysdk.SocialRetCode.kAchUnlockSucceed:
	    		SuspensionTips.init.showTips(' kAchUnlockSucceed ');
				break;
			case anysdk.SocialRetCode.kAchUnlockFail:
	    		SuspensionTips.init.showTips(' kAchUnlockFail ');
				break;
			case anysdk.SocialRetCode.kSocialSignInSucceed:
	    		SuspensionTips.init.showTips(' kSocialSignInSucceed ');
				break;
			case anysdk.SocialRetCode.kSocialSignOutSucceed:
	    		SuspensionTips.init.showTips(' kSocialSignOutSucceed ');
				break;
			case anysdk.SocialRetCode.kSocialSignOutFail:
	    		SuspensionTips.init.showTips(' kSocialSignOutFail ');
				break;
			case anysdk.SocialRetCode.kSocialSignOutFail:
	    		SuspensionTips.init.showTips(' kSocialSignOutFail ');
				break;
			case anysdk.SocialRetCode.kSocialGetGameFriends:
	    		SuspensionTips.init.showTips(' kSocialGetGameFriends ');
				break;
		}
	}
});
