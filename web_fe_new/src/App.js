import React from 'react';
import './style.css';
import SideBar from './components/SideBar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Play from './components/Play/play';
import CreateQuestions from './components/CRUD/create-questions';
import ReadQuestions from './components/CRUD/read-questions';
import UpdateQuestions from './components/CRUD/update-questions';
import DeleteQuestions from './components/CRUD/delete-questions';
  
function App() {
return (
    <Router>
    <SideBar />
    <Routes>
        <Route path='/play' element={<Play />} />
        <Route path='/create' element={<CreateQuestions/>} />
        <Route path='/read' element={<ReadQuestions/>} />
        <Route path='/update' element={<UpdateQuestions/>} />
        <Route path='/delete' element={<DeleteQuestions/>} />
    </Routes>
    </Router>
);
}
  
export default App;