var wait_mins = 20;
var delay = wait_mins*60*1000;

function getCoins()
{
    return document.getElementById('sidebar')
        .children[0]
        .children[0]
        .children[2]
        .children[4]
        .innerHTML;
}

function getTokens()
{
    return document.getElementById('sidebar')
        .children[0]
        .children[0]
        .children[2]
        .children[10]
        .innerHTML;
}

function donate()
{
    document.getElementById('coins').value = getCoins();
    document.getElementById('tokens').value = getTokens();
    document.forms[0].submit();
}

if(getCoins() > 0 || getTokens() > 0)
    donate();
setTimeout('location.reload(true)',delay);
