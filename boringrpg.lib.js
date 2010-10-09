var Lib = {
    Guild : {        
        Treasury : {
            submit : function(){
                document.forms[0].submit();
            },
            
            setCoins : function(coins){
                document.getElementById('coins').value = Lib.coins();
            },
            
            setTokens : function(tokens){
                document.getElementById('tokens').value = Lib.tokens();
            }
        },
        
        lastClicked : function(){
            return document.links[7].text;
        },
        
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

    insertScript : function (script){
        inserted = document.createElement('script');
        inserted.src = chrome.extension.getURL(script);
        document.head.appendChild(inserted);
    },
    
    sidebar : document.getElementById('sidebar'),
    
    user : function(){
        return Lib.sidebar.getElementsByTagName('h2')[0].innerText;
    },

    clicks : function(){
        return Lib.sidebar.getElementsByClassName('right')[3].innerText;
    },

    coins : function(){
        return Lib.sidebar.getElementsByClassName('right')[4].innerText;
    },
    
    items : function(){
        return Lib.sidebar.getElementsByClassName('right')[5].innerText;
    },
    
    tokens : function(){
        return Lib.sidebar.getElementsByClassName('right')[6].innerText;
    }
}
