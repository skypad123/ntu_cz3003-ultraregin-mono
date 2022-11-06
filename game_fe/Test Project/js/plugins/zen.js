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
 * @command uploadScores
 * @desc uploadScores
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
    var isLoggedIn;


    usernameID = 19;
    passwordID = 20;
    returnID = 18;
    bearer_token = "970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5";
    //
    const axios = require('axios').default;

    setIsLoggedIn = function(loginState){
      isLoggedIn = loginState;
      console.log("setIsloggedIn:",isLoggedIn);
    }
    getIsLoggedIn = function(){
      console.log("getIsloggedIn:",isLoggedIn);
      return isLoggedIn;
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
      //$gameSystem.questionData = questionResult;
      $gameSystem.scoreData = scoreResult;
      $gameSystem.userData = userResult;
      $gameSystem.worldData = worldResult;
      $gameSystem.worldLevelCompositionData = worldLevelCompositionResult; 

      console.log("==Verifying data==");
      console.log($gameSystem.assignmentData);
      console.log($gameSystem.assignmentScoreCompositionData);
      console.log($gameSystem.levelData); 
      console.log($gameSystem.levelQuestionCompositionData); 
      //console.log("Question data",$gameSystem.questionData);
      console.log($gameSystem.scoreData);
      console.log($gameSystem.userData);
      console.log($gameSystem.worldData);
      console.log($gameSystem.worldLevelCompositionData); 
      // let randomArrayUsed = [];
      // let questionList = [];
      // let maxRand = $gameSystem.questionData.data.length;
      // let jsonData = {};
      // while(randomArrayUsed.length < 9){
      //   let randomIndex = Math.floor(Math.random() * maxRand);
      //   if(!randomArrayUsed.includes(randomIndex)){
      //     console.log($gameSystem.questionData.data[randomIndex]);
      //     jsonData = {
      //       description: $gameSystem.questionData.data[randomIndex].attributes.description,
      //       fake_answers: ($gameSystem.questionData.data[randomIndex].attributes.fake_answers).split(','),
      //       actual_answer: $gameSystem.questionData.data[randomIndex].attributes.actual_answer,
      //     }
      //     console.log(jsonData);
      //     randomArrayUsed.push(randomIndex);
      //     questionList.push(jsonData);
      //   }
        
      // }
      $gameSystem.internalQuestionData = questionResult;
      console.log($gameSystem.internalQuestionData);

  }

    registerUser = function(username, email, password){
        console.log("registerUser has been called");
        axios.post('https://ultraregin-be-vs7vz.ondigitalocean.app/api/auth/local/register', {
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

    loginUser = async function(username, password){
        console.log("loginUser has been called");
        await axios.post('https://ultraregin-be-vs7vz.ondigitalocean.app/api/auth/local/', {
        'identifier': username,
        'password': password
      }).then(async response => {
        console.log(response);
        isStudent = await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/users/'+response.data.user.id+'?populate=*', {
          headers: {
            Authorization:
              'Bearer '+ bearer_token,
          }});
        console.log(isStudent);
        setIsLoggedIn(true);
        if(isStudent.data.role.name === "Students"){
          setIsLoggedIn(true);
          $gameSystem.loginData = response.data.user;
        }else{
          setIsLoggedIn(false);
        }
        return response.data.jwt;
      }).catch(error => {
        console.log('An error occurred:', error);
        setIsLoggedIn(false);
      });

    }


//=====================================================
      uploadScores = async function(){
        //console.log(levelid, playerid, questions_attempted, questions_correct, assignment_score_composition);
        console.log("uploadScores has been called");
        console.log(bearer_token);

        const bodyparams = JSON.stringify({
          "data": {
            "level": 6,
            "player": $gameSystem.loginData.id,
            "questions_attempted": 9,
            "questions_correct": 9
          }
        });
        
        const bearerparams = {
            "Authorization": 'Bearer '+ bearer_token,
            "Content-Type": "application/json" 
        };

        const reqOptions = {
          url: "https://ultraregin-be-vs7vz.ondigitalocean.app/api/scores",
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/assignments', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/assignment-score-compositions', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/levels', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/level-question-compositions', {
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

    // getQuestion = async function(){   
    //   console.log("getQuestion has been called");
    //   await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/questions', {
    //   headers: {
    //     Authorization:
    //       'Bearer '+ bearer_token,
    //   },
    // }).then(response => {
    //   console.log("RESPONSE: "+response.status);
    //   questionResult = response.data;
    //   return response.data;
    // }).catch(error => {
    //   console.log("RESPONSE: "+error.response.status);
    //   console.log('An error occurred:', error.response);
    //   loginID = "";
    //   $gameVariables.setValue(4,error.response.status);
    // });

    // }

    getQuestion = async function(){   
      console.log("getQuestion has been called, loading world 1");
    levelList = []
    temp = []
    tempQuestionList = []
    worldquestioncomposition = await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/world-question-compositions?populate=*', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    });
    console.log(worldquestioncomposition);
    for (let i = 0; i < worldquestioncomposition.data.data.length; i++){
      if(worldquestioncomposition.data.data[i].attributes.world.data.id == 1){
        levelList[worldquestioncomposition.data.data[i].attributes.level_position -1] = worldquestioncomposition.data.data[i].attributes.level.data.id;
      }
    }
    console.log(levelList);

    questionQuery = await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/level-question-compositions?populate=*', {
      headers: {
        Authorization:
          'Bearer '+ bearer_token,
      },
    });
    console.log(questionQuery.data.data);
    arrayCopy = [...questionQuery.data.data];
    //console.log(arrayCopy[11].attributes.level.data.id);
    // for (let i = 0; i < arrayCopy.length; i++){
    //   console.log("id,",i);
    //   console.log(arrayCopy[i].attributes.level.data.id);
    // }
    temp[0] = [...arrayCopy.filter(x => x.attributes.level.data != null && x.attributes.level.data.id == levelList[0])];
    temp[1] = [...arrayCopy.filter(x => x.attributes.level.data != null && x.attributes.level.data.id == levelList[1])];
    temp[2] = [...arrayCopy.filter(x => x.attributes.level.data != null && x.attributes.level.data.id == levelList[2])];
    
    console.log(temp);
    //1st level
    console.log(temp[0].find(element => element.attributes.question_position == 1));

    for(let levelIndex = 0; levelIndex < temp.length; levelIndex++){
      for(let questionIndex = 0; questionIndex < 3; questionIndex++){
        console.log((levelIndex*3)+(questionIndex));
        item = temp[levelIndex].find(element => element.attributes.question_position == (questionIndex+1))
        jsonData = {
          description: item.attributes.question.data.attributes.description,
          fake_answers: (item.attributes.question.data.attributes.fake_answers).split(','),
          actual_answer: item.attributes.question.data.attributes.actual_answer,
        }
        tempQuestionList[(levelIndex*3)+(questionIndex)] = jsonData
      }
    }
    questionResult = tempQuestionList;
    console.log(questionResult);

    //console.log(questionQuery.data.data.filter(x => x.level.data.id == 6));
    //   await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/questions', {
    //   headers: {
    //     Authorization:
    //       'Bearer '+ bearer_token,
    //   },
    // }).then(response => {
    //   console.log("RESPONSE: "+response.status);
    //   questionResult = response.data;
    //   return response.data;
    // }).catch(error => {
    //   console.log("RESPONSE: "+error.response.status);
    //   console.log('An error occurred:', error.response);
    //   loginID = "";
    //   $gameVariables.setValue(4,error.response.status);
    // });

    }





    getScore = async function(){   
      console.log("getScore has been called");
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/scores', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/users', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/worlds', {
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
      await axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/world-question-compositions', {
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

    PluginManager.registerCommand("zen", "uploadScores", () => {
      uploadScores();
      
    });


})();
