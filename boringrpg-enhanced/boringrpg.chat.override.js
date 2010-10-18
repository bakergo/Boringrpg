(function(){
    function decorator(tag, color){
        return ' (<span style="color:'+color+'">'+tag+'</span>)';
    }
    
    function channel(name, channel){
        return {name:name, decorator:decorator(name, '#FF9933'), channel:channel};
    }
    
	global_chat		= {name : 'World'   ,	decorator : '', channel : 'global_chat'};
    newbie_chat     = {name : 'Newbie'  ,   decorator : decorator('Newbie','#3399FF'), channel : 'newbie_chat'};
	army_of_one	 	= channel('Ao1'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiLoxkM');
    bacon           = channel('Bacon'   ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiYkCQM');
	blight_is_might = channel('BiM' 	, 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjL5RUM');
	chaotic_neutral = channel('CN' 	    , 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBijkBUM');
	danger_zone		= channel('Danger'  ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjOtSUM');
	ewigkeit 		= channel('ek' 	    , 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiwyBwM');
	exit  			= channel('Exit' 	,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjppRMM');
	narwhals		= channel('Nar'	    ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiM1igM');
	tardis 			= channel('Tar' 	, 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBj1gxkM');
	thantanos		= channel('Than'    ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjshCMM');
    wake_the_dead   = channel('Wake'    ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiLqygM');
    Zzzzzzzz		= channel('Zzz'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjpnSUM');
	
	var chatbox = $('div[id$=chat-chatbox]');
	var chatselect = $('select[id=chat-channel]');
	var messageHistory = Array();
	
	function formatTime (t){
		function pad(int){
			if(int < 10)
				return '0' + int;
			return int;
		}
		var time = new Date(parseInt(t)*1000);
		return [time.getHours(), time.getMinutes(), time.getSeconds()].map(pad).join(':');
	}

	function writeFormattedMessage(guild, message){
		chatbox.append('<b>' + formatTime(message.time) + guild.decorator + ' <a href="/user/' + html2entities(message.username) + '">' + html2entities(message.username) + '</a></b>: ' + format(message.message) + '<br />');
	}
	
	function subscribeFactory(guild){
		return function(message){
			writeFormattedMessage(guild, message);
			chatbox.animate({ scrollTop: chatbox.attr("scrollHeight") - chatbox.height() }, 600);
		}
	}
	
	function historyFactory(guild){
		return function(messages){
			function addMessage(m){
				messageHistory.push({guild:guild, message:m});
			}
			messages.map(addMessage);
			messageHistory.sort(messageCmp);
		}
	}
	
	function messageCmp(a,b){
		if(a.message.time < b.message.time)
			return -1;
		else if(a.message.time > b.message.time)
			return 1;
		return 0;
	}
	
	function add_guild(guild){
		PUBNUB.subscribe({channel:guild.channel}, subscribeFactory(guild));
		PUBNUB.history({channel:guild.channel, limit:40}, historyFactory(guild));
		$('<option value="' +guild.channel + '">' + guild.name + '</option>').appendTo(chatselect);
	}
	
	[
        global_chat,   
        blight_is_might,
        chaotic_neutral,
        exit, 
    ].map(add_guild);
	
	function fillChatBox(){		
			function writeHistoryMessage(m){
				writeFormattedMessage(m.guild, m.message);
			}
			chatbox.empty();
			messageHistory.map(writeHistoryMessage);
			chatbox.animate({ scrollTop: chatbox.attr("scrollHeight") - chatbox.height() }, 600);
	}
	
	setTimeout(fillChatBox,1000);
})();
