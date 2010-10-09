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
        inserted.src = script;
        document.script.appendChild(inserted);
    },
    
    user : function(){
        var sidebar = document.getElementById('sidebar');
        return sidebar.getElementsByTagName('h2')[0].innerText;
    },

    tokens : function(){
        var sidebar = document.getElementById('sidebar');
        return sidebar.getElementsByClassName('right')[6].innerText;
    },

    coins : function(){
        var sidebar = document.getElementById('sidebar');
        return sidebar.getElementsByClassName('right')[4].innerText;
    }
}
