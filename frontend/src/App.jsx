import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthForm mode="signup" />} />
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/home" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
};

export default App;
