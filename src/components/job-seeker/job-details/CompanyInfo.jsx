import React from "react";
const CompanyInfo = ({ job }) => (
  <div className="bg-light-neutral-50 dark:bg-dark-neutral-700 rounded-lg p-4">
    <h3 className="font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">{job.company}</h3>
    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">{job.companyDescription || "No company description."}</div>
    <ul className="text-xs text-light-text-secondary dark:text-dark-text-secondary space-y-1 mb-2">
      <li><strong>Founded:</strong> {job.founded || "-"}</li>
      <li><strong>Organization type:</strong> {job.organizationType || "-"}</li>
      <li><strong>Company size:</strong> {job.companySize || "-"}</li>
      <li><strong>Email:</strong> {job.companyEmail || "-"}</li>
      <li><strong>Website:</strong> <a href={job.companyWebsite} target="_blank" rel="noopener noreferrer">{job.companyWebsite || "-"}</a></li>
    </ul>
    <div className="flex gap-2">
      {job.companyFacebook && <a href={job.companyFacebook} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">Facebook</a>}
      {job.companyTwitter && <a href={job.companyTwitter} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">Twitter</a>}
      {job.companyLinkedIn && <a href={job.companyLinkedIn} className="text-blue-600 hover:underline text-xs" target="_blank" rel="noopener noreferrer">LinkedIn</a>}
    </div>
  </div>
);
export default CompanyInfo;