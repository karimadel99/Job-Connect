import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const [showToast, setShowToast] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Check if user is logged in
    if (user) {
      // Check user role
      if (user.role === 'jobseeker') {
        // If user is a job seeker, redirect to dashboard without showing toast
        navigate('/jobseeker/dashboard');
        return;
      } else if (user.role === 'employer') {
        // If user is an employer, show a different message
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
        return;
      } else if (user.role === 'admin') {
        // If user is an admin, show a different message
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 4000);
        return;
      }
    }
    
    // If user is not logged in, show the login prompt toast
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Function to get appropriate toast message based on user role
  const getToastMessage = () => {
    if (!user) {
      return "Please login or register to browse and apply for jobs!";
    } else if (user.role === 'employer') {
      return "Employers cannot apply for jobs. Switch to job seeker account to apply.";
    } else if (user.role === 'admin') {
      return "Admins cannot apply for jobs. This feature is for job seekers only.";
    }
    return "Please login or register to browse and apply for jobs!";
  };

  // Function to get appropriate toast color based on user role
  const getToastStyles = () => {
    if (!user) {
      return {
        bgClass: "bg-orange-50 dark:bg-orange-900/90",
        textClass: "text-orange-800 dark:text-orange-200",
        borderClass: "border-orange-500",
        iconColor: "text-orange-500"
      };
    } else if (user.role === 'employer' || user.role === 'admin') {
      return {
        bgClass: "bg-blue-50 dark:bg-blue-900/90",
        textClass: "text-blue-800 dark:text-blue-200",
        borderClass: "border-blue-500",
        iconColor: "text-blue-500"
      };
    }
    return {
      bgClass: "bg-orange-50 dark:bg-orange-900/90",
      textClass: "text-orange-800 dark:text-orange-200",
      borderClass: "border-orange-500",
      iconColor: "text-orange-500"
    };
  };

  const toastStyles = getToastStyles();

  return (
    <>
      <div className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl border border-light-primary-100 dark:border-gray-700 transition-all duration-300 hover:scale-105">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium bg-light-primary-100 dark:bg-blue-900/30 text-light-primary-600 dark:text-blue-300 rounded-full">
            {job.type}
          </span>
          <div className="flex items-center text-sm text-light-text-secondary dark:text-gray-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {job.location}
          </div>
        </div>

        {/* Company and Title */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={job.companyLogo}
            alt={`${job.title} logo`}
            className="w-12 h-12 rounded-lg object-cover border border-light-primary-100 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-light-text-primary dark:text-white group-hover:text-light-primary-500 dark:group-hover:text-blue-400 transition-colors duration-200">
              {job.title}
            </h3>
            <p className="text-sm text-light-text-secondary dark:text-gray-400">
              {job.category}
            </p>
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <div className="flex items-center text-light-primary-500 dark:text-green-400">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-semibold">{job.salary}</span>
          </div>
        </div>

        {/* Apply Button */}
        <button 
          onClick={handleApplyClick}
          className="w-full px-4 py-3 rounded-lg font-medium bg-light-primary-400 hover:bg-light-primary-500 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <span>Apply Now</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 ${toastStyles.bgClass} ${toastStyles.textClass} px-6 py-4 rounded-lg shadow-lg border-l-4 ${toastStyles.borderClass} animate-slide-in-right backdrop-blur-sm`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className={`w-5 h-5 ${toastStyles.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                {getToastMessage()}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowToast(false)}
                className={`inline-flex ${!user ? 'text-orange-400 hover:text-orange-600 dark:text-orange-300 dark:hover:text-orange-100' : 'text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS for animation */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}