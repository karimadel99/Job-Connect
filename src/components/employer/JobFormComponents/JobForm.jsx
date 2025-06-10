import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { jobFormValidationSchema, getInitialValues } from './JobFormSchema';
import { getAllTags } from '../../../api/authApi';
import TagSelector from './TagSelector';
import ResponsibilitiesList from './ResponsibilitiesList';

const JobForm = ({ job, onSubmit, submitButtonText }) => {
  const [jobTagsOptions, setJobTagsOptions] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoadingTags(true);
        const result = await getAllTags();
        if (result.success) {
          const tagNames = Array.isArray(result.data) 
            ? result.data.map(tag => typeof tag === 'string' ? tag : tag.name || tag.title || tag)
            : [];
          setJobTagsOptions(tagNames);
        } else {
          console.error('Failed to fetch tags:', result.error);
          // Fallback to empty array or default tags
          setJobTagsOptions([]);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
        setJobTagsOptions([]);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-light-text-primary dark:text-dark-text-primary">
      <Formik
        initialValues={getInitialValues(job)}
        validationSchema={jobFormValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >        
        {({ isSubmitting, values, handleReset, setFieldValue }) => (
          <Form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-lg font-medium mb-2">
                  Job Title <span className="text-light-error dark:text-dark-error">*</span>
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="e.g. Frontend Developer"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                />
                <ErrorMessage name="title" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="tags" className="block text-lg font-medium mb-2">
                  Tags
                </label>
                <Field name="tags">
                  {({ field, form }) => (
                    <div>
                      {isLoadingTags ? (
                        <div className="w-full px-4 py-2 border rounded-md bg-white dark:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary">
                          Loading tags...
                        </div>
                      ) : (
                        <TagSelector field={field} form={form} jobTagsOptions={jobTagsOptions} />
                      )}
                    </div>
                  )}
                </Field>
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
                  placeholder="e.g. 50000"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
                  placeholder="e.g. 80000"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                >
                  <option value="">Select salary type</option>
                  <option value="hourly">Hourly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Field>
                <ErrorMessage name="salaryType" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-medium mb-2">
                Job Description <span className="text-light-error dark:text-dark-error">*</span>
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
                placeholder="Describe the role, requirements, and benefits"
                className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
              />
              <ErrorMessage name="description" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="responsibilities" className="block text-lg font-medium mb-2">
                Responsibilities
              </label>
              <Field name="responsibilities">
                {({ field, form }) => (
                  <ResponsibilitiesList field={field} form={form} />
                )}
              </Field>
              <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
                List the key responsibilities for this position
              </div>
              <ErrorMessage name="responsibilities" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Advanced Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="education" className="block text-lg font-medium mb-2">
                    Education
                  </label>
                  <Field
                    as="select"
                    id="education"
                    name="education"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  >
                    <option value="">Select education</option>
                    <option value="High School">High School</option>
                    <option value="Associate">Associate</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Master">Master</option>
                    <option value="PhD">PhD</option>
                  </Field>
                  <ErrorMessage name="education" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-lg font-medium mb-2">
                    Experience
                  </label>
                  <Field
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder="e.g. 2"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  />
                  <ErrorMessage name="experience" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="jobType" className="block text-lg font-medium mb-2">
                    Job Type <span className="text-light-error dark:text-dark-error">*</span>
                  </label>
                  <Field
                    as="select"
                    id="jobType"
                    name="jobType"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  >
                    <option value="">Select job type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </Field>
                  <ErrorMessage name="jobType" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="workPlace" className="block text-lg font-medium mb-2">
                    Work Place <span className="text-light-error dark:text-dark-error">*</span>
                  </label>
                  <Field
                    as="select"
                    id="workPlace"
                    name="workPlace"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  >
                    <option value="">Select work place</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </Field>
                  <ErrorMessage name="workPlace" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label htmlFor="vacancies" className="block text-lg font-medium mb-2">
                    Vacancies <span className="text-light-error dark:text-dark-error">*</span>
                  </label>
                  <Field
                    id="vacancies"
                    name="vacancies"
                    type="number"
                    placeholder="e.g. 3"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  />
                  <ErrorMessage name="vacancies" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-lg font-medium mb-2">
                    Expiration Date
                  </label>
                  <Field
                    id="expirationDate"
                    name="expirationDate"
                    type="date"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                  />
                  <ErrorMessage name="expirationDate" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-lg font-medium mb-2">
                  Location <span className="text-light-error dark:text-dark-error">*</span>
                </label>
                <Field
                  id="location"
                  name="location"
                  placeholder="e.g. Cairo"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
                />
                <ErrorMessage name="location" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {isSubmitting ? 'Processing...' : submitButtonText}
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
};

export default JobForm;
