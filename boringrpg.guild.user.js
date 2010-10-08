// ==UserScript==
// @description     script to auto-submit the form on time, every time.
// @include         http://boringrpg.com/guild
// @include			http://boringrpg.com/game
// @include         http://www.boringrpg.com/guild
// @include         http://www.boringrpg.com/game

var wait_poll_secs = 1;
var wait_refr_secs = 300;
var wait_backoff_secs = 30;

var interval_poll = wait_poll_secs * 1000;
var delay_refr = wait_refr_secs * 1000;
var delay_backoff = wait_backoff_secs * 1000 * Math.random();

var timer;

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
    
    if(checkregex.test(document.getElementById('button').children[0].innerHTML))
    {   
        clearTimeout(timer);
    	if(current_user() != last_user_clicked())
        {
            if(Math.random() < .3)
                document.forms[0].submit();
            else
                setTimeout('location.reload(true)',delay_backoff);            
        }
        else
        {
            setTimeout('location.reload(true)',delay_refr);
        }
    }
}

timer = setInterval(check, interval_poll);
