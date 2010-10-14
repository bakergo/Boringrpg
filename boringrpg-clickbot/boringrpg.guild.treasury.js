(function(){
    var interval = 90;
    var coinThreshold = 720;
    var tokenThreshold = 0;
    
    var date = new Date();
    var wait_mins = (interval - ((date.getHours() * 60 + date.getMinutes()) % interval + date.getSeconds()/60));    
    var delay = wait_mins*60*1000;
    

    function donate(){
        Lib.Guild.Treasury.setCoins(Math.max(Lib.coins-coinThreshold, 0));
        Lib.Guild.Treasury.setTokens(Math.max(Lib.tokens-tokenThreshold, 0));
        Lib.Guild.Treasury.submit();
    }

    if(Lib.coins > coinThreshold || Lib.tokens > tokenThreshold)
        donate();
    setTimeout('location.reload(true)',delay);
})();
