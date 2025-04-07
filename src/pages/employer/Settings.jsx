// src/pages/Settings.jsx (or wherever Settings is located)
import React, { useState } from 'react';
import PasswordInput from '../../components/public/PasswordInput'; // Adjust path as needed

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    image: null,
    about: '',
  });

  const [foundingInfo, setFoundingInfo] = useState({
    industry: '',
    size: '',
    foundingDate: '',
    website: '',
    phone: '',
  });

  const [accountInfo, setAccountInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Separate showPassword states for each password field
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* --------------------- Handlers for Company Info --------------------- */
  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setCompanyInfo((prev) => ({ ...prev, image: file }));
    }
  };

  const handleRemoveImage = () => {
    setCompanyInfo((prev) => ({ ...prev, image: null }));
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

  const handleSaveCompanyInfo = (e) => {
    e.preventDefault();
    console.log('Saving Company Info:', companyInfo);
  };

  /* --------------------- Handlers for Founding Info --------------------- */
  const handleFoundingInfoChange = (e) => {
    const { name, value } = e.target;
    setFoundingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveFoundingInfo = (e) => {
    e.preventDefault();
    console.log('Saving Founding Info:', foundingInfo);
  };

  /* --------------------- Handlers for Settings Tab --------------------- */
  const handleAccountInfoChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    console.log('Changing password:', accountInfo);
  };

  const handleDeleteCompany = () => {
    if (window.confirm('Are you sure you want to delete your company? This action cannot be undone.')) {
      console.log('Company deletion requested');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8 bg-light-background dark:bg-dark-background rounded-lg shadow-md transition-all duration-300">
      <h2 className="text-display-1 font-bold mb-8 text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
        Settings
      </h2>

      {/* Navigation Tabs */}
      <div className="border-b border-light-neutral-200 dark:border-dark-neutral-700 mb-8 transition-colors duration-300">
        <nav className="flex space-x-8">
          {['company', 'founding', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-4 border-b-2 font-medium transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab
                  ? 'border-light-primary-600 text-light-primary-600 dark:border-dark-primary-600 dark:text-dark-primary-600'
                  : 'border-transparent text-light-neutral-300 hover:text-light-text-primary hover:border-light-neutral-300 dark:text-dark-neutral-600 dark:hover:text-dark-text-primary dark:hover:border-dark-neutral-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Info
            </button>
          ))}
        </nav>
      </div>

      {/* Company Info Tab */}
      {activeTab === 'company' && (
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
              {!companyInfo.image && (
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
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Founding Info Tab */}
      {activeTab === 'founding' && (
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
              name="size"
              required
              value={foundingInfo.size}
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
              name="phone"
              value={foundingInfo.phone}
              onChange={handleFoundingInfoChange}
              className="mt-1 block w-full rounded-md border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-background dark:bg-dark-neutral-700 py-2 px-3 shadow-sm focus:border-light-primary-600 dark:focus:border-dark-primary-600 text-light-text-primary dark:text-dark-text-primary"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-light-text-primary dark:text-dark-text-primary bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-8">
          {/* Change Password */}
          <div className="bg-light-background dark:bg-dark-neutral-700 shadow rounded-lg p-6">
            <h3 className="text-h3 font-semibold mb-6 dark:text-dark-text-primary text-light-text-primary">
              Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <PasswordInput
                label="Current Password"
                fieldName="currentPassword"
                value={accountInfo.currentPassword}
                onChange={handleAccountInfoChange}
                showPassword={showCurrentPassword}
                setShowPassword={setShowCurrentPassword}
                required
              />
              <PasswordInput
                label="New Password"
                fieldName="newPassword"
                value={accountInfo.newPassword}
                onChange={handleAccountInfoChange}
                showPassword={showNewPassword}
                setShowPassword={setShowNewPassword}
                required
              />
              <PasswordInput
                label="Confirm Password"
                fieldName="confirmPassword"
                value={accountInfo.confirmPassword}
                onChange={handleAccountInfoChange}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                required
              />
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md dark:text-dark-text-primary bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

          {/* Delete Company */}
          <div className="bg-light-background dark:bg-dark-neutral-700 shadow rounded-lg p-6">
            <h3 className="text-h3 font-semibold mb-4 text-light-error">
              Delete Your Company
            </h3>
            <p className="text-sm mb-4 dark:text-light-neutral-300 text-dark-neutral-600">
              If you delete your company account, you will lose all job information, saved materials, followers, following companies, and shortlisted jobs. This action is irreversible.
            </p>
            <div>
              <button
                type="button"
                onClick={handleDeleteCompany}
                className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md dark:text-dark-text-primary bg-light-error dark:bg-dark-error hover:bg-light-error dark:hover:bg-dark-error transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-error dark:focus:ring-offset-dark-background"
              >
                Close Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;