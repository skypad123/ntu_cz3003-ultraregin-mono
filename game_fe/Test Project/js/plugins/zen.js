/*:
 * @target MZ
 * @plugindesc Zen's custom plugin
 * @author Zen
 *
 * @help Zen.js
 *
 * This plugin calls Strapi Rest API 
 * 
 * @command loadWorldData
 * @desc loadWorldData
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
 * @command saveVerify
 * @desc saveVerify
 * 
 */

(() => {
    //global stuff
    var loginID = "";



    var assignmentResult;
    var assignmentScoreCompositionResult;
    var levelResult;
    var levelQuestionCompositionResult;
    var questionResult;
    var scoreResult;
    var userResult;
    var worldResult;
    var worldLevelCompositionResult;
    


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

    loadWorldData = async function(){
      console.log("loadWorldData is called");

      await getAssignments();
      //console.log("Assignment Result");
      //console.log(assignmentResult);

      await getAssignmentScoreComposition();
      //console.log("Assignment Score Composition Result");
      //console.log(assignmentScoreCompositionResult);

      await getLevels();
      //console.log("Level Result");
      //console.log(levelResult);

      await getLevelQuestionComposition();
      //console.log("Level question composition Result");
      //console.log(levelQuestionCompositionResult);
  
      await getQuestion();
      //console.log("Question Result");
      //console.log(questionResult);

      await getScore();
      //console.log("Score Result");
      //console.log(scoreResult);

      await getUser();
      //console.log("User Result");
      //console.log(userResult);

      await getWorld();
      //console.log("World Result");
      //console.log(worldResult);

      await getWorldQuestionComposition();
      //console.log("Score Result");
      //console.log(worldLevelCompositionResult);

      //saves data to save data
      $gameSystem.assignmentData = assignmentResult;
      $gameSystem.assignmentScoreCompositionData = assignmentScoreCompositionResult;
      $gameSystem.levelData = levelResult; 
      $gameSystem.levelQuestionCompositionData = levelQuestionCompositionResult; 
      $gameSystem.questionData = questionResult;
      $gameSystem.scoreData = scoreResult;
      $gameSystem.userData = userResult;
      $gameSystem.worldData = worldResult;
      $gameSystem.worldLevelCompositionData = worldLevelCompositionResult; 

      console.log("==Verifying data==");
      console.log($gameSystem.assignmentData);
      console.log($gameSystem.assignmentScoreCompositionData);
      console.log($gameSystem.levelData); 
      console.log($gameSystem.levelQuestionCompositionData); 
      console.log($gameSystem.questionData);
      console.log($gameSystem.scoreData);
      console.log($gameSystem.userData);
      console.log($gameSystem.worldData);
      console.log($gameSystem.worldLevelCompositionData); 

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
      uploadScores = async function(levelid, playerid, questions_attempted, questions_correct, assignment_score_composition){
        console.log(levelid, playerid, questions_attempted, questions_correct, assignment_score_composition);
        console.log("uploadScores has been called");
        console.log(bearer_token);
        const bodyparams = JSON.stringify({
          "data": {
            "level": levelid,
            "player": playerid,
            "questions_attempted": questions_attempted,
            "questions_correct": questions_correct
          }
        });
        const bearerparams = {
            "Authorization": 'Bearer '+ bearer_token,
            "Content-Type": "application/json" 
        };

        const reqOptions = {
          url: "https://ultrareign-be-7mmq3.ondigitalocean.app/api/scores",
          method: "POST",
          headers: bearerparams,
          data: bodyparams,
        }

        await axios.request(reqOptions).then(response => {
          console.log("RESPONSE: ",response);
          return response.data;
        }).catch(error => {
          console.log("RESPONSE: "+error.response.status);
          console.log('An error occurred:', error);
        });

      }

    getAssignments = async function(){
      
      console.log("getAssignments has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/assignments', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: ",response);
      assignmentResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getAssignmentScoreComposition = async function(){
      
      console.log("getAssignmentScoreComposition has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/assignment-score-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      assignmentScoreCompositionResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }


    getLevels = async function(){   
      console.log("getLevels has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/levels', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      levelResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getLevelQuestionComposition = async function(){   
      console.log("getLevelQuestionComposition has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/level-question-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      levelQuestionCompositionResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getQuestion = async function(){   
      console.log("getQuestion has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/questions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      questionResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getScore = async function(){   
      console.log("getScore has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/scores', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      scoreResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getUser = async function(){   
      console.log("getUser has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/users', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      userResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }
    getWorld = async function(){   
      console.log("getWorld has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/worlds', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      worldResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

    getWorldQuestionComposition = async function(){   
      console.log("getWorld has been called");
      await axios.get('https://ultrareign-be-7mmq3.ondigitalocean.app/api/world-question-compositions', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    }).then(response => {
      console.log("RESPONSE: "+response.status);
      worldLevelCompositionResult = response.data;
      return response.data;
    }).catch(error => {
      console.log("RESPONSE: "+error.response.status);
      console.log('An error occurred:', error.response);
      loginID = "";
      $gameVariables.setValue(4,error.response.status);
    });

    }

//save data verification

    saveVerify = function(){   
      console.log("Save Verification is called");
      console.log("==Verifying data==");
      console.log($gameSystem.assignmentData);
      console.log($gameSystem.assignmentScoreCompositionData);
      console.log($gameSystem.levelData); 
      console.log($gameSystem.levelQuestionCompositionData); 
      console.log($gameSystem.questionData);
      console.log($gameSystem.scoreData);
      console.log($gameSystem.userData);
      console.log($gameSystem.worldData);
      console.log($gameSystem.worldLevelCompositionData); 
    }

//upload score


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

    PluginManager.registerCommand("zen", "saveVerify", () => {
      saveVerify();
      
    });


})();
