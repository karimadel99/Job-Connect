import React from 'react';
import { updateCompanyInfo } from '../../api/employerSettingsApi';
import { toast } from 'react-hot-toast';

const CompanyInfoForm = ({ companyInfo, setCompanyInfo, loading, setLoading, setError }) => {
  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setCompanyInfo((prev) => ({ ...prev, image: file, logoUrl: '' }));
    }
  };

  const handleRemoveImage = () => {
    setCompanyInfo((prev) => ({ ...prev, image: null, logoUrl: '' }));
    const input = document.getElementById('logoInput');
    if (input) input.value = '';
  };

  const handleReplaceClick = () => {
    const input = document.getElementById('logoInput');
    if (input) {
      input.value = '';
      input.click();
    }
  };

  const handleSaveCompanyInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await updateCompanyInfo(
      companyInfo.name,
      companyInfo.about,
      companyInfo.image
    );

    if (result.success) {
      toast.success('Company info updated successfully!');
      setCompanyInfo((prev) => ({ ...prev, image: null, logoUrl: result.data.logoUrl || '' }));
    } else {
      setError(result.error);
      toast.error(`Error: ${result.error}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSaveCompanyInfo} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
          Upload Logo
        </label>
        <div className="relative group">
          <div className="relative h-40 w-40 bg-light-neutral-100 dark:bg-dark-neutral-700 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
            {companyInfo.image ? (
              <>
                <img
                  src={URL.createObjectURL(companyInfo.image)}
                  alt="Company Logo"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleReplaceClick}
                      className="p-2 bg-white rounded-full text-black hover:bg-light-primary-600 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 bg-white rounded-full text-black hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : companyInfo.logoUrl ? (
              <>
                <img
                  src={companyInfo.logoUrl}
                  alt="Company Logo"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={handleReplaceClick}
                      className="p-2 bg-white rounded-full text-black hover:bg-light-primary-600 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 bg-white rounded-full text-black hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center text-light-neutral-400 dark:text-dark-neutral-400">
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm">No image uploaded</span>
              </div>
            )}
          </div>
          <input
            id="logoInput"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleImageChange}
            className="hidden"
          />
          {!companyInfo.image && !companyInfo.logoUrl && (
            <button
              type="button"
              onClick={handleReplaceClick}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Upload Logo
            </button>
          )}
          {companyInfo.image && (
            <p className="mt-2 text-sm text-light-neutral-500 dark:text-dark-neutral-400">
              Size: {((companyInfo.image.size || 0) / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>
      </div>

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