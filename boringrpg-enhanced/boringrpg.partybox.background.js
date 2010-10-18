(function(){
    function notify(){
        var date = new Date();
        var countdown = 60;
        var wait_secs = (countdown - (date.getMinutes() + date.getSeconds()/60)) * 60;
        var delay = wait_secs * 1000;
        
        if(date.getMinutes() < 1)
            handlers.notify({title:'Boringrpg :: Party Box',message:'It\'s party time!'});
        setTimeout(notify,delay);
    }
    notify();
})();
