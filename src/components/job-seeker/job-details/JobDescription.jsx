import React from "react";
const JobDescription = ({ description }) => (
  <section className="mb-6">
    <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">{description}</p>
  </section>
);
export default JobDescription;