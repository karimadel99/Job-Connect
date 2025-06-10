import React from 'react';
import { updateCompanyInfo } from '../../api/employerSettingsApi';
import { toast } from 'react-hot-toast';

const CompanyInfoForm = ({ companyInfo, setCompanyInfo, loading, setLoading, setError }) => {
  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };



  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await updateCompanyInfo(
      companyInfo.name,
      companyInfo.about
    );

    if (result.success) {
      toast.success('Company info updated successfully!');
    } else {
      setError(result.error);
      toast.error(`Error: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
            Company Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={companyInfo.name}
            onChange={handleCompanyInfoChange}
            className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-3 px-4 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary transition-all duration-300 hover:border-light-primary-400 dark:hover:border-dark-primary-400"
            placeholder="Enter company name"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
            About *
          </label>
          <textarea
            name="about"
            required
            value={companyInfo.about}
            onChange={handleCompanyInfoChange}
            rows={4}
            className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-3 px-4 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary transition-all duration-300 hover:border-light-primary-400 dark:hover:border-dark-primary-400 resize-y"
            placeholder="Write about your company..."
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
          </svg>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;