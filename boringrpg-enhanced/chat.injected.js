(function(){
	
	function appendChildren(){
		var args = arguments;
		var parentNode = (typeof args[0] == 'object')	? args[0] :
			document.createElement(args[0]);
		for(var i=1; i<args.length; i++)
			parentNode.appendChild((typeof args[i] == 'object')? args[i]:
				document.createTextNode(args[i]));
		return parentNode;
	}	
	
	function copy(a){
		A = new Array();
		for(var i=0; i<a.length; i++)
			A.push(a[i]);
		return A;
	}

	function html2entities(value){
		function replacechar(match){
			if (match=="<")
				return "&lt;"
			else if (match==">")
				return "&gt;"
			else if (match=="\"")
				return "&quot;"
			else if (match=="'")
				return "&#039;"
			else if (match=="&")
				return "&amp;"
			else if (match=="(")
				return "[";
			else if (match==")")
				return "]";
		}
		
		var re=/[()<>"'&]/g;
		return value.replace(re, replacechar)
	}
	
	function replaceTextNodes(node, replaceRegex, replaceFunction){
		if(!node) return;
		if(node.firstChild){
			children = copy(node.childNodes);
			for(child in children)
				replaceTextNodes(children[child], replaceRegex, replaceFunction);
			return;
		}
		
		nodeText = node.nodeValue;
		
		var nodes = nodeText.match(replaceRegex);
		var texts = Array();
		
		var marker = 0;
		for(i in nodes){
			var endSearch = nodeText.indexOf(nodes[i], marker);
			texts.push(nodeText.substring(marker, endSearch));
			marker = endSearch + nodes[i].length;
		}
		texts.push(nodeText.substring(marker));
		
		if(!nodes || !texts) return;
		
		for(i in texts)
			texts[i] = document.createTextNode(texts[i]);
		
		for(i in nodes)
			nodes[i] = replaceFunction(nodes[i]);
		
		while(texts.length > 0 || nodes.length > 0){
			var text = texts.shift();
			var child = nodes.shift();
			
			if(text) node.parentNode.insertBefore(text, node);
			if(child) node.parentNode.insertBefore(child, node);
		}
		
		node.parentNode.removeChild(node);
	}
	
	function matchUserName(messageObj){
		function highlight(match){
			nameSpan = appendChildren('span', match);
			nameSpan.style.color = '#FF5700';
			nameSpan.style.fontWeight = 'bold';
			return nameSpan;
		}
		
		var username = sidebar.getElementsByTagName('h2')[0].textContent;
		
		var children = copy(messageObj.message.childNodes);
		for(childNode in children)
			replaceTextNodes(children[childNode], new RegExp(username,'ig'), highlight);
		
		return messageObj;
	}
	
	function matchURLs(messageObj) {
		function makeLink(match){
			link = appendChildren('a',match);
			link.href = match;
			link.target = '_blank';
			return link;
		}
		
		var re=/https?:\/\/([-\w\.]+\.)+([a-zA-Z]+)(\/\S*)*/ig
		var children = copy(messageObj.message.childNodes);
		for(childNode in children)
			replaceTextNodes(children[childNode], re, makeLink);
			
		return messageObj;
	}
	
	function nodifyMessage(messageObj){
		messageSpan = appendChildren('span', messageObj.message);
		messageObj.message = messageSpan;
		return messageObj;
	}
	
	function formatTime(messageObj){
		function pad(int) {
            if (int < 10)
                return '0' + int;
            return int;
        }
 
        var time = new Date(parseInt(messageObj.time) * 1000);
        var timeString = [time.getHours(), time.getMinutes(), time.getSeconds()].map(pad).join(':');
        messageObj.time = document.createTextNode(timeString);
        return messageObj;
	}
	
	function linkUser(messageObj){
		nameLink = appendChildren('a', messageObj.username);
		nameLink.href = '/user/'+messageObj.username;
		messageObj.username = nameLink;
		return messageObj;
	}
	
	function escapeMessage(messageObj){
		messageObj.username = html2entities(messageObj.username);
		return messageObj;
	}
	
    function decorator(tag, color){
		function makeTag(){			
			var decElem = appendChildren('span', '(', tag, ')');
			decElem.style.color = color;
			return decElem;
		}
		return makeTag;
    }
    
    function noDecorator(){
		return document.createTextNode('');
	}
    
    function channel(name, channel){
        return {name:name, decorator:decorator(name, '#FF9933'), channel:channel};
    }
    
	World			= {name : 'World'   ,	decorator : noDecorator, channel : 'global_chat'};
    Newbie     		= {name : 'Newbie'  ,   decorator : decorator('Newbie','#3399FF'), channel : 'newbie_chat'};
	army_of_one	 	= channel('Ao1'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiLoxkM');
    bacon           = channel('Bacon'   ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiYkCQM');
	blight_is_might = channel('BiM' 	, 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjL5RUM');
	cakewagon	    = channel('Cake'	,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjqrCsM');
    caps_warriors   = channel('CAPS'    ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBih9SgM');
    chaotic_neutral = channel('CN' 	    , 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBijkBUM');
	danger_zone		= channel('Danger'  ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjOtSUM');
	ewigkeit 		= channel('ek' 	    , 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiwyBwM');
	exit  			= channel('Exit' 	,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjppRMM');
	house_of_hats   = channel('HoH'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjNwiYM');
    huzzah          = channel('Huzzah'  ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBio1SsM');
    just_the_tip    = channel('JT'      ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBivyisM');
    kool_kids_klan  = channel('KKK'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjR0ikM');
    naked_vendor    = channel('NV'      ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiNwCoM');
    narwhals		= channel('Nar'	    ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiM1igM');
    plac_burger     = channel('PB'      ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiE9i0M');
	romborama       = channel('Rombo'	,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiV9iwM');
    tardis 			= channel('Tar' 	, 	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBj1gxkM');
	tautology       = channel(':='	    ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBikzCsM');
    thantanos		= channel('Than'    ,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjshCMM');
    turtle_brigade  = channel('Turtle'	,	'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiwzS0M');
    twaan           = channel('Twaan'   ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiZnCkM');
    wake_the_dead   = channel('Wake'    ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBiLqygM');
    zzzzzzzz		= channel('Zzz'     ,   'guild_chat_agpib3JpbmdycGcxcg0LEgVHdWlsZBjpnSUM');
    
	Transformations = {
		subscribe 	: [escapeMessage, linkUser, formatTime, nodifyMessage, matchURLs, matchUserName]
	}
	
	var chatbox = $('div[id$=chat-chatbox]');
//	var chatselect = $('select[id=chat-channel]');
	
	function writeFormattedMessage(guild, message){
		for(transform in Transformations.subscribe)
			message = Transformations.subscribe[transform](message);
		
		chatSection = chatbox.get()[0];
		prependNode = appendChildren('b',message.time,' ',guild.decorator(),' ',message.username);
		chatSection = appendChildren(chatSection,prependNode,': ',message.message,document.createElement('br'));
    }
    
	function subscribeFactory(guild){
		return function(message){
			writeFormattedMessage(guild, message);
			chatbox.animate({ scrollTop: chatbox.attr("scrollHeight") - chatbox.height() }, 600);
		}
	}
	
	function test(){
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'http://example.com'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'http://www.example.com'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'http://www.example.com/pants'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'http://example.com http://example.com'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'fahsfagg'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'afahsfagg'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'fahsfagga'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'afahsfagga'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'fahsfagg fahsfagg pants fahsfagg'});
		writeFormattedMessage(World, {time:1287766755,username:'fahsfagg',message:'http://www.boringrpg.com/user/fahsfagg'});
	}
		
	//test();
	
	function replaceSubscription(guild){
		var guildRegex = new RegExp(guild.channel);
		for(j in PUBNUB.i)
			if(guildRegex.test(PUBNUB.i[j][0].channel))
				PUBNUB.i[j][1] = subscribeFactory(guild);
	}
	
	[
        World,
        Newbie,
    ].map(replaceSubscription);
	
})();

console.log('chat loaded - 20');
