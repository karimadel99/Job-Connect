import React from "react";
import {
  HiMail,
  HiOfficeBuilding,
  HiCalendar,
  HiUserGroup,
} from "react-icons/hi";

const CompanyInfo = ({ job }) => {
  const employer = job.employer || {};

  const items = [
    {
      icon: HiMail,
      label: "Email",
      value: employer.email || "Not available",
      fullRow: true,
    },
    {
      icon: HiOfficeBuilding,
      label: "Industry",
      value: employer.industry || "Not specified",
    },
    {
      icon: HiUserGroup,
      label: "Company Size",
      value: employer.companySize || "Not specified",
    },
    {
      icon: HiCalendar,
      label: "Founded",
      value: employer.foundingDate
        ? new Date(employer.foundingDate).getFullYear()
        : "Not specified",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-background-secondary rounded-xl ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        About {employer.companyName || "Company"}
      </h3>
      <div className="mb-6">
        <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contact Person</h4>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {employer.name || "Not available"}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {items.map(({ icon: Icon, label, value, fullRow }, index) => (
          <div
            key={index}
            className={`flex items-start gap-4`}
          >
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white break-words">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyInfo;
