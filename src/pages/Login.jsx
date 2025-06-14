import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../components/public/PasswordInput';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { loginUser } from '../api/authApi';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from your context
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoginError('');
        const loadingToast = toast.loading('Logging in...');
        const result = await loginUser(values.email, values.password);
        toast.dismiss(loadingToast);

        if (!result.success) {
          setLoginError(result.error || 'Login failed. Please check your credentials.');
          toast.error(result.error || 'Login failed. Please check your credentials.');
          setSubmitting(false);
          return;
        }

        // Store token, refreshToken, and user in localStorage
        localStorage.setItem('token', result.user.token);
        localStorage.setItem('refreshToken', result.user.refreshToken);
        localStorage.setItem('user', JSON.stringify(result.user));

        login(result.user); // Pass the full user object

        toast.success('Login successful! Redirecting...');
        const role = result.user.role?.toLowerCase();
        switch (role) {
          case 'employer':
            navigate('/employer/dashboard');
            break;
          case 'jobseeker':
          case 'job-seeker':
            navigate('/jobseeker/dashboard');
            break;
          case 'admin':
            navigate('/admin/dashboard');
            break;
          default:
            navigate('/');
            break;
        }
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(error.message || 'Invalid email or password. Please try again.');
        toast.error(error.message || 'Invalid email or password. Please try again.');
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Form */}
      <div className="w-full md:w-2/3 p-6 flex flex-col justify-center bg-white dark:bg-[#121212]">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white dark:bg-[#121212] p-6 w-full max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#312E81] dark:text-[#E0E7FF] mb-6 text-center">
            Login
          </h2>

          {loginError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {loginError}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[#312E81] dark:text-[#E0E7FF] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-[#EEF2FF] dark:bg-[#413f84] border-t-0 border-b-0 border-[#1E1B4B] dark:border-[#EEF2FF] h-11 text-sm text-[#312E81] dark:text-[#E0E7FF] focus:ring-2 focus:outline-none focus:ring-[#312E81] py-2.5 rounded-lg px-3"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-light-error dark:text-dark-error text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          {/* Password Input (Uses your existing PasswordInput component) */}
          <PasswordInput
            formik={formik}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#1E1B4B] text-[#E0E7FF] py-2 rounded-lg hover:bg-[#312E81] focus:outline-none focus:ring-2 focus:ring-[#1E1B4B]"
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Right Side: Placeholder for Background Image */}
      <div className="hidden bg-light-background-secondary dark:bg-[#121212] md:block md:w-1/3">
        <img
          src="/assets/images/Search-rafiki.svg"
          alt="Employer Registration Illustration"
          className="h-full"
        />
      </div>
    </div>
  );
};

export default LoginForm;