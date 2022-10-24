import React , {useState}from 'react';
import './style.css';
import SideBar from './components/SideBar';
import {Routes, Route}
from 'react-router-dom';
import Play from './components/Play/play';
import Login from './components/Login/login';
import CreateQuestions from './components/CRUD/create-questions';
import ReadQuestions from './components/CRUD/read-questions';
import UpdateQuestions from './components/CRUD/update-questions';
import DeleteQuestions from './components/CRUD/delete-questions';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));

function useLoginInfo(){
    const [role, setRole] = useState('');
    const nav = useNavigate();
    
    async function loginViaLocal(identifier,password){

        async function localLoginToServer(){
            axios.request({
                method: 'post',
                url: `${process.env.REACT_APP_BE_URL}/auth/local`,
                headers:{
                    Authorization: `Bearer ${process.env.REACT_APP_BE_KEY}`
                },
                data:{
                    identifier: identifier.trim(),
                    password: password
                }    
            }).then((data)=>{
                switch(data.status){
                    case 200 :
                        console.log(data);
                        return data;
                    default :
                        throw data;
                }
            });
        }


        try{
           await localLoginToServer(); 
        }catch(e){
            console.log(e);
        }
        
    }

    async function loginViaFacebook(){
        // async function FacebookLoginToServer(){
        //     axios.request({
        //         method: 'get',
        //         url: `${process.env.REACT_APP_BE_URL}/connect/facebook`,
        //         headers:{
        //             Authorization: `Bearer ${process.env.REACT_APP_BE_KEY}`
        //         },    
        //     }).then((data)=>{
        //         switch(data.status){
        //             case 200 :
        //                 console.log(data);
        //                 return data;
        //             default :
        //                 throw data;
        //         }
        //     });
        // }

        // try{
        //     nav(`/facebook`);
        //     //await FacebookLoginToServer(); 
        //  }catch(e){
        //      console.log(e);
        //  }

    }


    return {role, loginViaLocal, loginViaFacebook};
}

function App() {

    const {role, loginViaLocal, loginViaFacebook}= useLoginInfo();

    function StudentApp(){
        return (
            <>
            <SideBar />
            <Routes>
                <Route path='/play' element={<Play />} />
                <Route path='/create' element={<CreateQuestions/>} />
                <Route path='/read' element={<ReadQuestions/>} />
                <Route path='/update' element={<UpdateQuestions/>} />
                <Route path='/delete' element={<DeleteQuestions/>} />
            </Routes>
            </>
        );
    }


    function ProfessorApp(){
        return (
            <>
            <SideBar />
            <Routes>
                <Route path='/play' element={<Play />} />
                <Route path='/create' element={<CreateQuestions/>} />
                <Route path='/read' element={<ReadQuestions/>} />
                <Route path='/update' element={<UpdateQuestions/>} />
                <Route path='/delete' element={<DeleteQuestions/>} />
            </Routes>
            </>
        );
    }

    function LoginPage(){
        return (
            <>
                <Login onGoogleSignIn={()=>{}} onFacebookSignIn={loginViaFacebook} onEmailSignIn={loginViaLocal}/>
                <Routes>
                    <Route path='/facebook' component={() => { 
                        window.location.replace(); 
                        return null;
                    }}/>
                </Routes>
            </>
        );
    }


    switch(role){
        case "professor":
            return ProfessorApp();
        case "student":
            return StudentApp();
        default:
            return LoginPage();
    }
    


}
  
export default App;