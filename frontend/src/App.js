import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import { Route, Routes } from 'react-router-dom';
import PrivetRouterDoc from './components/PrivetRouteDoc';
import PrivetRouterPai from './components/PrivetRouterPai';
function App() {
  return (
      <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/doctor-dashboard" element={<PrivetRouterDoc><DoctorDashboard/></PrivetRouterDoc>} />
          <Route path="/patient-dashboard" element={<PrivetRouterPai><PatientDashboard/></PrivetRouterPai>} />
      </Routes>

  );
}

export default App;
