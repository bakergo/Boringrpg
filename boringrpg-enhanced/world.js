var Page = {
	getTimeRemaining : function(){
		return Lib.getTimeRemainingFromText(document.getElementById('side-timer').innerText);
	},
	
	getUser : function(){
		return sidebar.getElementsByTagName('h2')[0].innerText;
	},
	
	getUpdateObject : function(){
		return {
			user : Page.getUser(),
			game : Page.getTimeRemaining(),
		};
	},
}
