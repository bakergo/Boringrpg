function(){
    var wait_mins = 20;
    var delay = wait_mins*60*1000;

    function donate(){
        Lib.Guild.Treasury.setCoins(Lib.coins());
        Lib.Guild.Treasury.setTokens(Lib.tokens());
        Lib.Guild.Treasury.submit();
    }

    if(getCoins() > 0 || getTokens() > 0)
        donate();
    setTimeout('location.reload(true)',delay);
}();
