import React, { useState } from 'react';
import { updateFoundingInfo } from '../../api/employerSettingsApi';
import { toast } from 'react-hot-toast';
import PhoneInput from '../public/PhoneInput';

const FoundingInfoForm = ({ foundingInfo, setFoundingInfo, loading, setLoading, setError }) => {
  const [phoneError, setPhoneError] = useState('');

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.trim() === '') {
      return true; // Allow empty values since it's optional
    }
    // Remove non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    // Check if it has reasonable length for a phone number (7-15 digits including country code)
    return cleaned.length >= 7 && cleaned.length <= 15;
  };

  const handleFoundingInfoChange = (e) => {
    const { name, value } = e.target;
    setFoundingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const phoneNumber = e.target.value;
    setFoundingInfo((prev) => ({ ...prev, phoneNumber }));
    
    // Validate phone number
    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleSaveFoundingInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!foundingInfo.industry || !foundingInfo.companySize || !foundingInfo.foundingDate) {
      setError('Please fill in all required fields (Industry, Company Size, Founding Date).');
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    // Validate phone number before saving
    if (foundingInfo.phoneNumber && !validatePhoneNumber(foundingInfo.phoneNumber)) {
      setError('Please enter a valid phone number.');
      toast.error('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    const formattedFoundingInfo = {
      ...foundingInfo,
      foundingDate: new Date(foundingInfo.foundingDate).toISOString(),
      // Convert empty phone number to null for API compatibility
      phoneNumber: foundingInfo.phoneNumber && foundingInfo.phoneNumber.trim() !== '' ? foundingInfo.phoneNumber : null,
    };

    const result = await updateFoundingInfo(formattedFoundingInfo);

    if (result.success) {
      toast.success('Founding info updated successfully!');
    } else {
      setError(result.error);
      toast.error(`Error: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSaveFoundingInfo} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Industry *
        </label>
        <input
          type="text"
          name="industry"
          required
          value={foundingInfo.industry}
          onChange={handleFoundingInfoChange}
          className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Company Size *
        </label>
        <select
          name="companySize"
          required
          value={foundingInfo.companySize}
          onChange={handleFoundingInfoChange}
          className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
        >
          <option value="">Select size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Founding Date *
        </label>
        <input
          type="date"
          name="foundingDate"
          required
          value={foundingInfo.foundingDate}
          onChange={handleFoundingInfoChange}
          className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Website (Optional)
        </label>
        <input
          type="url"
          name="website"
          value={foundingInfo.website}
          onChange={handleFoundingInfoChange}
          className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Phone Number (Optional)
        </label>
        <PhoneInput
          name="phoneNumber"
          value={foundingInfo.phoneNumber}
          onChange={handlePhoneChange}
          onBlur={() => {}}
          error={phoneError}
          touched={!!phoneError}
          buttonClassName="shrink-0 z-10 inline-flex items-center py-2 px-3 text-sm font-medium text-light-text-primary dark:text-dark-text-primary bg-light-background dark:bg-dark-neutral-700 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-l-md shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600"
          inputClassName="block w-full py-2 px-3 border-l-0 border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 rounded-r-md shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
          dropdownClassName="absolute top-full left-0 z-20 bg-light-background dark:bg-dark-neutral-700 divide-y divide-light-neutral-200 dark:divide-dark-neutral-700 rounded-lg shadow-lg w-64 max-h-60 overflow-y-auto border border-light-neutral-200 dark:border-dark-neutral-700"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-light-text-primary dark:text-dark-text-primary bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default FoundingInfoForm;