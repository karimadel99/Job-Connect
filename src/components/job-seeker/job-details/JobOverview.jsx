import React from "react";
const JobOverview = ({ job }) => {
  // Compose salary string
  let salary = "-";
  if (job.minSalary && job.maxSalary) {
    salary = `${job.minSalary} - ${job.maxSalary} ${job.salaryType ? `/ ${job.salaryType}` : ""}`;
  } else if (job.minSalary) {
    salary = `${job.minSalary} ${job.salaryType ? `/ ${job.salaryType}` : ""}`;
  } else if (job.maxSalary) {
    salary = `${job.maxSalary} ${job.salaryType ? `/ ${job.salaryType}` : ""}`;
  }
  // Format job type
  const jobType = job.jobType ? job.jobType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) : "-";
  return (
    <div className="bg-light-neutral-50 dark:bg-dark-neutral-700 rounded-lg p-4 mb-6">
      <h3 className="font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">Job Overview</h3>
      <ul className="text-sm text-light-text-secondary dark:text-dark-text-secondary space-y-1">
        <li><strong>Posted date:</strong> {job.postedDate || "-"}</li>
        <li><strong>Location:</strong> {job.location || "-"}</li>
        <li><strong>Job nature:</strong> {jobType}</li>
        <li><strong>Salary:</strong> {salary}</li>
        <li><strong>Experience:</strong> {job.experience || "-"}</li>
      </ul>
    </div>
  );
};
export default JobOverview;