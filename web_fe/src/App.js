import React , {useEffect, useState}from 'react';
import './style.css';
import { StudentSideBar, ProfessorSideBar } from './components/SideBar';
import {Routes, Route, useLocation, useNavigate}
from 'react-router-dom';
import Login from './components/Login/login';
import LandingPage from './components/Main/landing-page'
import SummaryReport from './components/SummaryReports/summary-report';
import SummaryReportStudent from './components/SummaryReports/summary-report-student';
import Play from './components/Play/play';
import CreateQuestions from './components/CRUD/create-questions';
import CreateQuestionsStudent from './components/CRUD/create-questions-students';
import ReadQuestions from './components/CRUD/read-questions';
import ReadQuestionsStudent from './components/CRUD/read-questions-students';
import ChooseUpdateQuestions from './components/CRUD/choose-update-questions';
import ChooseUpdateQuestionsStudent from './components/CRUD/choose-update-questions-students';
import ChooseDeleteQuestions from './components/CRUD/choose-delete-questions';
import UpdateQuestion from './components/CRUD/update-question';
import UpdateQuestionStudent from './components/CRUD/update-question-student';
import Challenge from './components/Play/challenge'
import Leaderboard from './components/Play/leaderboard';
import axios from 'axios';
import { FaWindows } from 'react-icons/fa';


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
           console.log(userData.data.role.type);
        //    nav('/')
           (userData.data.role.type === "students") ? nav("/leaderboard") : nav("/summary-report");
            
        }catch(e){
            window.alert("Wrong input!");
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
            <StudentSideBar />
            <Routes>
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path='/create-student' element={<CreateQuestionsStudent/>} />
                <Route path='/read-student' element={<ReadQuestionsStudent/>} />
                <Route path='/update-questions-student' element={<ChooseUpdateQuestionsStudent/>} />
                <Route path='/update-questions-student/qn' element={<UpdateQuestionStudent/>} />
                {/* <Route path='/choose-delete-questions' element={<ChooseDeleteQuestions/>} /> */}
                <Route path='/challenge' element={<Challenge/>} />
            </Routes>
            </>
        );
    }


    function ProfessorApp(){
        return (
            <>
            <ProfessorSideBar />
            <Routes>
                <Route path='/summary-report' element={<SummaryReport />} />
                <Route path='/summary-report/student' element={<SummaryReportStudent />} />
                <Route path='/create' element={<CreateQuestions/>} />
                <Route path='/read' element={<ReadQuestions/>} />
                <Route path='/update-questions' element={<ChooseUpdateQuestions/>} />
                <Route path='/update-questions/qn' element={<UpdateQuestion/>} />
                <Route path='/choose-delete-questions' element={<ChooseDeleteQuestions/>} />
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