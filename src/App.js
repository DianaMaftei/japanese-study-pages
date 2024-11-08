import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import Lesson from './components/Lesson';
import RecapLesson from "./components/RecapLesson";
import './App.css';

function App() {
    return (
        <BrowserRouter basename="/japanese-study-pages">
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/page/:id" element={<Lesson/>}/>
                    <Route path="/recap/:id" element={<RecapLesson/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
