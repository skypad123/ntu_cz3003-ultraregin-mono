import React , {useEffect, useState}from 'react';
import './style.css';
import SideBar from './components/SideBar';
import {Routes, Route, useLocation, useNavigate}
from 'react-router-dom';
import Play from './components/Play/play';
import Login from './components/Login/login';
import CreateQuestions from './components/CRUD/create-questions';
import ReadQuestions from './components/CRUD/read-questions';
import UpdateQuestions from './components/CRUD/update-questions';
import DeleteQuestions from './components/CRUD/delete-questions';
import axios from 'axios';


function useQuery(){
    const {search} = useLocation();
    return React.useMemo(()=> new URLSearchParams(search),[search]);
}


function useLoginInfo(){
    const [onFirstLoad, setOnFirstLoad] = useState(true);
    const [role, setRole] = useState('');
    const queryParams = useQuery();
    const nav = useNavigate();

    async function loginViaLocal(identifier,password){

        async function localLoginToServer(){
            return axios.request({
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
           const jwtData = await localLoginToServer();
           console.log(jwtData.data.jwt);
           const userData  = await getUserRoleData(jwtData.data.jwt);
           sessionStorage.setItem("jwt", userData.jwt);
           setRole(userData.data.role.type);
           nav("/"); 
        }catch(e){
            console.log(e);
        }  
    }

    function paramsData(){
        return {
            "access_token" :  queryParams.get("access_token"),
            "raw%5Baccess_token%5D" : queryParams.get("raw%5Baccess_token%5D"),
            "raw%5Btoken_type%5D" : queryParams.get("raw%5Btoken_type%5D"),
            "raw%5Bexpires_in%5D" : queryParams.get("raw%5Bexpires_in%5D"),
        };
    }

    async function authProviderCallback(data){
        async function getUserData(){
            return axios.request({
                method: 'get',
                url: `${process.env.REACT_APP_BE_URL}/auth/facebook/callback`,
                params:  data
            }).then((data)=>{
                switch(data.status){
                    case 200 :
                        //console.log(data);
                        return data;
                    default :
                        throw data;
                }
            });
        }

        try{
            const jwtData = await getUserData();
            const userData  = await getUserRoleData(jwtData.data.jwt); 
            sessionStorage.setItem("jwt", userData.data.jwt);
            setRole(userData.data.role.type);
            nav("/");
        }catch(e){
            console.log(e);
        }

    }

    async function getUserRoleData(jwtToken){
        return axios.request({
            method: 'get',
            url: `${process.env.REACT_APP_BE_URL}/users/me`,
            headers:{
                Authorization: `Bearer ${jwtToken}`
            },
            params:  {
                "populate": "role"
            }
        }).then((data)=>{
            switch(data.status){
                case 200 :
                    //console.log(data);
                    return data;
                default :
                    throw data;
            }
        });
    }

    useEffect(() => {
        if (onFirstLoad){
            const data = paramsData();
            if(data.access_token != null) {
                authProviderCallback(data);
            }
            setOnFirstLoad(!onFirstLoad);
        }
    });

    return {role, loginViaLocal};
}

function App() {

    const {role, loginViaLocal} = useLoginInfo();

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
                <Login onEmailSignIn={loginViaLocal}/>
                {/* <Routes>
                    <Route path='/facebook' component={() => { 
                        window.location.replace(); 
                        return null;
                    }}/>
                </Routes> */}
            </>
        );
    }


    switch(role){
        case "professors":
            return ProfessorApp();
        case "students":
            return StudentApp();
        default:
            return LoginPage();
    }
    


}
  
export default App;