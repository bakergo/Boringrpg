(function(){
    var date = new Date();
    var countdown = 65;
    if(date.getMinutes() < 10)
        countdown = 10;
    
    var wait_secs = (countdown - (date.getMinutes() + date.getSeconds()/60)) * 60;
    var delay = wait_secs * 1000;

    setTimeout(Lib.PartyBox.submit,delay);
})();

