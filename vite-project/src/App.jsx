import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './schema/Welcome.jsx'
import Register from './schema/Register.jsx'
import Login from './schema/login.jsx'
import Navbar from './schema/Navbar.jsx'
import AboutUs from './schema/AboutUs.jsx'

function App() {
  return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex-1">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </div>
      </div>
   
  );
};

export default App;


