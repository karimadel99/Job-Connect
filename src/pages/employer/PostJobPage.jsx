import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function PostJobPage() {
  const initialValues = {
    jobTitle: '',
    tags: [],
    jobRole: '',
    minSalary: '',
    maxSalary: '',
    salaryType: '',
    jobDescription: '',
    responsibilities: [], 
    education: '',
    experience: '', 
    jobType: '',
    vacancies: '',
    expirationDate: ''
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Job Title is required'),
    tags: Yup.array().of(Yup.string()),
    jobRole: Yup.string(),
    customJobRole: Yup.string().when('jobRole', {
      is: 'other',
      then: Yup.string().required('Please specify your role'),
      otherwise: Yup.string().notRequired()
    }),
    minSalary: Yup.string().required('Required'),
    maxSalary: Yup.string().required('Required'),
    salaryType: Yup.string(),
    jobDescription: Yup.string().required('Job Description is required'),
    responsibilities: Yup.array().of(Yup.string()), 
    education: Yup.string(),
    experience: Yup.string(), 
    jobType: Yup.string().required('Job Type is required'),
    vacancies: Yup.number()
      .typeError('Must be a number')
      .min(1, 'At least 1 is required')
      .required('Required'),
    expirationDate: Yup.date()
      .typeError('Invalid date')
      .min(new Date(), 'Expiration date must be in the future')
      .nullable()
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
      datePosted: new Date().toISOString(),
      applications: 0
    };
    console.log('New job post:', payload);
    setSubmitting(false);
    resetForm();
  };

  const jobTagsOptions = [
    'Software Development', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science',
    'Machine Learning', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Network Administration',
    'Marketing', 'Sales', 'Finance', 'Accounting', 'Human Resources', 'Project Management',
    'Business Analysis', 'Customer Service', 'Operations', 'Consulting',
    'Nursing', 'Medicine', 'Pharmacy', 'Healthcare Administration', 'Mental Health',
    'Teaching', 'Research', 'Educational Administration', 'Tutoring',
    'Graphic Design', 'Content Creation', 'Video Production', 'Photography', 'Writing',
    'Engineering', 'Legal', 'Hospitality', 'Retail', 'Manufacturing', 'Construction',
    'Transportation', 'Logistics', 'Real Estate', 'Agriculture'
  ];

  const TagSelector = ({ field, form }) => {
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    
    const handleTagRemove = (tagToRemove) => {
      const newTags = field.value.filter(tag => tag !== tagToRemove);
      form.setFieldValue(field.name, newTags);
    };
    
    const handleTagAdd = (tagToAdd) => {
      if (!field.value.includes(tagToAdd) && tagToAdd.trim() !== '') {
        form.setFieldValue(field.name, [...field.value, tagToAdd]);
        setInputValue('');
        setShowSuggestions(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
    
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      setShowSuggestions(true);
    };
    
    const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault();
        handleTagAdd(inputValue.trim());
      } else if (e.key === 'Backspace' && inputValue === '' && field.value.length > 0) {
        const newTags = [...field.value];
        newTags.pop();
        form.setFieldValue(field.name, newTags);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          inputRef.current && 
          !inputRef.current.contains(event.target) && 
          suggestionsRef.current && 
          !suggestionsRef.current.contains(event.target)
        ) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const filteredSuggestions = jobTagsOptions.filter(
      option => !field.value.includes(option) && 
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div className="w-full relative">
        <div
          className="w-full px-4 py-2 border dark:bg-white rounded-md focus:outline-none text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
        >
          <div className="flex flex-wrap gap-2">
            {field.value.map((tag, index) => (
              <div 
                key={index} 
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-light-primary-100 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-light-primary-200 dark:hover:bg-dark-primary-200 transition-colors"
                >
                  <span className="text-light-text-primary dark:text-dark-text-primary">×</span>
                </button>
              </div>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Type to add tags"
              className="flex-grow min-w-[120px] px-2 py-1 bg-transparent border-none focus:outline-none text-light-text-primary dark:text-dark-text-primary"
            />
          </div>
        </div>
        
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto bg-light-background-primary dark:bg-dark-background-secondary border border-light-neutral-200 dark:border-dark-neutral-700 rounded-md shadow-lg"
          >
            <ul className="py-1">
              {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 hover:bg-light-primary-50 dark:hover:bg-dark-primary-50 cursor-pointer text-light-text-primary dark:text-dark-text-primary"
                  onClick={() => handleTagAdd(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const ResponsibilitiesList = ({ field, form }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    
    const handleResponsibilityRemove = (index) => {
      const newResponsibilities = [...field.value];
      newResponsibilities.splice(index, 1);
      form.setFieldValue(field.name, newResponsibilities);
    };
    
    const handleResponsibilityAdd = () => {
      if (inputValue.trim() !== '') {
        form.setFieldValue(field.name, [...field.value, inputValue.trim()]);
        setInputValue('');
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
    
    const handleInputKeyDown = (e) => {
      if (e.key === 'Enter' && inputValue.trim() !== '') {
        e.preventDefault();
        handleResponsibilityAdd();
      }
    };

    return (
      <div className="w-full">
        <div className="flex items-center mb-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Add a responsibility and press Enter"
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none text-light-text-primary  focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
          />
          <button
            type="button"
            onClick={handleResponsibilityAdd}
            className="px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-r-md hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 transition-colors"
          >
            Add
          </button>
        </div>
        
        {field.value.length > 0 ? (
          <ul className="space-y-2 mt-3 bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-md">
            {field.value.map((responsibility, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-light-primary-100 dark:bg-dark-primary-100 text-light-primary-600 dark:text-dark-primary-500">
                    {index + 1}
                  </span>
                  <span className="text-light-text-primary dark:text-dark-text-primary">{responsibility}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleResponsibilityRemove(index)}
                  className="text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-error dark:hover:text-dark-error"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-light-text-tertiary dark:text-dark-text-tertiary italic mt-2">
            No responsibilities added yet. Add key responsibilities for this role.
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-12 rounded-lg shadow-md text-light-text-primary dark:text-dark-text-primary">
      <h2 className="text-3xl font-bold mb-8 text-center">Post a Job</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, values, handleReset }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobTitle" className="block text-lg font-medium mb-2">
                  Job Title <span className="text-light-error dark:text-dark-error">*</span>
                </label>
                <Field
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                />
                <ErrorMessage name="jobTitle" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="tags" className="block text-lg font-medium mb-2">
                  Tags
                </label>
                <Field name="tags" component={TagSelector} />
                <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
                  Select job tags or type custom ones and press Enter
                </div>
                <ErrorMessage name="tags" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="minSalary" className="block text-lg font-medium mb-2">
                  Min Salary (USD) <span className="text-light-error dark:text-dark-error">*</span>
                </label>
                <Field
                  id="minSalary"
                  name="minSalary"
                  type="number"
                  placeholder="e.g. 50000 or Negotiable"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                />
                <ErrorMessage name="minSalary" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="maxSalary" className="block text-lg font-medium mb-2">
                  Max Salary (USD) <span className="text-light-error dark:text-dark-error">*</span>
                </label>
                <Field
                  id="maxSalary"
                  name="maxSalary"
                  type="number"
                  placeholder="e.g. 80000 or Competitive"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                />
                <ErrorMessage name="maxSalary" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="salaryType" className="block text-lg font-medium mb-2">
                  Salary Type
                </label>
                <Field
                  as="select"
                  id="salaryType"
                  name="salaryType"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select salary type</option>
                  <option value="hourly">Hourly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                <ErrorMessage name="salaryType" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="jobDescription" className="block text-lg font-medium mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="jobDescription"
                name="jobDescription"
                rows="5"
                placeholder="Describe the role, requirements, and benefits"
                className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="jobDescription" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="responsibilities" className="block text-lg font-medium mb-2">
                Responsibilities
              </label>
              <Field name="responsibilities" component={ResponsibilitiesList} />
              <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
                List the key responsibilities for this position
              </div>
              <ErrorMessage name="responsibilities" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Advanced Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="education" className="block text-lg font-medium mb-2">
                    Education
                  </label>
                  <Field
                    as="select"
                    id="education"
                    name="education"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select education</option>
                    <option value="bachelors">Bachelor's</option>
                    <option value="masters">Master's</option>
                    <option value="phd">PhD</option>
                  </Field>
                  <ErrorMessage name="education" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-lg font-medium mb-2">
                    Experience
                  </label>
                  <Field
                    id="experience"
                    name="experience"
                    type="text"
                    placeholder="e.g. 3+ years"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="jobType" className="block text-lg font-medium mb-2">
                    Job Type <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    id="jobType"
                    name="jobType"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select job type</option>
                    <option value="fullTime">Full Time</option>
                    <option value="partTime">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Field>
                  <ErrorMessage name="jobType" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="vacancies" className="block text-lg font-medium mb-2">
                    Vacancies <span className="text-red-500">*</span>
                  </label>
                  <Field
                    id="vacancies"
                    name="vacancies"
                    type="number"
                    placeholder="e.g. 3"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="vacancies" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-lg font-medium mb-2">
                    Expiration Date
                  </label>
                  <Field
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="expirationDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isSubmitting ? 'Posting...' : 'Post Job'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PostJobPage;
