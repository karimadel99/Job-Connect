import React, { useState, useRef } from 'react';

const WorkedAsList = ({ field, form }) => {
  const [jobRole, setJobRole] = useState({
    jobTitle: ''
  });
  const inputRef = useRef(null);
  
  const handleJobRoleRemove = (index) => {
    const newJobRoles = [...field.value];
    newJobRoles.splice(index, 1);
    form.setFieldValue(field.name, newJobRoles);
  };
  
  const handleJobRoleAdd = () => {
    if (jobRole.jobTitle.trim() !== '') {
      const newJobRole = {
        jobTitle: jobRole.jobTitle.trim()
      };
      form.setFieldValue(field.name, [...field.value, newJobRole]);
      setJobRole({
        jobTitle: ''
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleInputChange = (field, value) => {
    setJobRole(prev => ({ ...prev, [field]: value }));
  };



  const isFormValid = jobRole.jobTitle.trim() !== '';

  return (
    <div className="w-full">
      <div className="mb-4 p-4 border rounded-lg bg-light-background-secondary dark:bg-dark-background-secondary">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
            Job Title *
          </label>
          <input
            ref={inputRef}
            type="text"
            value={jobRole.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            placeholder="e.g. Software Engineer, Marketing Manager, etc."
            className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
          />
        </div>
        <button
          type="button"
          onClick={handleJobRoleAdd}
          disabled={!isFormValid}
          className="w-full px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-md hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Job Role
        </button>
      </div>
      
      {field.value.length > 0 ? (
        <ul className="space-y-3 bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-md">
          {field.value.map((role, index) => (
            <li key={index} className="p-4 border rounded-lg bg-white dark:bg-dark-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-grow">
                  <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-light-primary-100 dark:bg-dark-primary-100 text-light-primary-600 dark:text-dark-primary-500 text-sm font-semibold mt-1">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-light-text-primary dark:text-dark-text-primary font-semibold">
                      {role.jobTitle}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleJobRoleRemove(index)}
                  className="ml-3 text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-error dark:hover:text-dark-error transition-colors"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-light-text-tertiary dark:text-dark-text-tertiary italic mt-2 text-center py-8">
          No job roles added yet. Add the positions you've held in your career.
        </div>
      )}
    </div>
  );
};

export default WorkedAsList; 