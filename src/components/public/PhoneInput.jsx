import React, { useState, useEffect, useRef } from 'react';

const countries = [
  { name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { name: "Bangladesh", dialCode: "+880", flag: "🇧🇩" },
  { name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { name: "Brunei", dialCode: "+673", flag: "🇧🇳" },
  { name: "Burkina Faso", dialCode: "+226", flag: "🇧🇫" },
  { name: "Cambodia", dialCode: "+855", flag: "🇰🇭" },
  { name: "Cameroon", dialCode: "+237", flag: "🇨🇲" },
  { name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { name: "Cape Verde", dialCode: "+238", flag: "🇨🇻" },
  { name: "Central African Republic", dialCode: "+236", flag: "🇨🇫" },
  { name: "Chad", dialCode: "+235", flag: "🇹🇩" },
  { name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { name: "China", dialCode: "+86", flag: "🇨🇳" },
  { name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { name: "Comoros", dialCode: "+269", flag: "🇰🇲" },
  { name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { name: "Dominica", dialCode: "+1-767", flag: "🇩🇲" },
  { name: "Ecuador", dialCode: "+593", flag: "🇪🇨" },
  { name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { name: "El Salvador", dialCode: "+503", flag: "🇸🇻" },
  { name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { name: "France", dialCode: "+33", flag: "🇫🇷" },
];

const PhoneInput = ({ name, value, onChange, onBlur, error, touched }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const wrapperRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex items-center">
        <button 
          type="button"
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-light-text-primary dark:text-dark-text-primary bg-light-primary-50 dark:bg-dark-primary-50 border-2 border-light-primary-100 dark:border-dark-primary-200 rounded-l-lg hover:bg-light-primary-100 dark:hover:bg-dark-primary-100 focus:ring-2 focus:outline-none focus:ring-light-primary-300 dark:focus:ring-dark-primary-300 h-11"
        >
          <span className="mr-2">{selectedCountry.flag}</span>
          {selectedCountry.dialCode}
          <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 z-20 bg-light-background dark:bg-dark-background divide-y divide-light-primary-100 dark:divide-dark-primary-200 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto">
            <ul className="py-2 text-sm text-light-text-primary dark:text-dark-text-primary">
              {countries.map((country, index) => (
                <li key={index}>
                  <button 
                    type="button"
                    onClick={() => selectCountry(country)}
                    className="w-full text-left px-4 py-2 hover:bg-light-primary-50 dark:hover:bg-dark-primary-50"
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name} ({country.dialCode})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <input 
          type="tel"
          name={name}
          id="phone-input"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          placeholder="123-456-7890"
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="block p-2.5 w-full z-20 text-light-text-primary dark:text-dark-text-primary bg-light-primary-50 dark:bg-dark-primary-50 border-2 border-l-0 border-light-primary-100 dark:border-dark-primary-200 rounded-r-lg focus:ring-2 focus:outline-none focus:ring-light-primary-300 dark:focus:ring-dark-primary-300 h-11"
        />
      </div>
      {touched && error && <p className="mt-1 text-sm text-light-error dark:text-dark-error">{error}</p>}
    </div>
  );
};

export default PhoneInput;
