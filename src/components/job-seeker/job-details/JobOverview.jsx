import React from "react";
import {
  HiAcademicCap,
  HiCurrencyDollar,
  HiOfficeBuilding,
  HiCalendar,
  HiUserGroup,
  HiClock,
} from "react-icons/hi";

const JobOverview = ({ job }) => {
  const salary =
    job.minSalary && job.maxSalary
      ? `${job.minSalary.toLocaleString()} - ${job.maxSalary.toLocaleString()} / ${job.salaryType}`
      : job.minSalary
      ? `From ${job.minSalary.toLocaleString()} / ${job.salaryType}`
      : job.maxSalary
      ? `Up to ${job.maxSalary.toLocaleString()} / ${job.salaryType}`
      : "Not specified";

  const items = [
    {
      icon: HiCalendar,
      label: "Posted Date",
      value: job.postedDate || "Not specified",
    },
    {
      icon: HiOfficeBuilding,
      label: "Location",
      value: job.location || "Not specified",
    },
    {
      icon: HiClock,
      label: "Job Type",
      value: job.jobType
        ? job.jobType.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())
        : "Not specified",
    },
    {
      icon: HiCurrencyDollar,
      label: "Salary",
      value: salary,
    },
    {
      icon: HiAcademicCap,
      label: "Education",
      value: job.education ? job.education[0].toUpperCase() + job.education.slice(1) : "Not specified",
    },
    {
      icon: HiUserGroup,
      label: "Vacancies",
      value: job.vacancies || "Not specified",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-background-secondary rounded-xl  ">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Job Overview</h3>
      <div className="grid grid-cols-1  gap-6">
        {items.map(({ icon: Icon, label, value }, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOverview;
