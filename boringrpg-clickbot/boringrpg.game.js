(function(){
    var minutes = isNaN(Lib.Timer.rawMinutes)?0:Lib.Timer.rawMinutes;
    var seconds = isNaN(Lib.Timer.rawSeconds)?0:Lib.Timer.rawSeconds;
    
    var wait_secs = minutes*60 + seconds;
    var delay = wait_secs * 1000;

    setTimeout(Lib.Game.submit, delay);
})();
