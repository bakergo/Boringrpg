var guildTimer = {
    user : null,
    guild : 0,
    tguild : null,
    guildLastUser : null,
    
    notifyGuild : function(){
        if(guildTimer.guildLastUser == guildTimer.user && guildTimer.user != null)
            handlers.notify({title:'Boringrpg :: Guild',message:'Someone should click the Guild button.'});
        else if(guildTimer.user != null)
            handlers.notify({title:'Boringrpg :: Guild',message:'You should click the Guild button.'});
        guildTimer.tguild = null;
    },
    
    setGuildTime : function(seconds){
        if(guildTimer.tguild)
            clearTimeout(guildTimer.tguild);
        guildTimer.guild = seconds;
        guildTimer.tguild = setTimeout(guildTimer.notifyGuild, guildTimer.guild*1000);
    }
}
