(function(){
    Lib.initMembers();
    var timer = null;
    var Timer = {
            timer : null,
            //waits for the game button to clear off.
            waitTimer : function(){
                if(Lib.Game.canClick())
                    return;
                if(Timer.timer) clearTimeout(timer);
                timer = setTimeout(Timer.setTimer, (Lib.Game.getTimeRemaining())*1000);
            },
            
            setTimer : function(){
                if(Lib.Game.canClick())
                    Lib.notify('Boringrpg :: Game','You should click the Game button.');
                if(Timer.timer) clearTimeout(Timer.timer);
                Timer.timer = setInterval(Timer.waitTimer, 1000);
            }
        }
    
    if(Lib.Game.canClick())    
        Lib.notify('Boringrpg :: Game','You should click the Game button.');
    Timer.timer = setInterval(Timer.waitTimer, 1000);
    
})();
