import React from 'react';

const UserAvatar = ({ user, type }) => {
  const getInitials = () => {
    if (type === 'employer') {
      return user.companyName?.[0] || 'C';
    }
    return user.firstName?.[0] || 'J';
  };

  const bgColor = type === 'employer' 
    ? 'bg-blue-100 dark:bg-blue-900' 
    : 'bg-green-100 dark:bg-green-900';
    
  const textColor = type === 'employer' 
    ? 'text-blue-700 dark:text-blue-300' 
    : 'text-green-700 dark:text-green-300';

  return (
    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center shadow-sm`}>
      <span className={`font-semibold ${textColor}`}>
        {getInitials()}
      </span>
    </div>
  );
};

export default UserAvatar; 