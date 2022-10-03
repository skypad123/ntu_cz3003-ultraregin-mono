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
 * @desc Logins User.
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
 * 
 * @command getAssignments
 * @desc getAssignments.
 * 
 * @command getAssignmentScoreComposition
 * @desc getAssignmentScoreComposition.
 * 
 * @command getLevels
 * @desc getLevels.
 *
 * @command getLevelQuestionComposition
 * @desc getLevelQuestionComposition.
 * 
 * @command getQuestion
 * @desc getQuestion.
 * 
 * @command getUser
 * @desc getUser.
 * 
 * @command getWorld
 * @desc getWorld.
 * 
 * @command getWorldQuestionComposition
 * @desc getWorldQuestionComposition.
 * 
 */

(() => {
    //global stuff
    var loginID = "";
    usernameID = 1;
    passwordID = 2;
    returnID = 20;
    bearer_token = "970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5";
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
        return response.data.jwt;
      }).catch(error => {
        console.log('An error occurred:', error.response);
        loginID = "";
        $gameVariables.setValue(3,loginID);
        $gameVariables.setValue(4,error.response.status);
      });

    }


//=====================================================
    getAssignments = function(){
      
      console.log("getAssignments has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/assignments', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getAssignmentScoreComposition = function(){
      
      console.log("getAssignmentScoreComposition has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/assignment-score-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }


    getLevels = function(){   
      console.log("getLevels has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/levels', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getLevelQuestionComposition = function(){   
      console.log("getLevelQuestionComposition has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/level-question-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getQuestion = function(){   
      console.log("getQuestion has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/questions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getUser = function(){   
      console.log("getUser has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/users', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }
    getWorld = function(){   
      console.log("getWorld has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/worlds', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getWorldQuestionComposition = function(){   
      console.log("getWorld has been called");
      console.log("Auth Header: "+'Bearer '+ bearer_token);
      axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/world-question-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log(response);
      return response.data;
    }).catch(error => {
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }


//=====================================================
    PluginManager.registerCommand("zen", "loginUser", () => {
        loginUser($gameVariables.value(usernameID), $gameVariables.value(passwordID));
        
    });

    PluginManager.registerCommand("zen", "getAssignments", () => {
      getAssignments();
      
    });

    PluginManager.registerCommand("zen", "getAssignmentScoreComposition", () => {
      getAssignmentScoreComposition();
      
    });

    PluginManager.registerCommand("zen", "getLevels", () => {
      getLevels();
    
    });

    PluginManager.registerCommand("zen", "getLevelQuestionComposition", () => {
      getLevelQuestionComposition();
      
    });

    PluginManager.registerCommand("zen", "getQuestion", () => {
      getQuestion();
      
    });

    PluginManager.registerCommand("zen", "getUser", () => {
      getUser();
      
    });

    PluginManager.registerCommand("zen", "getWorld", () => {
      getWorld();
      
    });

    PluginManager.registerCommand("zen", "getWorldQuestionComposition", () => {
      getWorldQuestionComposition();
      
    });


})();