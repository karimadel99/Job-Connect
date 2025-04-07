import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import JobSeekerRegister from './pages/JobSeekerRegister';
import EmployerRegister from './pages/EmployerRegister';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import EmployerLayout from './layouts/EmployerLayout';
import JobSeekerLayout from './layouts/JobSeekerLayout';
import NotFound from './pages/NotFound';
import FAQ from './pages/FAQ';
import PricingPage from './pages/PricingPage';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

// Existing Employer pages
import OverviewPage from './pages/employer/OverviewPage';
import PostJobPage from './pages/employer/PostJobPage';
import MyJobsPage from './pages/employer/MyJobsPage';
import SavedCandidatesPage from './pages/employer/SavedCandidatesPage';
import Settings from './pages/employer/Settings';
import JobApplicationsPage from './pages/employer/JobApplicationsPage';

// New Job Seeker pages
import FindJobs from './pages/job-seeker/FindJobs';
import FindEmployers from './pages/job-seeker/FindEmployers';
import Overview from './pages/job-seeker/Overview';
import AppliedJobs from './pages/job-seeker/AppliedJobs';
import FavoriteJobs from './pages/job-seeker/FavoriteJobs';
import JobSeekerSettings from './pages/job-seeker/Settings';

function App() {
  const { user } = useAuth();
  return (
    <>
      {/* Add Toaster component for toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          // Default toast options
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          // Custom toast options based on type
          success: {
            style: {
              background: '#1E1B4B',
              color: '#E0E7FF',
            },
            iconTheme: {
              primary: '#E0E7FF',
              secondary: '#1E1B4B',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
        }}
      />
      
      <Routes>
        {/* ----------- PUBLIC ROUTES ----------- */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route
            path="login"
            element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />}
          />
          <Route
            path="register/jobseeker"
            element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <JobSeekerRegister />}
          />
          <Route
            path="register/employer"
            element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <EmployerRegister />}
          />
          <Route path="faq" element={<FAQ />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>

        {/* ----------- EMPLOYER ROUTES ----------- */}
        <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
          <Route path="employer" element={<EmployerLayout />}>
            <Route path="dashboard" element={<OverviewPage />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="post-job" element={<PostJobPage />} />
            <Route path="my-jobs" element={<MyJobsPage />} />
            <Route path="my-jobs/:jobId/applications" element={<JobApplicationsPage />} />
            <Route path="saved-candidates" element={<SavedCandidatesPage />} />
            <Route path="settings" element={<Settings />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
        </Route>

        {/* ----------- JOB SEEKER ROUTES ----------- */}
        <Route element={<ProtectedRoute allowedRoles={['jobseeker']} />}>
          <Route path="jobseeker" element={<JobSeekerLayout />}>
            <Route path="find-jobs" element={<FindJobs />} />
            <Route path="find-employers" element={<FindEmployers />} />
            {/* Dashboard Routes */}
            <Route path="dashboard">
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="applied-jobs" element={<AppliedJobs />} />
              <Route path="favorite-jobs" element={<FavoriteJobs />} />
              <Route path="settings" element={<JobSeekerSettings />} />
            </Route>
          </Route>
        </Route>

        {/* ----------- CATCH-ALL ROUTE ----------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;