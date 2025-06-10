// src/components/employer/EmployerPersonalInfo.jsx
import React from 'react';
import PasswordInput from '../public/PasswordInput';
import PhoneInput from '../public/PhoneInput';

const EmployerPersonalInfo = ({ formik, showPassword, setShowPassword, handleNext, handleClearProgress }) => {
  return (
    <>
      {/* Step 1: Personal Info */}
      <div className="mb-4 lg:flex lg:space-x-4">
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
            className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.firstName}</p>
          )}
        </div>
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
            className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.lastName}</p>
          )}
        </div>
      </div>

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
          className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
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
        <PhoneInput
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phoneNumber}
          touched={formik.touched.phoneNumber}
          buttonClassName="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-[#312E81] dark:text-[#E0E7FF] bg-[#EEF2FF] dark:bg-[#413f84] border-0 rounded-l-lg h-11"
          inputClassName="block p-2.5 w-full z-20 text-[#312E81] dark:text-[#E0E7FF] bg-[#EEF2FF] dark:bg-[#413f84] border-0 rounded-r-lg focus:ring-2 focus:outline-none focus:ring-[#312E81] h-11"
          dropdownClassName="absolute top-full left-0 z-20 bg-white dark:bg-[#2D2B63] divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto"
          errorClassName="mt-1 text-sm text-red-600"
        />
      </div>

      <PasswordInput
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

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
    </>
  );
};

export default EmployerPersonalInfo;