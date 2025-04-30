import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import LandingPage from './components/LandingPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthForm mode="signup" />} />
        <Route path="/" element={<AuthForm mode="login" />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
