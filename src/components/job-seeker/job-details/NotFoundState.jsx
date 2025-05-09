import React from "react";
const NotFoundState = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <span className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">Job Not Found</span>
    <span className="text-light-text-secondary dark:text-dark-text-secondary">Sorry, the job you are looking for does not exist.</span>
  </div>
);
export default NotFoundState;