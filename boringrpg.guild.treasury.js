(function(){
    var wait_secs = Lib.clicks()*10;
    var delay = wait_secs*60*1000;

    function donate(){
        Lib.Guild.Treasury.setCoins(Lib.coins());
        Lib.Guild.Treasury.setTokens(Lib.tokens());
        Lib.Guild.Treasury.submit();
    }

    if(Lib.coins() > 0 || Lib.tokens() > 0)
        donate();
    setTimeout('location.reload(true)',delay);
})();
