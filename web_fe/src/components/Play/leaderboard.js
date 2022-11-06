import React, { useEffect, useState } from "react";
import axios from 'axios';

const Leaderboard = () => {
    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        getAllScoreData();
    }, []);

    const getAllScoreData = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/scores?sort=questions_correct%3Adesc&populate=player%2C%20level', {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
            console.log("score response is, " , response.data.data)
            const allScoreData = response.data.data;
            setScoreData(allScoreData);
        })
        .catch(error => console.log(error));
        
    }

    return (
        <section>
            <div class="container">
                <div class="row">
                    <h2 class="mt-3"> Leaderboard </h2>
                </div>

                <div class="card border-0">
                    <table>
                        <tr>
                            <th> Rank </th>
                            <th> Student </th>
                            <th> World </th>
                            <th> Score </th>
                        </tr>
                       {
                        scoreData.map((score, index) => {
                            console.log(score)
                            return (
                                <tr>
                                    <td> {index + 1} </td>
                                    <td> {score.attributes.player.data.attributes.username} </td>
                                    <td> {score.attributes.level.data.attributes.name} </td>
                                    <td> {score.attributes.questions_correct} </td>
                                </tr>
                            )
                        })
                       }
                    </table>
                </div>
            </div>
        </section>
    )
}

export default Leaderboard;