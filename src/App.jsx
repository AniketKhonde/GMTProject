import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Track from './Components/TrackingScreen';
import Postlogin from './Components/Postlogin';
import Onboarding1 from './Components/Onboarding1';
import Onboarding_2 from './Components/Onboarding_2'
import Onboarding3 from './Components/Onboarding3';

import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Onboarding1 />} />
          <Route path="/onboarding_2" element={<Onboarding_2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/track" element={<Track />} />
          <Route path="/postlogin" element={<Postlogin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
