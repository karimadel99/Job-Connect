import React from 'react';
import {
  FaBirthdayCake,
  FaFlag,
  FaHeart,
  FaVenusMars,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaSave,
  FaUserCheck,
  FaFileAlt,
  FaDownload,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRedditAlien,
  FaInstagram,
} from 'react-icons/fa';

const CandidateModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
    >
      {/* Outer container with max height and overflow for smaller screens */}
      <div className="relative w-full sm:max-w-lg md:max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-background rounded shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-dark-text-primary">
              {candidate.name}
            </h2>
            {/* Title under the name */}
            {candidate.title && (
              <p className="text-sm text-gray-500">{candidate.title}</p>
            )}
          </div>
          <div className="flex items-center space-x-2 mt-3 me-12 md:mt-0">
            {/* Save Candidate */}
            <button className="flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
              <FaSave className="mr-2" />
              Save Candidate
            </button>
            {/* Hire Candidate */}
            <button className="flex items-center px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
              <FaUserCheck className="mr-2" />
              Hire
            </button>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-600 text-4xl"
            >
              &times;
            </button>

          </div>
        </div>

        {/* Body */}
        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side: Biography & Cover Letter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
              Biography
            </h3>
            <p className="text-sm text-gray-700 dark:text-dark-text-primary mb-6">
              {candidate.biography}
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">
              Cover Letter
            </h3>
            <p className="text-sm text-gray-700 dark:text-dark-text-primary">
              {candidate.coverLetter}
            </p>
          </div>

          {/* Right side: Personal Info, Download Resume, Contact Info */}
          <div className="flex flex-col space-y-4">
            {/* Personal Info */}
            <div className="p-4 border rounded shadow-md hover:shadow-lg transition duration-200">
              <h4 className="text-md font-semibold text-gray-800 dark:text-dark-text-primary mb-3">
                Personal Information
              </h4>
              {/* Nationality */}
              {candidate.nationality && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaFlag className="mr-2 text-gray-500" />
                  {candidate.nationality}
                </div>
              )}
              {/* Date of Birth */}
              {candidate.dateOfBirth && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaBirthdayCake className="mr-2 text-gray-500" />
                  {candidate.dateOfBirth}
                </div>
              )}
              {/* Gender */}
              {candidate.gender && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaVenusMars className="mr-2 text-gray-500" />
                  {candidate.gender}
                </div>
              )}
              {/* Marital Status */}
              {candidate.maritalStatus && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaHeart className="mr-2 text-gray-500" />
                  {candidate.maritalStatus}
                </div>
              )}
              {/* Experience */}
              {candidate.experience && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaBriefcase className="mr-2 text-gray-500" />
                  {candidate.experience}
                </div>
              )}
              {/* Education */}
              {candidate.education && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary mb-2">
                  <FaGraduationCap className="mr-2 text-gray-500" />
                  {candidate.education}
                </div>
              )}
              {/* Location */}
              {candidate.contact?.location && (
                <div className="flex items-center text-sm text-gray-700 dark:text-dark-text-primary">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  {candidate.contact.location}
                </div>
              )}
            </div>

            {/* Download Resume Card */}
            <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 flex items-center justify-between">
              <div>
                <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  Download My Resume
                </h5>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaFileAlt className="text-gray-500" />
                  <span>{candidate.name}</span>
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                    PDF
                  </span>
                </div>
              </div>
              <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <FaDownload />
              </button>
            </div>

            {/* Contact Info */}
            <div className="p-4 border rounded shadow-md hover:shadow-lg transition duration-200">
              <h4 className="text-md font-semibold text-gray-800 dark:text-dark-text-primary mb-3">
                Contact Information
              </h4>
              {/* Email */}
              {candidate.contact?.email && (
                <div className="mb-2 text-sm">
                  <span className="font-medium text-gray-600">Email: </span>
                  <span className="text-gray-700 dark:text-dark-text-primary">
                    {candidate.contact.email}
                  </span>
                </div>
              )}
              {/* Phone */}
              {candidate.contact?.phone && (
                <div className="mb-2 text-sm">
                  <span className="font-medium text-gray-600">Phone: </span>
                  <span className="text-gray-700 dark:text-dark-text-primary">
                    {candidate.contact.phone}
                  </span>
                </div>
              )}
              {/* Secondary Phone (if any) */}
              {candidate.contact?.secondaryPhone && (
                <div className="mb-2 text-sm">
                  <span className="font-medium text-gray-600">
                    Secondary Phone:{' '}
                  </span>
                  <span className="text-gray-700 dark:text-dark-text-primary">
                    {candidate.contact.secondaryPhone}
                  </span>
                </div>
              )}
              {/* Website */}
              {candidate.contact?.website && (
                <div className="text-sm">
                  <span className="font-medium text-gray-600">Website: </span>
                  <span className="text-gray-700 dark:text-dark-text-primary">
                    {candidate.contact.website}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer: Social Media Links */}
        <div className="px-4 pb-4">
          <h5 className="text-sm font-medium text-gray-700 dark:text-dark-text-primary mb-2">
            Follow me Social Media
          </h5>
          <div className="flex space-x-3">
            <a
              href="#"
              className="p-2 bg-blue-100 rounded text-blue-600 hover:bg-blue-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-100 rounded text-blue-400 hover:bg-blue-200"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-100 rounded text-blue-700 hover:bg-blue-200"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-100 rounded text-orange-500 hover:bg-orange-100"
            >
              <FaRedditAlien />
            </a>
            <a
              href="#"
              className="p-2 bg-blue-100 rounded text-pink-500 hover:bg-pink-100"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
