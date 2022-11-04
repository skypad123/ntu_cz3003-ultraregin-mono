import React, { useEffect, useState } from "react";
import { useNavigate, createSearchParams} from 'react-router-dom';
import axios from 'axios';

const Challenge = () => {
    const navigate = useNavigate();
    const [studentNames, setStudentNames] = useState([]);
    const [selectedStudentID, setSelectedStudentID] = useState('0');
    const [world, setWorld] = useState();
    const [level, setLevel] = useState();

    useEffect(() => {
        getStudentNames();
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

    

return (
    <section>
        <div class="container">
            <div class="row">
                <h2 class="mt-3">Challenge Others</h2>
            </div>

            <div class="user-details-container">
                <div class="world-btns">
                    <label for="inputName" class="form-label">World:</label>
                    <div class="input-group-btn">
                        <input type="radio" id="world1" name="world" value="1" onChange = {e => setWorld(e.target.value)} />
                        <label for="world1">1</label>
                        <input type="radio" id="world2" name="world" value="2" onChange = {e => setWorld(e.target.value)} />
                        <label for="world2">2</label>
                        <input type="radio" id="world3" name="world" value="3" onChange = {e => setWorld(e.target.value)} />
                        <label for="world3">3</label>
                        <input type="radio" id="worldCustom" name="world" value="4" onChange = {e => setWorld(e.target.value)} />
                        <label for="worldCustom">Custom</label>
                    </div>
                </div>

                <div class="world-btns">
                    <label for="inputName" class="form-label">Level:</label>
                    <div class="input-group-btn">
                        <input type="radio" id="level1" name="level" value="1" onChange = {e => setLevel(e.target.value)} />
                        <label for="level1">1</label>
                        <input type="radio" id="level2" name="level" value="2" onChange = {e => setLevel(e.target.value)} />
                        <label for="level2">2</label>
                        <input type="radio" id="level3" name="level" value="3" onChange = {e => setLevel(e.target.value)} />
                        <label for="level3">3</label>
                    </div>
                </div>

                <div style={{marginTop: '20px', display:'flex', justifyContent:"center", width: '90%'}}>
                    <select id="student-select" class="dropdown-box" onChange={(e) => {setSelectedStudentID(e.target.value) }}> 
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

                <div class="bottom-btns ml-3">
                        <input type="button" class="btn btn-danger float-end" id="btn-back" value="Cancel" />
                        <input type="button" class="btn btn-primary" id="btn-ok-create" value="Done"  /> 
                </div>
            </div>
        </div>
    </section>
    );
}

export default Challenge;