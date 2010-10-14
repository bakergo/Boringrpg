(function(){
	global_chat		 = {name : 'World'	,	channel : 'global_chat'};
	army_of_one	 	 = {name : 'Ao1'	,	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiLoxkM'};
	chaotic_neutral  = {name : 'CN' 	, 	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBijkBUM'};
	blight_is_might  = {name : 'BiM' 	, 	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjL5RUM'};
	exit  			 = {name : 'Exit' 	,	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjppRMM'};
	tardis 			 = {name : 'Tar' 	, 	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBj1gxkM'};
	ewigkeit 		 = {name : 'ek' 	, 	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiwyBwM'};
	Zzzzzzzz		 = {name : 'Zzz'	,	channel : 'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjpnSUM'};
	
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
		chatbox.append('<b>' + formatTime(message.time) + ' (<span style="color: #FF9933">' + guild.name + '</span>) <a href="/user/' + html2entities(message.username) + '">' + html2entities(message.username) + '</a></b>: ' + format(message.message) + '<br />');
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
//		army_of_one,
		chaotic_neutral,
		blight_is_might,
		exit,
		tardis,
//		ewigkeit,
//		Zzzzzzzz
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
