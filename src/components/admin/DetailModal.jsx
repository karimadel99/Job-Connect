import React from 'react';
import { FiX } from 'react-icons/fi';
import DetailField from './DetailField';

const DetailModal = ({ item, type, onClose }) => {
  if (!item) return null;

  const renderEmployerDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailField label="ID" value={item.id} />
      <DetailField label="Company Name" value={item.companyName} />
      <DetailField label="Email" value={item.email} />
      <DetailField label="Industry" value={item.industry} />
      <DetailField label="Company Size" value={item.companySize} />
      <DetailField label="Website" value={item.website} />
      <DetailField label="Address" value={item.address} />
      <DetailField label="Company Description" value={item.companyDescription} />
      <DetailField label="Logo URL" value={item.logoUrl} />
      <DetailField label="Founding Date" value={item.foundingDate} />
      <DetailField label="Phone Number" value={item.phoneNumber} />
      <DetailField label="Jobs Count" value={item.jobsCount} />
    </div>
  );

  const renderJobSeekerDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailField label="ID" value={item.id} />
      <DetailField label="First Name" value={item.firstName} />
      <DetailField label="Last Name" value={item.lastName} />
      <DetailField label="Email" value={item.email} />
      <DetailField label="Address" value={item.address} />
      <DetailField label="Years of Experience" value={item.yearsOfExperience} />
      <DetailField label="Date of Birth" value={item.dateOfBirth} />
      <DetailField label="Nationality" value={item.nationality} />
      <DetailField label="Marital Status" value={item.maritalStatus} />
      <DetailField label="Gender" value={item.gender} />
      <DetailField label="Education" value={item.education} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] relative flex flex-col">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {type === 'employer' ? '🏢 Employer Details' : '👤 Job Seeker Details'}
        </h2>
        <div className="overflow-y-auto pr-4">
          {type === 'employer' ? renderEmployerDetails() : renderJobSeekerDetails()}
        </div>
      </div>
    </div>
  );
};

export default DetailModal; 