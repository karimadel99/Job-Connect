import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CounterInput from '../public/CounterInput';

const JobSeekerJobDetails = ({ formik, goBack }) => {
  const [showOtherJobField, setShowOtherJobField] = useState(false);
  
  // Check if "Other" is selected and show the custom input field
  useEffect(() => {
    setShowOtherJobField(formik.values.currentOrDesiredJob === 'Other');
  }, [formik.values.currentOrDesiredJob]);

  return (
    <>
      {/* Step 2: Job Details */}
      {/* Years of Experience and Current/Desired Job on one row */}
      <div className="mb-4 lg:flex lg:space-x-4">
        <div className="w-full">
          <CounterInput
            name="yearsOfExperience"
            value={formik.values.yearsOfExperience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.yearsOfExperience}
            touched={formik.touched.yearsOfExperience}
          />
        </div>
        <div className="w-full mt-4 lg:mt-0">
          <label htmlFor="currentOrDesiredJob" className="block text-gray-800 dark:text-gray-200 mb-2">
            Current or Desired Job Title
          </label>
          {/* Select dropdown for job titles */}
          <select
            id="currentOrDesiredJob"
            name="currentOrDesiredJob"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentOrDesiredJob}
            className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
          >
            <option value="">Select Job Title</option>
            <optgroup label="Technology">
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="DevOps Engineer">DevOps Engineer</option>
            </optgroup>
            <optgroup label="Design">
              <option value="UI Designer">UI Designer</option>
              <option value="UX Designer">UX Designer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Product Designer">Product Designer</option>
            </optgroup>
            <optgroup label="Management">
              <option value="Project Manager">Project Manager</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Scrum Master">Scrum Master</option>
            </optgroup>
            <option value="Other">Other</option>
          </select>
          {formik.touched.currentOrDesiredJob && formik.errors.currentOrDesiredJob && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.currentOrDesiredJob}</p>
          )}
        </div>
      </div>

      {/* Custom Job Title field that appears when "Other" is selected */}
      {showOtherJobField && (
        <div className="mb-4">
          <label htmlFor="customJobTitle" className="block text-gray-800 dark:text-gray-200 mb-2">
            Specify Your Job Title
          </label>
          <input
            type="text"
            id="customJobTitle"
            name="customJobTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.customJobTitle || ''}
            className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
            placeholder="Enter your specific job title"
          />
          {formik.touched.customJobTitle && formik.errors.customJobTitle && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.customJobTitle}</p>
          )}
        </div>
      )}

      {/* Degree */}
      <div className="mb-6">
        <label htmlFor="degree" className="block text-gray-800 dark:text-gray-200 mb-2">
          Degree
        </label>
        <select
          id="degree"
          name="degree"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.degree}
          className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] rounded-lg h-11 p-3 text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5"
        >
          <option value="">Select Degree</option>
          <option value="High School">High School</option>
          <option value="Associate's Degree">Associate's Degree</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Doctorate">Doctorate</option>
        </select>
        {formik.touched.degree && formik.errors.degree && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.degree}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={goBack}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-[#1E1B4B] text-[#E0E7FF] py-2 px-4 rounded-lg hover:bg-[#312E81] focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]"
        >
          {formik.isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </div>
      
      {/* Add the "Already have an account" link */}
      <div className="text-center mt-4">
        <p className="text-sm text-[#312E81] dark:text-[#E0E7FF]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1E1B4B] dark:text-[#E0E7FF] font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </>
  );
};

export default JobSeekerJobDetails;
