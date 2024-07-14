import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Track from './Components/TrackingScreen';
import Postlogin from './Components/Postlogin';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Track" element={<Track />} />
          <Route path="/Postlogin" element={<Postlogin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;