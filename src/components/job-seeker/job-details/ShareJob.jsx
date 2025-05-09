import React from "react";
const ShareJob = ({ job }) => {
  const url = window.location.href;
  const text = encodeURIComponent(`Check out this job: ${job.title} at ${job.company}`);
  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Share this job:</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 text-xs">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 text-xs">Twitter</a>
      <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${text}`} target="_blank" rel="noopener noreferrer" className="bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 text-xs">Pinterest</a>
    </div>
  );
};
export default ShareJob;