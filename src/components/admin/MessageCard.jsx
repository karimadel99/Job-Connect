import React from 'react';
import { FiMail, FiPhone, FiUser, FiClock } from 'react-icons/fi';

const MessageCard = ({ message }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
            <FiMail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {message.firstName} {message.lastName}
            </h4>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiUser className="w-3 h-3" />
                {message.email}
              </span>
              {message.phone && (
                <span className="flex items-center gap-1">
                  <FiPhone className="w-3 h-3" />
                  {message.phone}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
          <FiClock className="w-3 h-3" />
          {formatDate(message.createdAt)}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-900 dark:text-white leading-relaxed">
          {message.message}
        </p>
      </div>

      <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400">
          Contact Form Submission
        </span>
      </div>
    </div>
  );
};

export default MessageCard; 