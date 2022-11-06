import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";

const SummaryReportStudent = () => {
    const [searchparams] = useSearchParams();
    const navigate = useNavigate();
    // const [scoreData, setScoreData] = useState('');
    const [chartData, setChartData] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [allStudentScoreData, setAllStudentScoreData] = useState('');
    const [studentScoreData, setStudentScoreData] = useState([]);
    const [studentNames, setStudentNames] = useState([]);
    const [selectedStudentID, setSelectedStudentID] = useState('0');

    useEffect(() => {
        // getStudentScoreData();
        getStudentNames();
        getStudentAssignmentData();
        // getStudentScoreData(allStudentScoreData);
    }, );

    const getStudentNames = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/users?populate=role', {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    // sessionStorage.getItem("jwt")
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
        console.log("THIS", response.data)
        const allStudentNames = response.data;
        setStudentNames(allStudentNames);
        })
    }

    const handleStudentSelected = (studentUsername) => {
        navigate({
            pathname: '/summary-report/student',
            search: createSearchParams({
                user: studentUsername
            }).toString()
        });
    }


    const getStudentAssignmentData = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/scores?sort=level.description&populate=player%2C%20level', {
            headers:{
                    // contentType: 'application/json',
                    Authorization:
                        "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
                }, 
            })
            .then ((response) => {
                console.log("student response is", response.data.data)
                const scoreData = response.data.data
                setAllStudentScoreData(scoreData)

                const studentScoreData = allStudentScoreData.filter(
                    studentScore => studentScore.attributes.player.data.attributes.username === searchparams.get('user')
                )
                setStudentScoreData(studentScoreData);
            })
            .catch(error => console.log(error))
        }

        const data = studentScoreData.map(student => {
            return {world: student.attributes.level.data.attributes.name, score:student.attributes.questions_correct}
        })
        
    return (
        <section>
            <div class="container">
                <div class="row">
                    <h2 class="mt-3">Summary Report - {searchparams.get("user")} </h2>
                </div>

                <div class="card border-0">
                    <div>
                        <select id="student-select" class="dropdown-box" onChange={(e) => {setSelectedStudentID(e.target.value); handleStudentSelected(e.target.value) }}> 
                            <option disabled selected> {searchparams.get("user")} </option>
                            {
                                studentNames.map(student => {
                                    return (
                                        (student.role.name == "Students" ?
                                        <option value={student.username}> {student.username} </option> : null
                                        )
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    

                <ResponsiveContainer width='90%' height ={600}>
                   <BarChart margin={{top:50}} data={data}>
                        <Bar dataKey="score" fill="#285474" />
                        <XAxis dataKey="world" label={{value: 'world', dy:9.5}} />
                        <YAxis label={{value: 'score', angle:-90, position: 'insideLeft'}} /> 
                        <Text x="300" y="100" fontSize="36" fontWeight="bold"> No.of students per score </Text>
                   </BarChart>
                </ResponsiveContainer>
                </div>


            </div>
        </section>

        );
}

export default SummaryReportStudent;