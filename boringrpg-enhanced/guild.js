var Page = {
	getTimeRemaining : function(){
		return Lib.getTimeRemainingFromText(document.getElementById('side-timer').innerText);
	},
	
	getUser : function(){
		return sidebar.getElementsByTagName('h2')[0].innerText;
	},
	
	getLastClicked : function(){
		return document.links[7].text;
	},
	
    getGuildTimeRemaining : function(){
		return Lib.getTimeRemainingFromText(button.innerText);
	},
	
	getUpdateObject : function(){
		return {
			user : Page.getUser(),
			game : Page.getTimeRemaining(),
			guild : Page.getGuildTimeRemaining(),
			guilduser : Page.getLastClicked(),
		};
	}
}
