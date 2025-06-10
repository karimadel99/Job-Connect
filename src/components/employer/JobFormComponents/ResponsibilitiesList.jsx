import React, { useState, useRef } from 'react';

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
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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

export default ResponsibilitiesList;