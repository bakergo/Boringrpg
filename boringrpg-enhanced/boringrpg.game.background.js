var gameTimer = {
    game: 0,
    tgame: null,
    
    notifyGame : function(){
        handlers.notify({title:'Boringrpg :: Game',message:'Click the Game button.'});
        gameTimer.tgame = null;
    },
    
    setGameTime : function(seconds){
        if(gameTimer.tgame)
            clearTimeout(gameTimer.tgame);
        gameTimer.game = seconds;
        gameTimer.tgame = setTimeout(gameTimer.notifyGame, gameTimer.game*1000);
//        handlers.notify({title:'Debug',message:'Game timer updated'});
    }
}
