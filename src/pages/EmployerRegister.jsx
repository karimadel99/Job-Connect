import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import EmployerCompanyDetails from '../components/employer/EmployerCompanyDetails';
import EmployerPersonalInfo from '../components/employer/EmployerPersonalInfo';
import { registerEmployer } from '../api/authApi'; 
import { useAuth } from '../contexts/AuthContext'; 
import toast from 'react-hot-toast';

const EmployerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [step, setStep] = useState(1); // Tracks which step the user is on
  
  // Optional: If you want to auto-login after registration
  const { login } = useAuth();

  // Retrieve any saved form data from localStorage (for partial progress)
  const savedForm = localStorage.getItem('employerForm');
  const initialFormValues = savedForm
    ? JSON.parse(savedForm)
    : {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        companyName: '',
        companySize: '',
        website: '',
        industry: '',
        address: '',
        companyDescription: '',
      };

  // Set up Formik
  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
          'Password must include at least one uppercase, one lowercase, one digit, and one special character'
        )
        .required('Password is required'),
      companyName: Yup.string().required('Company name is required'),
      companySize: Yup.string().required('Company size is required'),
      website: Yup.string().url('Enter a valid URL').required('Website is required'),
      industry: Yup.string().required('Industry is required'),
      address: Yup.string().required('Address is required'),
      companyDescription: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        setRegistrationError('');
        
        // Show loading toast
        const loadingToast = toast.loading('Creating your employer account...');
        
        // Call the API with the form values
        const userData = await registerEmployer(values);
        
        // Dismiss loading toast
        toast.dismiss(loadingToast);
        
        // Store user data and token
        if (userData && userData.token) {
          localStorage.setItem('token', userData.token);
          localStorage.setItem('user', JSON.stringify(userData));
          
          // **Update the AuthContext with the new user data**
          login(userData);
          
          // Clear saved progress on success
          localStorage.removeItem('employerForm');
          
          // Show success toast
          toast.success('Registration successful! Redirecting to dashboard...');
          
          // Navigate to the dashboard
          navigate('/employer');
        } else {
          setRegistrationError('Registration failed. Please try again.');
          toast.error('Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationError(error.message || 'Registration failed. Please try again.');
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    },
  });

  // Save form data to localStorage on every change, so the user can resume if they refresh
  useEffect(() => {
    localStorage.setItem('employerForm', JSON.stringify(formik.values));
  }, [formik.values]);

  // Clears localStorage and resets the form
  const handleClearProgress = () => {
    localStorage.removeItem('employerForm');
    formik.resetForm();
    toast.success('Form progress cleared');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side: The form */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center bg-light-background-primary dark:bg-dark-background-primary py-24">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-dark-background-secondary p-6 w-full max-w-xl mx-auto rounded-lg"
        >
          <h2 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6 text-center">
            Employer Registration
          </h2>

          {registrationError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {registrationError}
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <EmployerPersonalInfo
              formik={formik}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleNext={() => setStep(2)}
              handleClearProgress={handleClearProgress}
            />
          )}

          {/* Step 2: Company Details */}
          {step === 2 && (
            <EmployerCompanyDetails
              formik={formik}
              goBack={() => setStep(1)}
            />
          )}
        </form>
      </div>

      {/* Right side: Illustration */}
      <div className="hidden md:block md:w-1/3">
        <img
          src="/assets/images/Newemployee-rafiki.svg"
          alt="Employer Registration Illustration"
          className="h-full"
        />
      </div>
    </div>
  );
};

export default EmployerRegister;
