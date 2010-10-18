(function(){
	var vals = $('#button>span>b').get();
	
	var rawMinutes = (vals.length >= 1)? parseInt(vals[0].innerText) : 0;
	var rawSeconds = (vals.length >= 2)? parseInt(vals[1].innerText) : 0;
	
    var minutes = isNaN(rawMinutes)?0:rawMinutes;
    var seconds = isNaN(rawSeconds)?0:rawSeconds;
    
    var nextClick = new Date();
    var intervalTimer;
    
	var Game = {
		div : $('#click_message'),
		success : $('<div class="success"></div>'),
		error : $('<div class="error"></div>'),
		message : $('<p></p>'),		
		timer : $('#button>span'),
		
		submit : function(callback){
			var form = $('form');
			Game.div.animate({ opacity: 0 }, 300);
			$.post('/game', form.serialize(), callback, 'json');
		},
		
		setTimer : function(){
			var wait_secs = minutes * 60 + seconds;
			var delay = wait_secs * 1000;
			nextClick = new Date();
			nextClick.setTime(nextClick.getTime() + delay);
			if(intervalTimer)
				clearInterval(intervalTimer);
			intervalTimer = setInterval(function(){
				clickInterval = (nextClick - new Date())/1000;
				Game.timer.html(
					(clickInterval > 0)?
						'<b>' + Math.floor(clickInterval / 60) + '</b> minutes, <b>' + Math.floor(clickInterval % 60) + '</b> seconds left.'
						: 'You can click <u>now</u>!');},1000);
			setTimeout(function(){Game.submit(Game.handleData);}, delay);
		},
		
		setMessage : function(container,message){
			Game.div.empty();
			Game.message.html(message);
			Game.message.appendTo(container);
			container.prependTo(Game.div);
			Game.div.animate({ opacity: 1 }, 300);
		},
		
		handleData : function (data){
			var container = Game.success;
			seconds = data.seconds;
			
			if (data.status == "OK")
				container = Game.success;
			else if (data.status == "EARLY")
				container = Game.error;
			else
				location.reload();
			
			Game.setMessage(container, data.message);
			
			Game.setTimer();
		}
	}
	
	Game.setTimer();
    PUBNUB.unsubscribe({channel:'global_chat'});
    
})();
