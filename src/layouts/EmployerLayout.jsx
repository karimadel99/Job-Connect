// EmployerLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EmployerShell from '../pages/employer/EmployerShell'; // formerly EmployerDashboard

const EmployerLayout = () => {
  return (
    <>
      <Navbar />
      <EmployerShell>
        <Outlet />
      </EmployerShell>
      <Footer/>
    </>
  );
};

export default EmployerLayout;
