// ==UserScript==
// @name            Hello World
// @description     script to auto-submit the form on time, every time.
// @include			http://boringrpg.com/game
// @include         http://www.boringrpg.com/game

function check()
{
    var checkregex = /can click/;
    
    if(checkregex.test(document.getElementById('timer').innerHTML))
    {   
            document.forms[0].submit();
    }
}

document.getElementById('chat-textbox').maxLength = 1024;

setInterval(check, 1000);
