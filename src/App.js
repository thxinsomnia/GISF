import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Pattern from './components/Pattern';
import './App.css';
import LoginPage from './Login/LoginPage';
import RegisterPage from './Register/RegisterPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000); // 2 seconds loading
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <>
        <Pattern />
        <Loader />
      </>
    );
  }

  return (
     <>
    <Pattern />
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
