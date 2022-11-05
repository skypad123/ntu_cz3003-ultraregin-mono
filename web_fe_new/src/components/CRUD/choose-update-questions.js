import React, { useEffect, useState } from "react";
import axios from 'axios';
import { createSearchParams, useNavigate } from 'react-router-dom';

const ChooseUpdateQuestions = () => {
    const [questionData, setQuestionData] = useState('');
    const navigate = useNavigate();
    const [questionID, setQuestionID] = useState('');

    useEffect(() => {
        getAllQuestionData();
    }, []);

    const getAllQuestionData = () => {
        axios.get('https://ultraregin-be-vs7vz.ondigitalocean.app/api/questions?sort=name', {
            headers:{
                // contentType: 'application/json',
                Authorization:
                    "Bearer 970b635e2c091a14bec6c5035e75577a6d2ade6e67c10f118e0ab4a880eb941297850b921e24723197effddef172a60f8e669ac6aeaf573ad57a4aa6dfcc4ac6965f3781053eb1fe06e2e8f19ad8bc01c470cceb3afd6fb2525dcbfbaa4bb16369357f78ae1bb750f04f5a30ec08986a4a88bebe2e01d861ba12a78ab1edb9a5",
            }, 
        })
        .then ((response) => {
            console.log(response.data.data)
            const allQuestionData = response.data.data;
            setQuestionData(allQuestionData);
        })
        .catch(error => console.log(error));
        
    }

    const handleQuestionUpdate = (questionID) => {
        setQuestionID(questionID)
        console.log("quesitonID is ", questionID.toString())

        navigate({
            pathname: '/update-questions/qn',
            search: createSearchParams({
                id: questionID.toString()
            }).toString()
        });
    }

    return (
        <section>
          <div class="container">
              <div class="row">
                <h2 class="mt-3">Update Questions</h2>
                <h3 style={{color: '#285474'}}> Choose a question to update</h3>
              </div>

              <div class="question-details-container">
                    {
                        (questionData.length > 0) ? questionData.map(question => {
                            // console.log(question.id)
                            return (
                                <div class="question-container" id={question.id} onClick={() => handleQuestionUpdate(question.id)}>
                                    <div class="heading"> 
                                        <h3 style={{marginRight:'10px'}}>World:  {question.attributes.name.split(",")[0] === "4" ? "Custom" : question.attributes.name.split(",")[0]} </h3> 
                                        <h3 style={{marginRight:'10px'}}>Level: {question.attributes.name.split(",")[1]} </h3>
                                        <h3 style={{marginRight:'10px'}}>Question No.: {question.attributes.name.split(",")[2]} </h3>
                                    </div>
                                    <h3>Question: {question.attributes.description}</h3>
                                    <h3>Options:</h3>
                                    <table> 
                                        <tr>
                                            <th> Option </th>
                                            <th> Value </th>
                                        </tr>
                                        <tr>
                                            <td> A </td>
                                            <td> {question.attributes.fake_answers.split(",")[0]} </td>
                                        </tr>
                                        <tr>
                                            <td> B </td>
                                            <td> {question.attributes.fake_answers.split(",")[1]} </td>
                                        </tr>
                                        <tr>
                                            <td> C </td>
                                            <td> {question.attributes.fake_answers.split(",")[2]} </td>
                                        </tr>
                                        <tr>
                                            <td> D </td>
                                            <td> {question.attributes.fake_answers.split(",")[3]} </td>
                                        </tr>
                                    </table>
                                    <h3>Answer: {question.attributes.actual_answer} </h3>
                                </div>
                            )
                        })
                        : <h3> No questions to display</h3> 
                    }

                    {/* <div class="bottom-btns ml-3">
                        <input type="button" class="btn btn-danger float-end" id="btn-back" value="Cancel" />
                        <input type="button" class="btn btn-primary" id="btn-ok-create" value="Done" />
                    </div> */}
                </div>
          </div>
    </section>

);
}
export default ChooseUpdateQuestions;