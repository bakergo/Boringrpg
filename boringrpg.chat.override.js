// Get the correct chat button/textbox
var chatButton = document.getElementById('chat-button');
var textBox = document.getElementById('full-chat-textbox');
if(!textBox)
    textBox = document.getElementById('chat-textbox');

//Replace the textbox and button with new versions
//To get rid of excess listeners
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

//publishes a message to the channel
function writeMessage(message)
{
    channel = PUBNUB.attr(PUBNUB.$('chat'),'channel');
    $.post('/chat',{channel:channel,message:message});
}
//send message event.
function sendMessage(e){
    textbox = spoofbox;
    var text = textbox.value;
    textbox.value = '';
    if(!text)
        return true;
    writeMessage(text);
}

var lastory = Array();
var nextory = Array();
function chatEventHandler(e){
    textbox = spoofbox;
    if(e.type == 'keydown')
    {
        function scrollText(textbox, store, load)
        {
            if(textbox.value != '')
                store.push(textbox.value);
            v = load.pop();
            if(v != undefined)
                textbox.value = v;
            else
                textbox.value = '';
        }
        
        if(e.keyCode == 38)
            scrollText(textbox, nextory, lastory);
        if(e.keyCode == 40)
            scrollText(textbox, lastory, nextory);
                    
        if(e.keyCode == 13)
        {
            lastory.concat(nextory.reverse());
            nextory = new Array();
            lastory.push(textbox.value);
            sendMessage(e);
        }
    }
    if(e.type == 'click')
    {
        lastory.concat(nextory.reverse());
        nextory = new Array();
        lastory.push(textbox.value);
        sendMessage(e);
    }
}

//add the listeners
spoofbox.addEventListener('keydown', chatEventHandler, false);
spoofbutt.addEventListener('click', chatEventHandler, false);
