var Lib = {    
    Guild : {        
        Treasury : {
            submit : function(){
                document.forms[0].submit();
            },
            
            setCoins : function(coin){
                document.getElementById('coins').value = coin;
            },
            
            setTokens : function(tok){
                document.getElementById('tokens').value = tok;
            },
        },
        
        lastClicked : document.links[7].text,
        
        canClick : function(){
            var check = /can click/;
            return check.test(document.getElementById('button').innerText);
        },
        
        submit : function(){
            return document.forms[0].submit();
        }
    },

    Game : {
        canClick : function(){
            var check = /can click/;
            return check.test(document.getElementById('button').innerText);
        },
        
        submit : function(){
            document.forms[0].submit();
        }
    },
    
    PartyBox : {
        submit : function(){
            document.forms[0].submit();
        }
    },

    insertScript : function (script){
        inserted = document.createElement('script');
        inserted.src = chrome.extension.getURL(script);
        document.head.appendChild(inserted);
    },
    
    Timer : {
        rawMinutes:parseInt(document.getElementById('side-timer').innerText.split(':')[0]),
        rawSeconds:parseInt(document.getElementById('side-timer').innerText.split(':')[1]),        
    },

    user : sidebar.getElementsByTagName('h2')[0].innerText,

    clicks : sidebar.getElementsByClassName('right')[4].innerText,

    coins : sidebar.getElementsByClassName('right')[5].innerText,
    
    items : sidebar.getElementsByClassName('right')[6].innerText,
    
    tokens : sidebar.getElementsByClassName('right')[7].innerText
}