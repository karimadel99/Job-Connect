import React from 'react';

const StatCard = React.memo(({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-dark-neutral-800 rounded-lg shadow p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-light-text-primary dark:text-dark-text-primary">
          {value.toLocaleString()}
        </h3>
      </div>
      <div className={`p-3 rounded-full ${color} transition-colors shadow-md`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
));

export default StatCard; 