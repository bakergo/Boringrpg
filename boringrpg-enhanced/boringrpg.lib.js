var consts = {
	requestType : {
		NOTIFICATION : 0,
        UPDATE : 1
	},
    
    responseType : {
        SUCCESS : 0,
        ERROR : 1
    }
}

var Lib = {    
    Guild : {
        getTimeRemaining : function(){
            var reNums = /[0-9]+/g;
            var minutes = 0;
            var seconds = 0;
            matches = button.innerText.match(reNums);
            if(!matches)
                return 0;
            if(matches.length >= 1)
                minutes = parseInt(matches[0]);
            if(matches.length >= 2)
                seconds = parseInt(matches[1]);
            return minutes*60+seconds;
        },
        
        canClick : function(){
            var check = /can click/;
            return check.test(document.getElementById('button').innerText);
        },
        
        update : function(){
            chrome.extension.sendRequest({
                type:consts.requestType.UPDATE,
                value:{
                    guild: Lib.Guild.getTimeRemaining(),
                    guilduser: Lib.Guild.lastClicked,
                    user: Lib.user
                }
            });
        },
        
        initMembers : function(){
            Lib.Guild.lastClicked = (document.links[7])?document.links[7].text:null;
        }
    },

    Game : {
        getTimeRemaining : function(){
            var reNums = /[0-9]+/g;
            var minutes = 0;
            var seconds = 0;
            matches = button.innerText.match(reNums);
            if(!matches)
                return 0;
            if(matches.length >= 1)
                minutes = parseInt(matches[0]);
            if(matches.length >= 2)
                seconds = parseInt(matches[1]);
            return minutes*60+seconds;
        },
        
        canClick : function(){
            var check = /can click/;
            return check.test(button.innerText);
        },
        
        update : function(){
            chrome.extension.sendRequest({
                type:consts.requestType.UPDATE,
                value:{
                    game: Lib.Game.getTimeRemaining(),
                    user: Lib.user
                }
            });
        },
        
        initMembers : function (){}
    },
    
    insertScript : function (script){
        inserted = document.createElement('script');
        inserted.src = chrome.extension.getURL(script);
        document.head.appendChild(inserted);
    },
    
    notify : function(title, message){
		chrome.extension.sendRequest({
			type:consts.requestType.NOTIFICATION,
			value:{
				title: title,
				message: message
			}
		});
    },
    
    initMembers : function(){
        if(sidebar)
        {
            Lib.user    = sidebar.getElementsByTagName('h2')[0].innerText;
            Lib.clicks  = sidebar.getElementsByClassName('right')[4].innerText;
            Lib.coins   = sidebar.getElementsByClassName('right')[5].innerText;
            Lib.items   = sidebar.getElementsByClassName('right')[6].innerText;
            Lib.tokens  = sidebar.getElementsByClassName('right')[7].innerText;
        }
        
        Lib.Guild.initMembers();
        Lib.Game.initMembers();
    }
}
