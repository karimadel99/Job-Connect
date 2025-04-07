// src/components/jobseeker/JobSeekerPersonalInfo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import PasswordInput from '../public/PasswordInput';

const JobSeekerPersonalInfo = ({ 
  formik, 
  showPassword, 
  setShowPassword, 
  handleNext, 
  handleClearProgress,
  phoneDropdownRef,
  isDropdownOpen,
  toggleDropdown,
  selectedCountry,
  selectCountry,
  countries
}) => {
  return (
    <>
      {/* Step 1: Personal Details */}
      <div className="mb-4 lg:flex lg:space-x-4">
        {/* First Name */}
        <div className="w-full">
          <label htmlFor="firstName" className="block text-gray-800 dark:text-gray-200 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
          )}
        </div>
        {/* Last Name */}
        <div className="w-full mt-4 lg:mt-0">
          <label htmlFor="lastName" className="block text-gray-800 dark:text-gray-200 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-800 dark:text-gray-200 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-800 dark:text-gray-200 mb-2">
          Phone Number
        </label>
        <div className="relative" ref={phoneDropdownRef}>
          <div className="flex">
            <button 
              type="button"
              onClick={toggleDropdown}
              className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-[#312E81] dark:text-[#E0E7FF] bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] rounded-l-lg h-11"
            >
              <span className="mr-2">{selectedCountry.flag}</span>
              {selectedCountry.dialCode}
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <input 
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="123-456-7890"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block p-2.5 w-full z-20 text-[#312E81] dark:text-[#E0E7FF] bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] rounded-r-lg focus:ring-2 focus:outline-none focus:ring-[#312E81] h-11"
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-20 bg-white dark:bg-[#2D2B63] divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto">
              <ul className="py-2 text-sm text-[#312E81] dark:text-[#E0E7FF]">
                {countries.map((country, index) => (
                  <li key={index}>
                    <button 
                      type="button"
                      onClick={() => selectCountry(country)}
                      className="w-full text-left px-4 py-2 hover:bg-[#EEF2FF] dark:hover:bg-[#413f84]"
                    >
                      <span className="mr-2">{country.flag}</span>
                      {country.name} ({country.dialCode})
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.phoneNumber}</p>
        )}
      </div>

      {/* Password with Eye Toggle */}
      <PasswordInput
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />


      {/* Address */}
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-800 dark:text-gray-200 mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className="bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3"
        />
        {formik.touched.address && formik.errors.address && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleNext}
          className="bg-[#1E1B4B] text-[#E0E7FF] py-2 px-4 rounded-lg hover:bg-[#312E81] focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]"
        >
          Next
        </button>
        <button
          type="button"
          onClick={handleClearProgress}
          className="text-sm text-red-600 underline"
        >
          Clear Saved Progress
        </button>
      </div>
      
      {/* Add the "Already have an account" link to step 1 */}
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

export default JobSeekerPersonalInfo;
