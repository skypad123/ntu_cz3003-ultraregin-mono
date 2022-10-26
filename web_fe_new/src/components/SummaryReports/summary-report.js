import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Text } from 'recharts';
import { useNavigate,createSearchParams } from 'react-router-dom';

const SummaryReport = () => {
    const navigate = useNavigate();
    const [scoreData, setScoreData] = useState('');
    const [chartData, setChartData] = useState([]);
    const [chartValues, setChartValues] = useState([]);
    const [studentNames, setStudentNames] = useState([]);
    const [selectedStudentID, setSelectedStudentID] = useState('0');

    useEffect(() => {
        getStudentNames();
        getAllScoreData();
    }, );

    const getStudentNames = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/users', {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
        // console.log(response.data)
        const allStudentNames = response.data;
        setStudentNames(allStudentNames);
        })
    }

    const handleStudentSelected = (studentUsername) => {
        navigate({
            pathname: '/summary-report-student',
            search: createSearchParams({
                user: studentUsername
            }).toString()
        });
    }

    const getAllScoreData = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/scores', {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
            console.log("score response is, " , response)
            const allScoreData = response.data.data;
            setScoreData(allScoreData);

            const chartDataArray = scoreData.map (scores => 
                Math.round((scores.attributes.questions_correct / scores.attributes.questions_attempted) * 100).toFixed(0)
            )
            // console.log("array is", chartDataArray)
            
            setChartData(chartDataArray);
            console.log("chart data array is ", chartDataArray)
            setChartValues(chartDataArray.filter((item, i, ar) => ar.indexOf(item)===i).sort((a,b) => a-b ));
            console.log('chart values is ', chartValues)
            // console.log('chart values, ', chartValues)
        })
        .catch(error => console.log(error));
        
    }


    const data =  chartValues.map(value => {
        return {name: value, students: chartData.filter(x => x === value).length}
    })

        
    return (
        <section>
            <div class="container">
                <div class="row">
                    <h2 class="mt-3">Summary Report - Overview </h2>
                </div>

                <div class="card border-0">
                    <div>
                        <select id="student-select" class="dropdown-box" onChange={(e) => {setSelectedStudentID(e.target.value); handleStudentSelected(e.target.value) }}> 
                            <option disabled selected> Select student </option>
                            {
                                studentNames.map(student => {
                                    return (
                                        <option value={student.username}> {student.username} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    

                <ResponsiveContainer width='90%' height ={580}>
                   <BarChart margin={{top:30}} data={data}>
                        <Bar dataKey="students" fill="#285474" />
                        <XAxis dataKey="name" label={{value: 'Score Percentage', dy:9.5}} />
                        <YAxis label={{value: 'No. of Students', angle:-90, position: 'insideLeft', dx:3}} /> 
                        <Text x="300" y="100" fontSize="36" fontWeight="bold"> No.of students per score </Text>
                   </BarChart>
                </ResponsiveContainer>
                </div>

            </div>
        </section>

        );
}

export default SummaryReport;