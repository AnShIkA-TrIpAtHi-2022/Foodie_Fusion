import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<AuthForm />} />
        <Route path='/login' element={<LoginPage />} />
        
        
      </Routes>
    </Router>
  );
};

export default App;
