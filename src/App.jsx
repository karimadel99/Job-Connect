import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import AdminLayout from './layouts/AdminLayout';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const JobSeekerRegister = lazy(() => import('./pages/JobSeekerRegister'));
const EmployerRegister = lazy(() => import('./pages/EmployerRegister'));
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const EmployerLayout = lazy(() => import('./layouts/EmployerLayout'));
const JobSeekerLayout = lazy(() => import('./layouts/JobSeekerLayout'));
const NotFound = lazy(() => import('./pages/NotFound'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
// Employer pages
const OverviewPage = lazy(() => import('./pages/employer/OverviewPage'));
const PostJobPage = lazy(() => import('./pages/employer/PostJobPage'));
const MyJobsPage = lazy(() => import('./pages/employer/MyJobsPage'));
const Settings = lazy(() => import('./pages/employer/Settings'));
const JobApplicationsPage = lazy(() => import('./pages/employer/JobApplicationsPage'));
const EditJobPage = lazy(() => import('./pages/employer/EditJobPage'));
// Job Seeker pages
const FindJobs = lazy(() => import('./pages/job-seeker/FindJobs'));
const FindEmployers = lazy(() => import('./pages/job-seeker/FindEmployers'));
const Overview = lazy(() => import('./pages/job-seeker/Overview'));
const AppliedJobs = lazy(() => import('./pages/job-seeker/AppliedJobs'));
const FavoriteJobs = lazy(() => import('./pages/job-seeker/FavoriteJobs'));
const JobSeekerSettings = lazy(() => import('./pages/job-seeker/Settings'));
const JobDetails = lazy(() => import('./pages/job-seeker/JobDetails'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#363636', color: '#fff' },
          success: { style: { background: '#1E1B4B', color: '#E0E7FF' }, iconTheme: { primary: '#E0E7FF', secondary: '#1E1B4B' } },
          error: { style: { background: '#ef4444', color: '#fff' }, iconTheme: { primary: '#fff', secondary: '#ef4444' } },
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* ----------- PUBLIC ROUTES ----------- */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={user && user.role ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
            <Route path="register/jobseeker" element={user && user.role ? <Navigate to={`/${user.role}/dashboard`} /> : <JobSeekerRegister />} />
            <Route path="register/employer" element={user && user.role ? <Navigate to={`/${user.role}/dashboard`} /> : <EmployerRegister />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="pricing" element={<PricingPage />} />
          </Route>
          {/* ----------- EMPLOYER ROUTES ----------- */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route path="employer" element={<EmployerLayout />}>
              <Route path="dashboard" element={<OverviewPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="post-job" element={<PostJobPage />} />
              <Route path="edit-job/:jobId" element={<EditJobPage />} />
              <Route path="my-jobs" element={<MyJobsPage />} />
              <Route path="my-jobs/:jobId/applications" element={<JobApplicationsPage />} />
              <Route path="settings" element={<Settings />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>
          </Route>
          {/* ----------- JOB SEEKER ROUTES ----------- */}
          <Route element={<ProtectedRoute allowedRoles={['jobseeker']} />}>
            <Route path="jobseeker" element={<JobSeekerLayout />}>
              <Route path="find-jobs" element={<FindJobs />} />
              <Route path="find-employers" element={<FindEmployers />} />
              <Route path="job-details/:id" element={<JobDetails />} />
              <Route path="dashboard">
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="applied-jobs" element={<AppliedJobs />} />
                <Route path="favorite-jobs" element={<FavoriteJobs />} />
                <Route path="settings" element={<JobSeekerSettings />} />
              </Route>
            </Route>
          </Route>
          {/* ----------- ADMIN ROUTES ----------- */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route index element={<Navigate to="dashboard" />} />
            </Route>
          </Route>
          {/* ----------- CATCH-ALL ROUTE ----------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;