var Page = {
    getTimeRemaining : function(){
		return Lib.getTimeRemainingFromText(button.innerText);
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
	
	attachUpdateEvents : function(e){
		function b(){
			setTimeout(e,2000);
		}
		
		document.getElementsByClassName('play')[0].addEventListener('click', b, false);
	},
	
	injectObjects : {
		script : ['chat.injected.js']		
	}
}




