import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { getAllTags } from '../../../api/authApi';
import TagSelector from './TagSelector';
import ResponsibilitiesList from './ResponsibilitiesList';

const JobBasicInfo = ({ values, setFieldValue }) => {
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
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center">Basic Job Information</h3>
        <p className="text-center text-light-text-secondary dark:text-dark-text-secondary mb-8">
          Let's start with the essential details about your job posting
        </p>
      </div>

      {/* Job Title */}
      <div>
        <label htmlFor="title" className="block text-lg font-medium mb-2">
          Job Title <span className="text-light-error dark:text-dark-error">*</span>
        </label>
        <Field
          id="title"
          name="title"
          placeholder="e.g. Frontend Developer"
          className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
        />
        <ErrorMessage name="title" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
      </div>

      {/* Job Description */}
      <div>
        <label htmlFor="description" className="block text-lg font-medium mb-2">
          Job Description <span className="text-light-error dark:text-dark-error">*</span>
        </label>
        <Field
          as="textarea"
          id="description"
          name="description"
          rows="6"
          placeholder="Describe the role, requirements, and benefits in detail..."
          className="w-full px-4 py-3 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
        />
        <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
          Provide a comprehensive description of the role, key requirements, and what makes this opportunity attractive
        </div>
        <ErrorMessage name="description" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-lg font-medium mb-2">
          Job Tags
        </label>
        <Field name="tags">
          {({ field, form }) => (
            <div>
              {isLoadingTags ? (
                <div className="w-full px-4 py-3 border rounded-md bg-white dark:bg-dark-neutral-700 text-light-text-secondary dark:text-dark-text-secondary">
                  Loading tags...
                </div>
              ) : (
                <TagSelector field={field} form={form} jobTagsOptions={jobTagsOptions} />
              )}
            </div>
          )}
        </Field>
        <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
          Select relevant tags or type custom ones and press Enter to help candidates find your job
        </div>
        <ErrorMessage name="tags" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
      </div>

      {/* Responsibilities */}
      <div>
        <label htmlFor="responsibilities" className="block text-lg font-medium mb-2">
          Key Responsibilities
        </label>
        <Field name="responsibilities">
          {({ field, form }) => (
            <ResponsibilitiesList field={field} form={form} />
          )}
        </Field>
        <div className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary mt-1">
          List the main responsibilities and duties for this position
        </div>
        <ErrorMessage name="responsibilities" component="div" className="text-light-error dark:text-dark-error text-sm mt-1" />
      </div>
    </div>
  );
};

export default JobBasicInfo; 