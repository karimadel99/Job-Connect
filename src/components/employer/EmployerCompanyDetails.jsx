// src/components/employer/EmployerCompanyDetails.jsx
import React from 'react';

const EmployerCompanyDetails = ({ formik, goBack }) => {
  return (
    <>
      {/* Step 2: Company Details */}
      <div className="mb-4 lg:flex lg:space-x-4">
        <div className="w-full">
          <label htmlFor="companyName" className="block text-gray-800 dark:text-gray-200 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.companyName}</p>
          )}
        </div>
        <div className="w-full mt-4 lg:mt-0">
          <label htmlFor="companySize" className="block text-gray-800 dark:text-gray-200 mb-2">
            Company Size
          </label>
          <select
            id="companySize"
            name="companySize"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companySize}
            className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
          >
            <option value="">Select Company Size</option>
            <option value="1-5">1-5</option>
            <option value="5-10">5-10</option>
            <option value="10-50">10-50</option>
            <option value="50-100">50-100</option>
            <option value="100-500">100-500</option>
            <option value="500-1000">500-1000</option>
            <option value="1000+">1000+</option>
          </select>
          {formik.touched.companySize && formik.errors.companySize && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.companySize}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="website" className="block text-gray-800 dark:text-gray-200 mb-2">
          Website
        </label>
        <input
          type="url"
          id="website"
          name="website"
          placeholder="https://example.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.website}
          className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
        />
        {formik.touched.website && formik.errors.website && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.website}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="industry" className="block text-gray-800 dark:text-gray-200 mb-2">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          list="industryOptions"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.industry}
          className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
        />
        <datalist id="industryOptions">
          <option value="Tech" />
          <option value="Design" />
          <option value="Architecture" />
        </datalist>
        {formik.touched.industry && formik.errors.industry && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.industry}</p>
        )}
      </div>

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
          className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg p-5 h-11"
        />
        {formik.touched.address && formik.errors.address && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="companyDescription" className="block text-gray-800 dark:text-gray-200 mb-2">
          Company Description
        </label>
        <textarea
          id="companyDescription"
          name="companyDescription"
          rows="4"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.companyDescription}
          className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-0 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg"
        ></textarea>
        {formik.touched.companyDescription && formik.errors.companyDescription && (
          <p className="mt-1 text-sm text-red-600">{formik.errors.companyDescription}</p>
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
    </>
  );
};

export default EmployerCompanyDetails;
