(function(root, factory){
    if ( typeof define === 'function' && define.amd ) {
        define("psdeeplink", factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root["psdeeplink"] = factory(root);
    }
})(window || this, function(root){

    var QueryString = function () {

        var querystring = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof querystring[pair[0]] === "undefined") {
            querystring[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            querystring[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            querystring[pair[0]].push(decodeURIComponent(pair[1]));
        }
        } 
        return querystring;
        
    }

    var parseUrl = function() {

        var href = window.location.pathname;

        
        if (href.indexOf('blackjack') != -1) {
            if (href.indexOf('launch') != -1) {
                return 'launch-blackjack';
            } else {
                return 'blackjack';
            }
        } 
        else if (href.indexOf('konami') != -1) {
            if (href.indexOf('launch') != -1) {
                return 'launch-konami';
            } else {
                return 'konami';
            }
        } else if (href.indexOf('slots') != -1) {
            if (href.indexOf('launch') != -1) {
                return 'launch-slots';
            } else {
                return 'slots';
            }
        }
        
        else if (href.indexOf('pinterest') != -1) {
            if (href.indexOf('launch') != -1) {
                return 'launch-pinterest';
            } else {
                return 'pinterest';
            }
        }

    }

    var getIntentURI = function(androidSetupObj){
        
        var appId = androidSetupObj.appId;
        var scheme = androidSetupObj.scheme;
        var host = androidSetupObj.host;
        var path = androidSetupObj.path;
        var queryString = getQueryString();//androidSetupObj.queryString;

        if(path.indexOf("/") != 0)
            path = "/" + path;
        if(path.indexOf("/") != (path.length-1))
            path += "/";

        var uri = "intent://" + host + path + queryString + "#Intent;scheme=" + scheme;
            uri += ";package=" + appId + ";end";
        return uri;
    }

    var getMobileOperatingSystem = function (){
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if( userAgent.match( /IE/i ) )
        {
            return 'Windows';
        }
        else if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
        {
            return 'iOS';
        }
        else if( userAgent.match( /Android/i ) )
        {
            return 'Android';
        }
        else if( userAgent.match(/BlackBerry/i) )
        {
            return 'Blackberry';
        }
        else
        {
            return 'other';
        }
    }

    var gotolink = function(variable){
        var result = deeplink.open(variable);
    }

    var gotoDesktopLink = function(variable) {

        window.location = variable

    }

    var iOSVersion = function (){
        if (/iP(hone|od|ad)/.test(navigator.userAgent)) { //navigator.platform
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = (navigator.userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/); //navigator.appVersion
            //console.log(v);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }

    var getQueryString = function(){

        var qString = '';
        var QueryStr = QueryString();
        if (QueryStr.hasOwnProperty('a')) {
            qString = 'coupon/' + QueryStr.a; 
        } else if (QueryStr.hasOwnProperty('f')) {
            qString = 'from/'+ QueryStr.f;
        } else if (QueryStr.hasOwnProperty('g')){
            qString = 'game/'+ QueryStr.g;
        } else if (QueryStr.hasOwnProperty('r')){
            qString = 'reward/'+ QueryStr.r;
        } else if (QueryStr.hasOwnProperty('o')){
            qString = 'offer/'+ QueryStr.o;
        } else {
            qString = '';
        }

        return qString;
    }

    var iOSRedirect = function(gameType, qString){
        //var qString = getQueryString();
        var ioslink = '';

        if (gameType == 'slots') { 
        
          ioslink = 'myvegas-'+gameType+'://' + qString;
            
        } else if (gameType == 'launch-slots') {
          
          ioslink = 'myvegas-slots://';
        
        } else if (gameType == 'blackjack') {
        
          ioslink = 'myvegas-'+gameType+'://' + qString;
        
        } else if (gameType == 'launch-blackjack') {
         
          ioslink = 'myvegas-blackjack://';
        
        } else if (gameType == 'konami') {
        
          ioslink = gameType+'-slots://'+ qString;
        
        } else if (gameType == 'launch-konami') {
         
          ioslink = 'konami-slots://';
        
        } else if (gameType == 'launch-pinterest') {
        
          ioslink = 'myvegas-slots://';
        
        }

        //console.log(ioslink);

        // determine ios version
        var iosVer = iOSVersion();
        //console.log(iosVer[0])
        if(iosVer &&  iosVer[0] >= 9)
        {
            window.location.href = ioslink;
        }
        //else{
          window.setTimeout(gotolink(ioslink),1000);
        //}

    }

    var androidRedirect = function(gameType, qString){
        //var qString = getQueryString();
        var androidlink = '';

        if(gameType == 'slots') {     

          androidlink = 'myvegas://slots/' + qString; //'https://mobile.playstudios.com/mobile/' + qString;       
          
        } else if (gameType == 'launch-slots') {
          
          androidlink = 'myvegas://slots/' + qString; //'https://mobile.playstudios.com/mobile/';            

        } else if (gameType == 'blackjack'){

          androidlink = 'myvegas://blackjack/'+ qString; //'http://www.myvegas.com/blackjack/'+ qString; 
      
        } else if (gameType == 'launch-blackjack') {    
        
          androidlink = 'myvegas://blackjack/'; //'http://www.myvegas.com/blackjack/';    

        } else if(gameType == 'konami'){

          androidlink = 'mykonami://slots/'+ qString;

        } else if (gameType == 'launch-konami') {
          
          androidlink = 'mykonami://slots/';
        
        } else if (gameType == "launch-pinterest") {
          
          androidlink = "https://mobile.playstudios.com/mobile/";       
            
        }
        window.setTimeout(gotolink(androidlink),1000);    
    }

    var otherRedirect = function(gameType, qString){
        if (gameType == "slots" || gameType == "blackjack") {
            var desktoplink = "https://apps.facebook.com/playmyvegas/?coupon=" + qString;
            window.setTimeout(gotoDesktopLink(desktoplink), 1000);

        } else if (gameType == "launch-slots" || gameType == "launch-blackjack") {
            var desktoplink = "https://apps.facebook.com/playmyvegas/"
            window.setTimeout(gotoDesktopLink(desktoplink), 1000);

        } else if ( gameType == "konami" ) {
            var desktoplink = "https://apps.facebook.com/mykonamislots/?coupon=" + qString;
            window.setTimeout(gotoDesktopLink(desktoplink), 1000);

        } else if (gameType == "launch-konami") {
            var desktoplink = "https://apps.facebook.com/mykonamislots/?coupon=" + qString;
            window.setTimeout(gotoDesktopLink(desktoplink), 1000);
        }
    }

    var isFacebookApp = function(){
        var ua = navigator.userAgent || navigator.vendor || window.opera;
        return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
    };

    var redirect = function (){

        var gameType = parseUrl();
        var qString = getQueryString();
        var OS = getMobileOperatingSystem();
        var isFB = isFacebookApp();
        console.log(isFB);
        // attach message to body
        if(isFB){
            $('#browsermessage').html('Please open link in a different mobile browser to redeem.');
        }

        switch(OS){
            case 'iOS':
                iOSRedirect(gameType, qString);
                break;
            case 'Android':
                androidRedirect(gameType, qString);
                break;
            case 'Windows' || 'Blackberry':
                $('.redirect-frame').html('');
                $('#warning').html('<h1>Sorry!</h1><h3>We don\'t have a compatible app for your mobile device yet.</h3>');
   
                break;
            case 'other':
                otherRedirect(gameType, qString)
                break;

        }

    }

    return {
        getIntentURI: getIntentURI,
        redirect: redirect
    };

});