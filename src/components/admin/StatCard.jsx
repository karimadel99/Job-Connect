import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

const StatCard = React.memo(({ title, value, icon: Icon, color, change, changeType = 'positive' }) => {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <FiTrendingUp className="w-3 h-3" />;
      case 'negative':
        return <FiTrendingDown className="w-3 h-3" />;
      default:
        return <FiMinus className="w-3 h-3" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40';
      case 'negative':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden group">
      {/* Gradient overlay */}
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatValue(value)}
            </h3>
          </div>
          <div className={`p-4 rounded-xl ${color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {change && (
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getChangeColor()}`}>
              {getChangeIcon()}
              <span>{change}</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom accent line */}
      <div className={`h-1 ${color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default StatCard; 