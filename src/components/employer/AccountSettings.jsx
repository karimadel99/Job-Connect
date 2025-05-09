import React from 'react';
import PasswordInput from '../../components/public/PasswordInput';
import { toast } from 'react-hot-toast';
import { changeEmployerPassword } from '../../api/employerSettingsApi';

const AccountSettings = ({
  accountInfo,
  setAccountInfo,
  loading,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const handleAccountInfoChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const { currentPassword, newPassword, confirmPassword } = accountInfo;
      const response = await changeEmployerPassword(currentPassword, newPassword, confirmPassword);
      if (response.success) {
        toast.success('Password changed successfully.');
      } else {
        toast.error(`Error: ${response.error}`);
      }
    } catch (error) {
      toast.error('An error occurred while changing the password.');
    }
  };

  const handleDeleteCompany = () => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-4">
          <p className="text-sm">
            Are you sure you want to delete your company? This action cannot be undone.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                console.log('Company deletion requested');
                // TODO: Integrate company deletion API if available
                closeToast();
                toast.success('Company deletion initiated.');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Confirm
            </button>
            <button
              onClick={closeToast}
              className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  return (
    <div className="space-y-8">
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
              disabled={loading}
              className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md dark:text-dark-text-primary bg-light-primary-600 hover:bg-light-primary-500 dark:bg-dark-primary-600 dark:hover:bg-dark-primary-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-600 dark:focus:ring-offset-dark-background ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>

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
  );
};

export default AccountSettings;