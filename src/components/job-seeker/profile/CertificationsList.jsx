import React, { useState, useRef } from 'react';

const CertificationsList = ({ field, form }) => {
  const [certification, setCertification] = useState({
    certificationName: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: ''
  });
  const inputRef = useRef(null);
  
  const handleCertificationRemove = (index) => {
    const newCertifications = [...field.value];
    newCertifications.splice(index, 1);
    form.setFieldValue(field.name, newCertifications);
  };
  
  const handleCertificationAdd = () => {
    if (certification.certificationName.trim() !== '' && certification.issuingOrganization.trim() !== '') {
      const newCertification = {
        certificationName: certification.certificationName.trim(),
        issuingOrganization: certification.issuingOrganization.trim(),
        issueDate: certification.issueDate || new Date().toISOString().split('T')[0],
        expiryDate: certification.expiryDate || null
      };
      form.setFieldValue(field.name, [...field.value, newCertification]);
      setCertification({
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: ''
      });
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  const handleInputChange = (field, value) => {
    setCertification(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      // Handle both ISO string and date string formats
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const isFormValid = certification.certificationName.trim() !== '' && certification.issuingOrganization.trim() !== '';

  return (
    <div className="w-full">
      <div className="mb-4 p-4 border rounded-lg bg-light-background-secondary dark:bg-dark-background-secondary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
              Certification Name *
            </label>
            <input
              ref={inputRef}
              type="text"
              value={certification.certificationName}
              onChange={(e) => handleInputChange('certificationName', e.target.value)}
              placeholder="e.g. AWS Solutions Architect"
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
              Issuing Organization *
            </label>
            <input
              type="text"
              value={certification.issuingOrganization}
              onChange={(e) => handleInputChange('issuingOrganization', e.target.value)}
              placeholder="e.g. Amazon Web Services"
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
              Issue Date
            </label>
            <input
              type="date"
              value={formatDateForInput(certification.issueDate)}
              onChange={(e) => handleInputChange('issueDate', e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={formatDateForInput(certification.expiryDate)}
              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleCertificationAdd}
          disabled={!isFormValid}
          className="w-full px-4 py-2 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-md hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Certification
        </button>
      </div>
      
      {field.value.length > 0 ? (
        <ul className="space-y-3 bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-md">
          {field.value.map((cert, index) => (
            <li key={index} className="p-4 border rounded-lg bg-white dark:bg-dark-neutral-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start flex-grow">
                  <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-light-primary-100 dark:bg-dark-primary-100 text-light-primary-600 dark:text-dark-primary-500 text-sm font-semibold mt-1">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-light-text-primary dark:text-dark-text-primary font-semibold mb-1">
                      {cert.certificationName}
                    </h4>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-2">
                      {cert.issuingOrganization}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-light-text-tertiary dark:text-dark-text-tertiary">
                      <span>
                        <strong>Issued:</strong> {formatDate(cert.issueDate)}
                      </span>
                      {cert.expiryDate && (
                        <span>
                          <strong>Expires:</strong> {formatDate(cert.expiryDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCertificationRemove(index)}
                  className="ml-3 text-light-text-tertiary dark:text-dark-text-tertiary hover:text-light-error dark:hover:text-dark-error transition-colors"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-light-text-tertiary dark:text-dark-text-tertiary italic mt-2 text-center py-8">
          No certifications added yet. Add your professional certifications and credentials.
        </div>
      )}
    </div>
  );
};

export default CertificationsList; 