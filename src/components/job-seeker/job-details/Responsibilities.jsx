import React from "react";
const Responsibilities = ({ responsibilities }) => (
  <section className="mb-6">
    <ul className="list-disc pl-5 text-light-text-secondary dark:text-dark-text-secondary text-sm space-y-1">
      {Array.isArray(responsibilities) && responsibilities.length > 0 ? responsibilities.map((item, idx) => (
        <li key={idx}>{item}</li>
      )) : <li>No responsibilities listed.</li>}
    </ul>
  </section>
);
export default Responsibilities;