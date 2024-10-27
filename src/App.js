import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageDetail from './components/PageDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/japanese-study-pages">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page/:id" element={<PageDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
