import React, { useState, useRef } from 'react';

const CompanyWorkedAtList = ({ field, form }) => {
  const [company, setCompany] = useState({
    companyName: ''
  });
  const inputRef = useRef(null);
  
  const handleCompanyRemove = (index) => {
    const newCompanies = [...field.value];
    newCompanies.splice(index, 1);
    form.setFieldValue(field.name, newCompanies);
  };
  
  const handleCompanyAdd = () => {
    if (company.companyName.trim() !== '') {
      const newCompany = {
        companyName: company.companyName.trim()
      };
      form.setFieldValue(field.name, [...field.value, newCompany]);
      setCompany({
        companyName: ''
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleInputChange = (field, value) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };



  const isFormValid = company.companyName.trim() !== '';

  return (
    <div className="w-full">
      <div className="mb-4 p-4 border rounded-lg bg-light-background-secondary dark:bg-dark-background-secondary">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
            Company Name *
          </label>
          <input
            ref={inputRef}
            type="text"
            value={company.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="e.g. Google, Microsoft, etc."
            className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
          />
        </div>
        <button
          type="button"
          onClick={handleCompanyAdd}
          disabled={!isFormValid}
          className="w-full px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-md hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Company
        </button>
      </div>
      
      {field.value.length > 0 ? (
        <ul className="space-y-3 bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-md">
          {field.value.map((comp, index) => (
            <li key={index} className="p-4 border rounded-lg bg-white dark:bg-dark-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-grow">
                  <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-light-primary-100 dark:bg-dark-primary-100 text-light-primary-600 dark:text-dark-primary-500 text-sm font-semibold mt-1">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-light-text-primary dark:text-dark-text-primary font-semibold">
                      {comp.companyName}
                    </h4>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCompanyRemove(index)}
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
          No companies added yet. Add your work experience with different companies.
        </div>
      )}
    </div>
  );
};

export default CompanyWorkedAtList; 