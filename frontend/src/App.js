import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import { Route, Routes } from 'react-router-dom';
import PrivetRouterDoc from './components/PrivetRouteDoc';
import PrivetRouterPai from './components/PrivetRouterPai';
import Navbar from './components/Navbar';
import Booking from './components/Booking';
import Home from './components/Home';
function App() {
  const isAuthenticated=sessionStorage.getItem('token');
  return (
    <div>
    <Navbar isAuthenticated={isAuthenticated}/>
      <Routes>
      <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/doctor-dashboard" element={<PrivetRouterDoc><DoctorDashboard/></PrivetRouterDoc>} />
          <Route path="/patient-dashboard" element={<PrivetRouterPai><PatientDashboard/></PrivetRouterPai>} />
          <Route path="/booking" element={<PrivetRouterPai><Booking/></PrivetRouterPai>} />
      </Routes>
      </div>
  );
}

export default App;
