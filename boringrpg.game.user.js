// ==UserScript==
// @description     script to auto-submit the form on time, every time.
// @include			http://boringrpg.com/game
// @include         http://www.boringrpg.com/game

var wait_secs = 1;
var delay = wait_secs * 1000;

function check()
{
    var checkregex = /can click/;
    
    if(checkregex.test(document.getElementById('button').children[0].innerHTML))
    {   
            document.forms[0].submit();
    }
}

setInterval(check, delay);
