var Lib = {
	getTimeRemainingFromText : function(ele){
		var reNums = /[0-9]+/g;
		var minutes = 0;
		var seconds = 0;
		matches = ele.match(reNums);
		if(!matches)
			return 0;
		if(matches.length >= 1)
			minutes = parseInt(matches[0]);
		if(matches.length >= 2)
			seconds = parseInt(matches[1]);
		return minutes*60+seconds;
	},
	
	update : function(updObj){
		chrome.extension.sendRequest({
			type:consts.requestType.UPDATE,
			value : updObj,
		});
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
}
