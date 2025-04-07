import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { registerJobSeeker } from '../api/authApi';
import JobSeekerPersonalInfo from '../components/job-seeker/JobSeekerPersonalInfo';
import JobSeekerJobDetails from '../components/job-seeker/JobSeekerJobDetails';


// Add countries array for phone input dropdown
const countries = [
  { name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { name: "China", dialCode: "+86", flag: "🇨🇳" },
  { name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { name: "France", dialCode: "+33", flag: "🇫🇷" },
  { name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { name: "India", dialCode: "+91", flag: "🇮🇳" },
  { name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { name: "United States", dialCode: "+1", flag: "🇺🇸" },
];

const JobSeekerRegister = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Load saved form data from localStorage, if any.
  const savedForm = localStorage.getItem('jobSeekerForm');
  const initialValues = savedForm
    ? JSON.parse(savedForm)
    : {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        yearsOfExperience: '0',
        degree: '',
        currentOrDesiredJob: '',
        customJobTitle: '', // For "Other" job title option
      };

  // Phone input dropdown state
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const phoneDropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          'Password must include at least one uppercase, one lowercase, one digit, and one special character'
        ),
      phoneNumber: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      yearsOfExperience: Yup.number().min(0, 'Cannot be negative').required('Years of experience is required'),
      degree: Yup.string().required('Degree is required'),
      currentOrDesiredJob: Yup.string().required('This field is required'),
      customJobTitle: Yup.string().when('currentOrDesiredJob', {
        is: 'Other',
        then: () => Yup.string().required('Please specify your job title'),
        otherwise: () => Yup.string(),
      }),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Job Seeker Registration Values:', values);
        
        // Show loading toast
        const loadingToast = toast.loading('Creating your account...');
        
        // Create a copy of the values to modify before sending to API
        const apiValues = { ...values };
        
        // If "Other" is selected, use the customJobTitle instead
        if (values.currentOrDesiredJob === 'Other' && values.customJobTitle) {
          apiValues.currentOrDesiredJob = values.customJobTitle;
        }
        
        // Call the API for registration with the modified values
        const userData = await registerJobSeeker(apiValues);
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // If registration is successful and a token is returned
        if (userData && userData.token) {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData));
          // Update the auth context (auto login)
          login(userData);
          // Clear saved form progress
          localStorage.removeItem('jobSeekerForm');
          
          // Show success toast
          toast.success('Registration successful! Redirecting to dashboard...');
          
          // Navigate to the job seeker dashboard
          navigate('/jobseeker/dashboard');
        } else {
          // Optionally, handle a scenario where the API didn't return a token/user
          console.error('Registration did not return expected data.');
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Job Seeker registration failed:', error);
        // Show error toast
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    },
  });

  // Auto-save progress on every change.
  useEffect(() => {
    localStorage.setItem('jobSeekerForm', JSON.stringify(formik.values));
  }, [formik.values]);

  // Multi-step form state: step 1 (personal details) and step 2 (job details)
  const [step, setStep] = useState(1);
  // State for password visibility toggle.
  const [showPassword, setShowPassword] = useState(false);

  // Function to move to next step (validate only Step 1 fields).
  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.password ||
      errors.phoneNumber ||
      errors.address
    ) {
      formik.setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        phoneNumber: true,
        address: true,
      });
      return;
    }
    setStep(2);
  };

  // Function to clear saved progress.
  const handleClearProgress = () => {
    localStorage.removeItem('jobSeekerForm');
    formik.resetForm({
      values: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        yearsOfExperience: '0',
        degree: '',
        currentOrDesiredJob: '',
        customJobTitle: '',
      }
    });
    toast.success('Form progress cleared');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Form Section */}
      <div className="w-full md:w-2/3 flex p-6 items-center justify-center bg-white dark:bg-[#121212] py-24">
        <form onSubmit={formik.handleSubmit} className="bg-white dark:bg-[#121212] p-6 w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
            Job Seeker Registration
          </h2>

          {step === 1 && (
            <JobSeekerPersonalInfo 
              formik={formik}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleNext={handleNext}
              handleClearProgress={handleClearProgress}
              phoneDropdownRef={phoneDropdownRef}
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              selectedCountry={selectedCountry}
              selectCountry={selectCountry}
              countries={countries}
            />
          )}

          {step === 2 && (
            <JobSeekerJobDetails 
              formik={formik}
              goBack={() => setStep(1)}
            />
          )}
        </form>
      </div>
      {/* Illustration Section */}
      <div className="hidden md:block md:w-1/3">
        <img src="/assets/images/Jobhunt-rafiki.svg" alt="Job Seeker Registration Illustration" className="h-full" />
      </div>
    </div>
  );
};

export default JobSeekerRegister;
