import React, { useState, useEffect } from 'react';
import { getCompanyInfo, updateCompanyInfo, getFoundingInfo, updateFoundingInfo } from '../../api/employerSettingsApi';
import { toast } from 'react-hot-toast';
import CompanyInfoForm from '../../components/employer/CompanyInfoForm';
import FoundingInfoForm from '../../components/employer/FoundingInfoForm';
import AccountSettings from '../../components/employer/AccountSettings';
import Loader from '../../components/Loader';


const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    image: null,
    about: '',
    logoUrl: '',
  });

  const [foundingInfo, setFoundingInfo] = useState({
    industry: '',
    companySize: '',
    foundingDate: '',
    website: '',
    phoneNumber: '',
  });

  const [accountInfo, setAccountInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const toastId = toast.loading('Loading settings...');
      try {
        const companyResult = await getCompanyInfo();
        if (companyResult.success) {
          setCompanyInfo({
            name: companyResult.data.companyName || '',
            about: companyResult.data.companyDescription || '',
            image: null,
            logoUrl: companyResult.data.logoUrl || '',
          });
        } else {
          setError(companyResult.error);
        }

        const foundingResult = await getFoundingInfo();
        if (foundingResult.success) {
          setFoundingInfo({
            industry: foundingResult.data.industry || '',
            companySize: foundingResult.data.companySize || '',
            foundingDate: foundingResult.data.foundingDate ? foundingResult.data.foundingDate.split('T')[0] : '',
            website: foundingResult.data.website || '',
            phoneNumber: foundingResult.data.phoneNumber || '',
          });
        } else {
          setError(foundingResult.error);
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching data.');
      }
      setLoading(false);
      toast.dismiss(toastId);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full md:max-w-4xl md:mx-auto p-2 sm:p-4 md:p-8 space-y-8 bg-light-background dark:bg-dark-background rounded-lg shadow-md transition-all duration-300">
      <h3 className="text-display-1 font-bold mb-8 text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
        Settings
      </h3>

      {loading && (
        <div className="flex justify-center items-center">
          {/* Loader removed, toast will show loading */}
        </div>
      )}
      {error && <p className="text-center text-light-error dark:text-dark-error">{error}</p>}

      <div className="border-b border-light-neutral-200 dark:border-dark-neutral-700 mb-8 transition-colors duration-300">
        <nav className="flex space-x-8">
          {['company', 'founding', 'settings'].map((tab) => (
            <button
              key={tab}
              className={`py-3 ms-1 border-b-2 font-medium transition-all duration-300 transform hover:scale-105 ${
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

      {activeTab === 'company' && (
        <CompanyInfoForm
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />
      )}

      {activeTab === 'founding' && (
        <FoundingInfoForm
          foundingInfo={foundingInfo}
          setFoundingInfo={setFoundingInfo}
          loading={loading}
          setLoading={setLoading}
          setError={setError}
        />
      )}

      {activeTab === 'settings' && (
        <AccountSettings
          accountInfo={accountInfo}
          setAccountInfo={setAccountInfo}
          loading={loading}
          showCurrentPassword={showCurrentPassword}
          setShowCurrentPassword={setShowCurrentPassword}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
        />
      )}
    </div>
  );
};

export default Settings;