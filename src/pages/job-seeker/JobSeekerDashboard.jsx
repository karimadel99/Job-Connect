import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import AppliedJobs from './AppliedJobs';
import FavoriteJobs from './FavoriteJobs';
import Settings from './Settings';

const JobSeekerDashboard = () => {
  return (
    <Routes>
      <Route path="/overview" element={<Overview />} />
      <Route path="/applied-jobs" element={<AppliedJobs />} />
      <Route path="/favorite-jobs" element={<FavoriteJobs />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Overview />} />
    </Routes>
  );
};

export default JobSeekerDashboard;