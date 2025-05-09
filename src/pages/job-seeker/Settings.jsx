import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';

const tabList = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'profile', label: 'Profile' },
  { key: 'account', label: 'Account Settings' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    yearsOfExperience: '',
    jobTitle: '',
    degree: '',
    bio: '',
    coverLetter: '',
    resumes: [],
    dateOfBirth: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    education: '',
    portfolio: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, resumes: [...form.resumes, ...files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background"><Loader /></div>;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-light-background dark:bg-dark-background rounded-xl shadow-lg transition-colors duration-300">
      <h3 className="text-2xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">Settings</h3>

      {/* Tabs */}
      <div className="border-b border-light-neutral-200 dark:border-dark-neutral-700 mb-8">
        <nav className="flex space-x-6">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-2 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === tab.key
                  ? 'border-light-accent-primary dark:border-dark-accent-primary text-light-accent-primary dark:text-dark-accent-primary'
                  : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              placeholder="Marital Status"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="gender"
              value={form.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <input
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
              placeholder="Years of Experience"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="jobTitle"
              value={form.jobTitle}
              onChange={handleChange}
              placeholder="Current or Desired Job Title"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Degree"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="education"
              value={form.education}
              onChange={handleChange}
              placeholder="Education"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Bio"
              rows="4"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            ></textarea>
            <textarea
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              placeholder="Cover Letter"
              rows="4"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            ></textarea>

            <div>
              <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-2">Upload Resumes</label>
              <input type="file" multiple onChange={handleResumeUpload} className="w-full" />
              <ul className="mt-2 space-y-1 text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                {form.resumes.map((file, idx) => (
                  <li key={idx}>{file.name || file}</li>
                ))}
              </ul>
            </div>

            <input
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="Portfolio Link"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              placeholder="Facebook Link"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="twitter"
              value={form.twitter}
              onChange={handleChange}
              placeholder="Twitter Link"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              placeholder="Instagram Link"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
            <input
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn Link"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">Change Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary dark:bg-dark-background-secondary dark:text-dark-text-primary transition-shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-3 bg-light-accent-primary dark:bg-dark-accent-primary text-light-text-inverse dark:text-dark-text-inverse rounded-lg hover:bg-light-accent-secondary dark:hover:bg-dark-accent-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary transition-all duration-200"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}