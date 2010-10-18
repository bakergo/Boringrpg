(function(){
    Lib.Game.update();
    var timer = null;
    
    var Timer ={
            timer : null,
            //waits for the game button to clear off.
            waitTimer : function(){
                if(Lib.Game.canClick())
                    return;
                if(Timer.timer) clearTimeout(timer);
                Lib.Game.update();
                timer = setTimeout(Timer.setTimer, (Lib.Game.getTimeRemaining()+5)*1000);
            },
            
            setTimer : function(){
                if(Timer.timer) clearTimeout(timer);
                timer = setInterval(waitTimer, 1000);
            }
        }
    Timer.timer = setInterval(Timer.waitTimer, 1000);
    
})()
