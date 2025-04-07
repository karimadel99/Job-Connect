// src/components/PasswordInput.jsx
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({
  formik, // Optional: Formik object for Formik-managed forms
  showPassword, // Required: Boolean to toggle visibility
  setShowPassword, // Required: Function to update showPassword
  fieldName = 'password', // Optional: Field name (default 'password')
  label = 'password', // Optional: Custom label text
  value, // Optional: Value for non-Formik use
  onChange, // Optional: onChange handler for non-Formik use
  onBlur, // Optional: onBlur handler for non-Formik use
  required = false, // Optional: Mark as required
}) => {
  // Determine if we're using Formik or standard props
  const isFormik = !!formik;
  const inputValue = isFormik ? formik.values[fieldName] || '' : value || '';
  const inputOnChange = isFormik ? formik.handleChange : onChange;
  const inputOnBlur = isFormik ? formik.handleBlur : onBlur;
  const error = isFormik && formik.touched[fieldName] && formik.errors[fieldName];

  return (
    <div className="mb-4">
      <label
        htmlFor={fieldName}
        className="block text-gray-800 dark:text-gray-200 mb-2"
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={fieldName}
          name={fieldName}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={inputOnBlur}
          className="bg-[#EEF2FF] dark:bg-[#413f84] border-0 h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] w-full py-2.5 rounded-lg px-3 pr-12"
          required={required}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#312E81] dark:text-[#E0E7FF]"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;