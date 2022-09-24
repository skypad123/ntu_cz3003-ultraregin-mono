/*:
 * @target MZ
 * @plugindesc Zen's custom plugin
 * @author Zen
 *
 * @help Zen.js
 *
 * This plugin calls Strapi Rest API 
 * 
 * @command loginUser
 * @desc Sets username variableID.
 * 
 * @arg usernameID
 * @type number
 * @desc Sets username variableID.
 * @default 1
 * @decimals 0
 * 
 * @arg passwordID
 * @type number
 * @desc Sets password variableID.
 * @default 2
 * @decimals 0
 */

(() => {
    //global stuff
    var loginID = "";
    usernameID = 1;
    passwordID = 2;

    //
    const axios = require('axios').default;

    testFunction = function(){
        
        axios.post('https://ultrareign-be-7mmq3.ondigitalocean.app/api/auth/local/', {
        'identifier': 'zenzen123',
        'password': 'zenzen123'
      }).then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      });


        console.log("This function has been called");

    }

    registerUser = function(username, email, password){
        console.log("registerUser has been called");
        axios.post('https://ultrareign-be-7mmq3.ondigitalocean.app/api/auth/local/register', {
        'username': username,
        'email': email,
        'password': password
      }).then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        return response.data.jwt;
      });

    }

    getLoginID = function(){
        console.log("loginID:"+$gameVariables.value(3));
        return $gameVariables.value(3);
    }
    getResponse = function(){
        console.log("Response:"+$gameVariables.value(4));
        return $gameVariables.value(3);
    }

    loginUser = function(username, password){
        console.log("loginUser has been called");
        axios.post('https://ultrareign-be-7mmq3.ondigitalocean.app/api/auth/local/', {
        'identifier': username,
        'password': password
      }).then(response => {
        console.log(response);
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        loginID = response.data.jwt;
        $gameVariables.setValue(3,loginID);
        $gameVariables.setValue(4,response.status);
        getResponse();
        return response.data.jwt;
      }).catch(error => {
        console.log('An error occurred:', error.response);
        loginID = "";
        $gameVariables.setValue(3,loginID);
        $gameVariables.setValue(4,error.response.status);
        getResponse();
      });

    }
    PluginManager.registerCommand("zen", "loginUser", () => {
        loginUser($gameVariables.value(usernameID), $gameVariables.value(passwordID));
        
    });

})();