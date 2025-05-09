import React from 'react';
import { updateFoundingInfo } from '../../api/employerSettingsApi';
import { toast } from 'react-hot-toast';

const FoundingInfoForm = ({ foundingInfo, setFoundingInfo, loading, setLoading, setError }) => {
  const handleFoundingInfoChange = (e) => {
    const { name, value } = e.target;
    setFoundingInfo((prev) => ({ ...prev, [name]: value }));
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

    const formattedFoundingInfo = {
      ...foundingInfo,
      foundingDate: new Date(foundingInfo.foundingDate).toISOString(),
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
        <input
          type="tel"
          name="phoneNumber"
          value={foundingInfo.phoneNumber}
          onChange={handleFoundingInfoChange}
          className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
          placeholder="+1 (555) 000-0000"
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