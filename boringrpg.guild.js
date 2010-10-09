(function(){
    var wait_poll_secs = 1;
    var wait_refr_secs = 300;
    var wait_backoff_secs = 30;

    var interval_poll = wait_poll_secs * 1000;
    var delay_refr = wait_refr_secs * 1000;
    var delay_backoff = wait_backoff_secs * 1000 * Math.random();

    var timer;

    function check(){
        if(Lib.Guild.canClick()){   
            clearTimeout(timer);
            if(Lib.user() != Lib.Guild.lastClicked()){
                if(Math.random() < .3)
                    Lib.Guild.submit();
                else
                    setTimeout('location.reload(true)',delay_backoff);            
            }
            else{
                setTimeout('location.reload(true)',delay_refr);
            }
        }
    }

    timer = setInterval(check, interval_poll);
})();
