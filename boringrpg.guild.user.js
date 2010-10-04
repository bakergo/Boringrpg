// ==UserScript==
// @name            Hello World
// @description     script to auto-submit the form on time, every time.
// @include         http://boringrpg.com/guild
// @include			http://boringrpg.com/game
// @include         http://www.boringrpg.com/guild
// @include         http://www.boringrpg.com/game

function last_user_clicked()
{
    return document.links[7].text;
}

function current_user()
{
    return document.getElementById('sidebar')
        .childNodes[1]
        .childNodes[1]
        .childNodes[1]
        .innerHTML;
}

function check()
{
    var checkregex = /can click/;
    
    if(checkregex.test(document.getElementById('timer').innerHTML))
    {   
    	if(current_user() == last_user_clicked())
            location.reload(true);
        else
            document.forms[0].submit();
    }
}

document.getElementById('chat-textbox').maxLength = 1024;

setInterval(check, 1000);
