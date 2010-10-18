(function(){
    Lib.initMembers();
    Lib.Game.update();

    var timer = null;
    var Timer = {
            timer : null,
            //waits for the game button to clear off.
            waitTimer : function(){
                if(Lib.Game.getTimeRemaining() == 0)
                    return;
                Lib.Game.update();
                if(Timer.timer) clearInterval(timer);
                timer = setTimeout(Timer.setTimer, (Lib.Game.getTimeRemaining())*1000);
            },
            
            setTimer : function(){
                if(Timer.timer) clearTimeout(Timer.timer);
                Timer.timer = setInterval(Timer.waitTimer, 1000);
            }
        }
    
    Timer.timer = setInterval(Timer.waitTimer, 1000);
})();
