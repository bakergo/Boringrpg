var chatButton = document.getElementById('chat-button');
var textBox = document.getElementById('full-chat-textbox');
if(!textBox)
    textBox = document.getElementById('chat-textbox');

var spoofbox = document.createElement('input');
spoofbox.type = 'text';
spoofbox.style.width = '75%';
spoofbox.style.padding = '3px';
textBox.parentNode.replaceChild(spoofbox,textBox);

var spoofbutt = document.createElement('input');
spoofbutt.type = 'button';
spoofbutt.value = 'Spoof';
spoofbutt.style.width = '20%';
spoofbutt.style.padding = '3px 15px';
spoofbutt.style.float = 'right';
chatButton.parentNode.replaceChild(spoofbutt,chatButton);

function writeMessage(username,message)
{
    channel = PUBNUB.attr(PUBNUB.$('chat'),'channel');
    PUBNUB.publish({channel:channel,message:{username:username,message:message}});
}

function sendMessage(e){
    textbox = spoofbox;
    var text = textbox.value;
    
    if(e.type == 'keydown')
        if(e.keyCode != 13)
            return true;
    
    textbox.value = '';
    
    var reName = /^\/name/;
    var username = 'fahsfagg';
    
    if(reName.test(text))    
    {        
        var splitText = text.split(' ');
        username = splitText[1];
        text = splitText.slice(2).join(' ');        
    }
    
    if(!text)
        return true;
    
    writeMessage(username,text);
}

spoofbox.addEventListener('keydown', sendMessage, false);
spoofbutt.addEventListener('click', sendMessage, false);

