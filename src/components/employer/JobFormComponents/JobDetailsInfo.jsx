import React from 'react';
import { Field, ErrorMessage } from 'formik';

const JobDetailsInfo = ({ values, setFieldValue }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">Job Details & Requirements</h3>
        <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Now let's add the specific details and requirements for this position
        </p>
      </div>

      {/* Salary Information */}
      <div>
        <h4 className="text-xl font-medium mb-4">Compensation</h4>
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
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="">Select salary type</option>
              <option value="hourly">Hourly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Field>
            <ErrorMessage name="salaryType" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
          </div>
        </div>
      </div>

      {/* Job Type and Work Place */}
      <div>
        <h4 className="text-xl font-medium mb-4">Job Configuration</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="jobType" className="block text-lg font-medium mb-2">
              Job Type <span className="text-light-error dark:text-dark-error">*</span>
            </label>
            <Field
              as="select"
              id="jobType"
              name="jobType"
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="">Select work place</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </Field>
            <ErrorMessage name="workPlace" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
          </div>
        </div>
      </div>

      {/* Location and Vacancies */}
      <div>
        <h4 className="text-xl font-medium mb-4">Position Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-lg font-medium mb-2">
              Location <span className="text-light-error dark:text-dark-error">*</span>
            </label>
            <Field
              id="location"
              name="location"
              placeholder="e.g. Cairo, Egypt"
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
            <ErrorMessage name="location" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="vacancies" className="block text-lg font-medium mb-2">
              Number of Vacancies <span className="text-light-error dark:text-dark-error">*</span>
            </label>
            <Field
              id="vacancies"
              name="vacancies"
              type="number"
              placeholder="e.g. 3"
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
            <ErrorMessage name="vacancies" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h4 className="text-xl font-medium mb-4">Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="education" className="block text-lg font-medium mb-2">
              Education Level
            </label>
            <Field
              as="select"
              id="education"
              name="education"
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            >
              <option value="">Select education level</option>
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
              Experience Required
            </label>
            <Field
              id="experience"
              name="experience"
              type="number"
              placeholder="e.g. 2"
              className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
            <ErrorMessage name="experience" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
          </div>
        </div>
      </div>

      {/* Expiration Date */}
      <div>
        <h4 className="text-xl font-medium mb-4">Application Deadline</h4>
        <div className="max-w-md">
          <label htmlFor="expirationDate" className="block text-lg font-medium mb-2">
            Expiration Date
          </label>
          <Field
            id="expirationDate"
            name="expirationDate"
            type="date"
            className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
          />
          <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
            When should applications close? Leave empty for no deadline
          </div>
          <ErrorMessage name="expirationDate" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsInfo; 