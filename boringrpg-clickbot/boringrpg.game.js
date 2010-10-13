(function(){
    var wait_secs = 1;
    var delay = wait_secs * 1000;

    function check(){
        if(Lib.Game.canClick())
            Lib.Game.submit();
    }

    setInterval(check, delay);
})();
