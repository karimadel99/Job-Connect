import React from 'react';

const DetailField = ({ label, value }) => (
  <div className="bg-gray-50 dark:bg-dark-neutral-700 p-3 rounded-lg">
    <span className="font-semibold text-sm text-gray-600 dark:text-gray-300">{label}:</span>
    <p className="mt-1 text-gray-800 dark:text-gray-100 break-words">
      {value === 'N/A' || !value ? (
        <span className="text-gray-400">Not available</span>
      ) : (
        value
      )}
    </p>
  </div>
);

export default DetailField; 