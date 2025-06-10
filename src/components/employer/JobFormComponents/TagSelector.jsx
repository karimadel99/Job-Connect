import React, { useState, useRef, useEffect, useMemo } from 'react';

const TagSelector = ({ field, form, jobTagsOptions }) => {
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

  const filteredSuggestions = useMemo(() => {
    return jobTagsOptions.filter(
      option =>
        !field.value.includes(option) &&
        option.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [field.value, inputValue, jobTagsOptions]);

  return (
    <div className="w-full relative">
      <div
        className="w-full px-4 py-1 border border-light-neutral-200 rounded-lg bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
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
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            aria-expanded={showSuggestions}
          />
        </div>
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          id="suggestions-list"
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

export default TagSelector;