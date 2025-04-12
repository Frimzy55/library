// src/App.js
import React, { Children } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import BooksManagement from './BooksManagement';
import ITPage from './ITPage';
import AdminMain from './AdminMain';
//import MainPage1 from './MainPage1';
import ChildrenMain from './ChildrenMain';
import AdultMain from './AdultMain';
import HrMainpage from './HrMainpage';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<AdultMain />} />
        <Route path='/admin' element={<AdminMain/>}/>
        
        <Route path='/main2' element={<ChildrenMain/>}/>
        <Route path='/main3' element={<ITPage/>}/>
        <Route path='/hr' element={<HrMainpage/>}/>
        
        
        <Route path="books-management" element={<BooksManagement />} />
      </Routes>
    </Router>
  );
}

export default App;  