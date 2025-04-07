import React from 'react';
import { Outlet } from 'react-router-dom';
import JobSeekerShell from '../pages/job-seeker/JobSeekerShell';
import Navbar from '../components/Navbar';

const JobSeekerLayout = () => {
  return (
    <>
      <Navbar />
      <JobSeekerShell>
        <Outlet />
      </JobSeekerShell>
    </>
  );
};

export default JobSeekerLayout; 