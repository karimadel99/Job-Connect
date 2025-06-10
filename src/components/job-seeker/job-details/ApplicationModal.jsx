import React from "react";
import { FiX } from "react-icons/fi";

const ApplicationModal = ({
  job,
  showModal,
  setShowModal,
  resumes,
  resumesLoading,
  selectedResume,
  setSelectedResume,
  coverLetter,
  setCoverLetter,
  submitting,
  handleApplySubmit
}) => {
  if (!showModal) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-dark-neutral-800 rounded-lg p-6 sm:p-8 max-w-lg w-full relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary text-2xl focus:outline-none"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          <FiX />
        </button>
        {/* Header */}
        <h2 className="text-lg font-semibold mb-6 text-light-text-primary dark:text-dark-text-primary">
          Apply Job: {job?.title || "Job"}
        </h2>
        {/* Form */}
        <form onSubmit={handleApplySubmit} className="space-y-5">
          {/* Resume Select */}
          <div>
            <label className="block text-sm font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Choose Resume</label>
            <select
              className="w-full border border-light-neutral-200 dark:border-dark-neutral-700 rounded px-3 py-2 bg-light-background-primary dark:bg-dark-background-secondary text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              value={selectedResume}
              onChange={e => setSelectedResume(e.target.value)}
              required
              disabled={resumesLoading}
            >
              <option value="" className="bg-light-background-primary dark:bg-dark-background-secondary">{resumesLoading ? "Loading resumes..." : "Select..."}</option>
              {resumes && resumes.map(resume => (
                <option key={resume.id} value={resume.id} className="bg-light-background-primary dark:bg-dark-background-secondary">{resume.resumeName}</option>
              ))}
            </select>
          </div>
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium mb-1 text-light-text-primary dark:text-dark-text-primary">Cover Letter</label>
            <textarea
              className="w-full border border-light-neutral-200 dark:border-dark-neutral-700 rounded px-3 py-2 bg-light-neutral-50 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[90px] resize-y"
              placeholder="Write down your biography here. Let the employers know who you are..."
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              required
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded border border-light-neutral-200 dark:border-dark-neutral-700 bg-light-neutral-100 dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-200 dark:hover:bg-dark-neutral-600"
              onClick={() => setShowModal(false)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;