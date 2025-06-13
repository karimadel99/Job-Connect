import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { getSeekerProfile, updateSeekerProfile, updateSeekerProfileDirect, deleteSeekerProfile, uploadResume, getResumes, deleteResume, parseResume, updateProfileFromParsedResume } from '../../api/jobSeekerApi';
import Loader from '../../components/Loader';
import SkillsList from '../../components/job-seeker/profile/SkillsList';
import CertificationsList from '../../components/job-seeker/profile/CertificationsList';
import CompanyWorkedAtList from '../../components/job-seeker/profile/CompanyWorkedAtList';
import WorkedAsList from '../../components/job-seeker/profile/WorkedAsList';
import PhoneInput from '../../components/public/PhoneInput';

const tabList = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'professional', label: 'Professional Info' },
  { key: 'experience', label: 'Experience' },
  { key: 'resumes', label: 'Resumes' },
  { key: 'account', label: 'Account Settings' },
];

const validationSchema = Yup.object({
  address: Yup.string(),
  yearsOfExperience: Yup.number().min(0, 'Years of experience cannot be negative'),
  degree: Yup.string(),
  currentOrDesiredJob: Yup.string(),
  bio: Yup.string(),
  coverLetter: Yup.string(),
  dateOfBirth: Yup.date().nullable().max(new Date(), 'Date of birth cannot be in the future'),
  nationality: Yup.string(),
  maritalStatus: Yup.string(),
  gender: Yup.string(),
  education: Yup.string(),
  portfolio: Yup.string().nullable(),
  facebookLink: Yup.string().nullable(),
  twitterLink: Yup.string().nullable(),
  instagramLink: Yup.string().nullable(),
  linkedInLink: Yup.string().nullable(),
  collegeName: Yup.string(),
  university: Yup.string(),
  phoneNumber: Yup.string()
    .nullable()
    .test('phone', 'Please enter a valid phone number', function(value) {
      if (!value || value.trim() === '') return true; // Allow empty values
      // Remove non-digit characters except +
      const cleaned = value.replace(/[^\d+]/g, '');
      // Check if it has reasonable length for a phone number (7-15 digits including country code)
      return cleaned.length >= 7 && cleaned.length <= 15;
    }),
  certifications: Yup.array().of(
    Yup.object({
      certificationName: Yup.string()
    })
  ),
  companyWorkedAt: Yup.array().of(
    Yup.object({
      companyName: Yup.string()
    })
  ),
  skills: Yup.array().of(
    Yup.object({
      skillName: Yup.string(),
      proficiencyLevel: Yup.number().min(1, 'Minimum proficiency is 1').max(10, 'Maximum proficiency is 10')
    })
  ),
  workedAs: Yup.array().of(
    Yup.object({
      jobTitle: Yup.string()
    })
  ),
});

export default function Settings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [resumeLoading, setResumeLoading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const initialValues = {
    address: '',
    yearsOfExperience: 0,
    degree: '',
    currentOrDesiredJob: '',
    bio: '',
    coverLetter: '',
    dateOfBirth: '',
    nationality: '',
    maritalStatus: '',
    gender: '',
    education: '',
    portfolio: '',
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    linkedInLink: '',
    collegeName: '',
    university: '',
    certifications: [],
    companyWorkedAt: [],
    skills: [],
    workedAs: [],
    phoneNumber: '',
    // Note: firstName, lastName, email are not included as they're user account info
    // and typically managed separately from profile settings
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getSeekerProfile();
        if (response.error) {
          toast.error(response.error);
        } else {
          console.log('Profile data received:', response);
          // The actual profile data is nested in response.data
          const profileData = response.data;
          console.log('Extracted profile data:', profileData);
          setProfileData(profileData);
        }
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setResumeLoading(true);
    console.log('Fetching resumes...');
    try {
      const response = await getResumes();
      console.log('Resumes fetch response:', response);
      
      if (response.error) {
        console.error('Failed to fetch resumes:', response.error);
        toast.error(response.error);
      } else {
        console.log('Resumes data received:', response.data);
        setResumes(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching resumes:', error);
      toast.error('Failed to load resumes');
    } finally {
      setResumeLoading(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('Starting resume upload for file:', file.name, 'Type:', file.type, 'Size:', file.size);

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size);
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      console.log('FormData created, uploading resume...');
      console.log('FormData entries:', Array.from(formData.entries()));

      // First, upload the resume
      const uploadResponse = await uploadResume(formData);
      if (uploadResponse.error) {
        console.error('Upload failed with error:', uploadResponse.error);
        toast.error(uploadResponse.error);
        return;
      }

      console.log('Upload successful, response data:', uploadResponse.data || uploadResponse);
      toast.success('Resume uploaded successfully!');

      // Then, parse the resume
      console.log('Parsing resume...');
      const parseResponse = await parseResume(formData);
      if (parseResponse.error) {
        console.error('Parse failed with error:', parseResponse.error);
        toast.error('Resume uploaded but parsing failed: ' + parseResponse.error);
        return;
      }

      console.log('Parse successful, raw parseResponse:', parseResponse);
      console.log('Parse successful, parseResponse type:', typeof parseResponse);
      console.log('Parse successful, parseResponse keys:', Object.keys(parseResponse || {}));
      
      // The parsed data should be the parseResponse itself, not parseResponse.data
      const actualParsedData = parseResponse;

      // Finally, update the profile with parsed data
      console.log('Updating profile with parsed data...');
      
      // Transform parsed data directly to updateSeekerProfile format
      const transformParsedDataForDirectUpdate = (parsedData) => {
        // Helper functions (same as in updateProfileFromParsedResume)
        const safeGetArray = (data, key) => {
          const value = data[key];
          if (!value) return [];
          if (Array.isArray(value)) return value;
          if (typeof value === 'string') return [value];
          return [];
        };
        
        const safeGetFirst = (data, key) => {
          const array = safeGetArray(data, key);
          return array.length > 0 ? array[0] : null;
        };
        
        const cleanText = (text) => {
          if (!text) return '';
          return text.trim()
            .replace(/[•\-\n\r\t]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        };
        
        // Extract and clean data
        const skills = safeGetArray(parsedData, 'SKILLS')
          .concat(safeGetArray(parsedData, 'skills'))
          .map(skill => cleanText(skill))
          .filter(skill => skill && skill.length > 1)
          .map(skill => ({ skillName: skill }));
        
        const certifications = safeGetArray(parsedData, 'CERTIFICATION')
          .concat(safeGetArray(parsedData, 'certification'))
          .map(cert => cleanText(cert))
          .filter(cert => cert && cert.length > 3)
          .map(cert => ({ certificationName: cert }));
        
        const companies = safeGetArray(parsedData, 'COMPANIES WORKED AT')
          .concat(safeGetArray(parsedData, 'company'))
          .map(company => cleanText(company))
          .filter(company => company && company.length > 2)
          .map(company => ({ companyName: company }));
        
        const positions = safeGetArray(parsedData, 'WORKED AS')
          .concat(safeGetArray(parsedData, 'position'))
          .map(position => cleanText(position))
          .filter(position => position && position.length > 3)
          .map(position => ({ jobTitle: position }));
        
        const address = cleanText(safeGetFirst(parsedData, 'LOCATION'));
        const degree = cleanText(safeGetFirst(parsedData, 'DEGREE'));
        const currentOrDesiredJob = positions.length > 0 ? cleanText(positions[0].jobTitle) : null;
        
        // Generate bio
        const name = cleanText(safeGetFirst(parsedData, 'NAME'));
        let bio = '';
        if (name || degree || positions.length > 0 || skills.length > 0) {
          const bioparts = [];
          if (name) bioparts.push(`I am ${name}`);
          if (degree) bioparts.push(`with a ${degree}`);
          if (positions.length > 0) {
            const jobTitles = positions.slice(0, 2).map(p => p.jobTitle).join(' and ');
            bioparts.push(`experienced as ${jobTitles}`);
          }
          if (skills.length > 0) {
            const topSkills = skills.slice(0, 5).map(s => s.skillName).join(', ');
            bioparts.push(`skilled in ${topSkills}`);
          }
          bio = bioparts.join(', ') + '.';
          bio = bio.replace(/^I am ,/, 'I am').replace(/,\s*,/g, ',').replace(/,\s*\./g, '.').replace(/^,\s*/, '').trim();
        }
        
        // Return only fields with data
        const profileData = {};
        if (address) profileData.address = address;
        if (degree) profileData.degree = degree;
        if (currentOrDesiredJob) profileData.currentOrDesiredJob = currentOrDesiredJob;
        if (bio) profileData.bio = bio;
        if (skills.length > 0) profileData.skills = skills;
        if (certifications.length > 0) profileData.certifications = certifications;
        if (companies.length > 0) profileData.companyWorkedAt = companies;
        if (positions.length > 0) profileData.workedAs = positions;
        
        return profileData;
      };
      
      const parsedProfileData = transformParsedDataForDirectUpdate(actualParsedData);
      console.log('Parsed profile data to send:', parsedProfileData);
      console.log('Number of fields to update:', Object.keys(parsedProfileData).length);
      console.log('Fields being updated:', Object.keys(parsedProfileData));
      
      if (Object.keys(parsedProfileData).length === 0) {
        toast.error('Resume uploaded and parsed, but no profile data could be extracted from it.');
              } else {
          // Use the direct update function to ensure parsed data is sent regardless of form state
          const updateResponse = await updateSeekerProfileDirect(parsedProfileData);
          if (updateResponse.error) {
            console.error('Profile update failed with error:', updateResponse.error);
            toast.error('Resume parsed but profile update failed: ' + updateResponse.error);
          } else {
            console.log('Profile updated successfully with parsed data');
            toast.success('Resume uploaded and profile updated with extracted data!');
            
            // Refresh the profile data to show the updates
            const refreshedProfile = await getSeekerProfile();
            if (!refreshedProfile.error) {
              setProfileData(refreshedProfile.data);
            }
          }
        }
      
      // Refresh the resumes list
      console.log('Refreshing resume list...');
      await fetchResumes();
      
      // Clear the input
      event.target.value = '';
    } catch (error) {
      console.error('Upload/parse/update error caught:', error);
      toast.error('Failed to process resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleDeleteResume = async (resumeId, resumeName) => {
    if (!window.confirm(`Are you sure you want to delete "${resumeName}"?`)) {
      return;
    }

    try {
      const response = await deleteResume(resumeId);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Resume deleted successfully!');
        fetchResumes(); // Refresh the list
      }
    } catch (error) {
      toast.error('Failed to delete resume');
      console.error('Error deleting resume:', error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('handleSubmit called with values:', values);
    console.log('setSubmitting function:', setSubmitting);
    
    try {
      // Send the ENTIRE profile, no change detection
      console.log('Sending entire profile to API...');
      
      // Transform all values for API
      const allValues = { ...values };
      
      // Convert dateOfBirth to ISO format if it exists
      if (allValues.dateOfBirth && allValues.dateOfBirth.trim() !== '') {
        try {
          // For date inputs that come as YYYY-MM-DD, convert to ISO string
          const date = new Date(allValues.dateOfBirth + 'T00:00:00.000Z');
          allValues.dateOfBirth = date.toISOString();
        } catch (e) {
          console.error('Error parsing dateOfBirth:', e);
          allValues.dateOfBirth = null;
        }
      } else {
        allValues.dateOfBirth = null;
      }
      
      // Convert empty string fields to null for API compatibility
      const fieldsToNullify = ['portfolio', 'facebookLink', 'twitterLink', 'instagramLink', 'linkedInLink', 'address', 'nationality', 'maritalStatus', 'gender', 'degree', 'currentOrDesiredJob', 'bio', 'coverLetter', 'education', 'collegeName', 'university', 'phoneNumber'];
      fieldsToNullify.forEach(field => {
        if (allValues[field] === '' || (typeof allValues[field] === 'string' && allValues[field].trim() === '')) {
          allValues[field] = null;
        }
      });
      
      // Handle yearsOfExperience - ensure it's a number
      if (allValues.yearsOfExperience === '' || allValues.yearsOfExperience === null) {
        allValues.yearsOfExperience = 0;
      } else {
        allValues.yearsOfExperience = Number(allValues.yearsOfExperience);
      }
      
      // Handle array fields - clean and format them properly
      const arrayFields = ['skills', 'certifications', 'companyWorkedAt', 'workedAs'];
      arrayFields.forEach(field => {
        const currentArray = allValues[field] || [];
        
        console.log(`Processing ${field} array:`, {
          current: currentArray,
          count: currentArray.length
        });
        
        // Clean and format the arrays
        const resultArray = [];
        
        if (field === 'skills') {
          currentArray
            .filter(item => item && typeof item === 'object' && item.skillName && item.skillName.trim())
            .forEach(item => {
              resultArray.push({
                skillName: item.skillName.toString().trim()
              });
            });
            
        } else if (field === 'certifications') {
          currentArray
            .filter(item => item && typeof item === 'object' && item.certificationName && item.certificationName.trim())
            .forEach(item => {
              resultArray.push({
                certificationName: item.certificationName.toString().trim()
              });
            });
            
        } else if (field === 'companyWorkedAt') {
          currentArray
            .filter(item => item && typeof item === 'object' && item.companyName && item.companyName.trim())
            .forEach(item => {
              resultArray.push({
                companyName: item.companyName.toString().trim()
              });
            });
            
        } else if (field === 'workedAs') {
          currentArray
            .filter(item => item && typeof item === 'object' && item.jobTitle && item.jobTitle.trim())
            .forEach(item => {
              resultArray.push({
                jobTitle: item.jobTitle.toString().trim()
              });
            });
        }
        
        allValues[field] = resultArray;
        console.log(`Final ${field} for API (${resultArray.length} items):`, allValues[field]);
      });
      
      console.log('Sending ENTIRE profile to API:', allValues);
      console.log('JSON representation:', JSON.stringify(allValues, null, 2));
      
      const response = await updateSeekerProfile(allValues);
      console.log('API Response:', response);
      
      if (response.error) {
        console.error('Update failed with error:', response.error);
        toast.error(`Failed to update profile: ${response.error}`);
      } else {
        console.log('Update successful, response:', response);
        toast.success('Entire profile saved successfully!');
        
        // Re-fetch profile data since update only returns success message
        try {
          const updatedProfile = await getSeekerProfile();
          if (updatedProfile.error) {
            toast.error('Failed to refresh profile data');
          } else {
            const updatedProfileData = updatedProfile.data;
            setProfileData(updatedProfileData);
            console.log('Profile refreshed after update');
          }
        } catch (error) {
          console.error('Error refreshing profile:', error);
          toast.error('Profile updated but failed to refresh data');
        }
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteSeekerProfile();
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Profile deleted successfully!');
        // Redirect to login or home page after deletion
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Failed to delete profile');
      console.error('Error deleting profile:', error);
    }
    setShowDeleteConfirmation(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background"><Loader /></div>;

  // Transform profile data to match form field names and format dates
  const transformProfileData = (data) => {
    if (!data) return initialValues;
    
    console.log('Transforming profile data:', data);
    const transformed = { ...initialValues };
    
    // Map all the direct fields
    Object.keys(initialValues).forEach(key => {
      if (data.hasOwnProperty(key)) {
        if (key === 'dateOfBirth') {
          // Format date for date input (YYYY-MM-DD), handle null
          if (data[key] && data[key] !== null) {
            try {
              transformed[key] = new Date(data[key]).toISOString().split('T')[0];
            } catch (e) {
              transformed[key] = '';
            }
          } else {
            transformed[key] = '';
          }
        } else if (Array.isArray(initialValues[key])) {
          // Handle arrays (skills, certifications, etc.)
          transformed[key] = Array.isArray(data[key]) ? data[key] : [];
        } else {
          // Handle regular fields, convert null to empty string for form inputs
          transformed[key] = data[key] !== null ? data[key] : '';
        }
      }
    });
    
    console.log('Transformed form values:', transformed);
    return transformed;
  };

  const formInitialValues = transformProfileData(profileData);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-light-background dark:bg-dark-background rounded-xl shadow-lg transition-colors duration-300">
      <h3 className="text-2xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">Job Seeker Profile Settings</h3>

      {/* Tabs */}
      <div className="border-b border-light-neutral-200 dark:border-dark-neutral-700 mb-8">
        <nav className="flex space-x-6">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-2 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === tab.key
                  ? 'border-light-primary-500 dark:border-dark-primary-500 text-light-primary-600 dark:text-dark-primary-400'
                  : 'border-transparent text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, errors, touched, values, isValid }) => {
          console.log('Current form values:', values);
          console.log('Form errors:', errors);
          console.log('Form is valid:', isValid);
          console.log('Is submitting:', isSubmitting);
          return (
          <Form className="space-y-8">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Personal Information</h4>
                
                {/* Display user account info (read-only) */}
                {profileData && (profileData.firstName || profileData.lastName || profileData.email) && (
                  <div className="bg-light-background-secondary dark:bg-dark-background-secondary p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-3">Account Information (Read-only)</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {profileData.firstName && (
                        <div>
                          <span className="text-light-text-tertiary dark:text-dark-text-tertiary">First Name:</span>
                          <span className="ml-2 text-light-text-primary dark:text-dark-text-primary">{profileData.firstName}</span>
                        </div>
                      )}
                      {profileData.lastName && (
                        <div>
                          <span className="text-light-text-tertiary dark:text-dark-text-tertiary">Last Name:</span>
                          <span className="ml-2 text-light-text-primary dark:text-dark-text-primary">{profileData.lastName}</span>
                        </div>
                      )}
                      {profileData.email && (
                        <div>
                          <span className="text-light-text-tertiary dark:text-dark-text-tertiary">Email:</span>
                          <span className="ml-2 text-light-text-primary dark:text-dark-text-primary">{profileData.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Phone Number (Optional)</label>
                    <Field name="phoneNumber">
                      {({ field, form, meta }) => (
                        <PhoneInput
                          name={field.name}
                          value={field.value || ''}
                          onChange={(e) => {
                            const phoneNumber = e.target.value;
                            form.setFieldValue('phoneNumber', phoneNumber);
                          }}
                          onBlur={field.onBlur}
                          error={meta.error}
                          touched={meta.touched}
                          onCountryChange={(country) => {
                            // Optionally handle country change
                            console.log('Country changed:', country);
                          }}
                          inputClassName="block p-2.5 w-full z-20 text-light-text-primary dark:text-dark-text-primary bg-light-background dark:bg-dark-background-secondary border border-light-neutral-300 dark:border-dark-neutral-600 rounded-r-lg focus:ring-2 focus:outline-none focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 h-11"
                          buttonClassName="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-light-text-primary dark:text-dark-text-primary bg-light-background dark:bg-dark-background-secondary border border-light-neutral-300 dark:border-dark-neutral-600 border-r-0 rounded-l-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 focus:ring-2 focus:outline-none focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 h-11"
                          dropdownClassName="absolute top-full left-0 z-20 bg-light-background dark:bg-dark-background-secondary divide-y divide-light-neutral-200 dark:divide-dark-neutral-700 rounded-lg shadow-lg border border-light-neutral-300 dark:border-dark-neutral-600 w-64 max-h-60 overflow-y-auto"
                        />
                      )}
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Address</label>
                    <Field
                      name="address"
                      placeholder="Your current address"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.address && touched.address && (
                      <div className="text-red-500 text-sm mt-1">{errors.address}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Date of Birth</label>
                    <Field
                      name="dateOfBirth"
                      type="date"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <div className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Nationality</label>
                    <Field
                      name="nationality"
                      placeholder="Your nationality"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Marital Status</label>
                    <Field
                      as="select"
                      name="maritalStatus"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    >
                      <option value="">Select marital status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </Field>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Gender</label>
                    <Field
                      as="select"
                      name="gender"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </Field>
                  </div>
                </div>
              </div>
            )}

            {/* Professional Info Tab */}
            {activeTab === 'professional' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Professional Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Years of Experience</label>
                    <Field
                      name="yearsOfExperience"
                      type="number"
                      min="0"
                      placeholder="0"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.yearsOfExperience && touched.yearsOfExperience && (
                      <div className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Degree</label>
                    <Field
                      as="select"
                      name="degree"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    >
                      <option value="">Select degree</option>
                      <option value="High School">High School</option>
                      <option value="Associate's Degree">Associate's Degree</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate">Doctorate</option>
                    </Field>
                    {errors.degree && touched.degree && (
                      <div className="text-red-500 text-sm mt-1">{errors.degree}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Current or Desired Job</label>
                    <Field
                      name="currentOrDesiredJob"
                      placeholder="e.g. Software Engineer"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.currentOrDesiredJob && touched.currentOrDesiredJob && (
                      <div className="text-red-500 text-sm mt-1">{errors.currentOrDesiredJob}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">College Name</label>
                    <Field
                      name="collegeName"
                      placeholder="Your college name"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">University</label>
                    <Field
                      name="university"
                      placeholder="Your university name"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Education</label>
                    <Field
                      name="education"
                      placeholder="Additional education details"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Bio</label>
                  <Field
                    as="textarea"
                    name="bio"
                    rows="4"
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary resize-y"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Cover Letter</label>
                  <Field
                    as="textarea"
                    name="coverLetter"
                    rows="4"
                    placeholder="Your default cover letter..."
                    className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Portfolio</label>
                    <Field
                      name="portfolio"
                      type="url"
                      placeholder="https://your-portfolio.com"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.portfolio && touched.portfolio && (
                      <div className="text-red-500 text-sm mt-1">{errors.portfolio}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">LinkedIn</label>
                    <Field
                      name="linkedInLink"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.linkedInLink && touched.linkedInLink && (
                      <div className="text-red-500 text-sm mt-1">{errors.linkedInLink}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Facebook</label>
                    <Field
                      name="facebookLink"
                      type="url"
                      placeholder="https://facebook.com/username"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.facebookLink && touched.facebookLink && (
                      <div className="text-red-500 text-sm mt-1">{errors.facebookLink}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Twitter</label>
                    <Field
                      name="twitterLink"
                      type="url"
                      placeholder="https://twitter.com/username"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.twitterLink && touched.twitterLink && (
                      <div className="text-red-500 text-sm mt-1">{errors.twitterLink}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-light-text-primary dark:text-dark-text-primary">Instagram</label>
                    <Field
                      name="instagramLink"
                      type="url"
                      placeholder="https://instagram.com/username"
                      className="w-full px-4 py-3 border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 dark:bg-dark-background-secondary dark:text-dark-text-primary"
                    />
                    {errors.instagramLink && touched.instagramLink && (
                      <div className="text-red-500 text-sm mt-1">{errors.instagramLink}</div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-md font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Skills</h5>
                    <Field name="skills" component={SkillsList} />
                  </div>

                  <div>
                    <h5 className="text-md font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Certifications</h5>
                    <Field name="certifications" component={CertificationsList} />
                  </div>
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Work Experience</h4>
                
                <div>
                  <h5 className="text-md font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Companies Worked At</h5>
                  <Field name="companyWorkedAt" component={CompanyWorkedAtList} />
                </div>

                <div>
                  <h5 className="text-md font-semibold mb-3 text-light-text-primary dark:text-dark-text-primary">Positions Held</h5>
                  <Field name="workedAs" component={WorkedAsList} />
                </div>
              </div>
            )}

            {/* Resumes Tab */}
            {activeTab === 'resumes' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Resume Management</h4>
                
                {/* Upload Section */}
                <div className="bg-light-background-secondary dark:bg-dark-background-secondary rounded-lg p-6 border-2 border-dashed border-light-neutral-300 dark:border-dark-neutral-600 hover:border-light-primary-400 dark:hover:border-dark-primary-400 transition-colors">
                  <div className="text-center">
                    <div className="mx-auto w-12 h-12 bg-light-primary-100 dark:bg-dark-primary-900 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-light-primary-600 dark:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h5 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                      Upload Resume
                    </h5>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                      Upload your resume in PDF or Word format (max 5MB)
                    </p>
                    <label className="inline-flex items-center px-6 py-3 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-lg hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {uploadingResume ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Choose File
                        </>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        onFocus={() => console.log('File input focused')}
                        disabled={uploadingResume}
                      />
                    </label>
                  </div>
                </div>

                {/* Resumes List */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-md font-semibold text-light-text-primary dark:text-dark-text-primary">
                      Your Resumes ({resumes.length})
                    </h5>
                    <button
                      onClick={fetchResumes}
                      disabled={resumeLoading}
                      className="text-light-primary-600 dark:text-dark-primary-400 hover:text-light-primary-700 dark:hover:text-dark-primary-300 text-sm font-medium disabled:opacity-50"
                    >
                      {resumeLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                  </div>

                  {resumeLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((n) => (
                        <div key={n} className="bg-white dark:bg-dark-background-secondary rounded-lg p-4 animate-pulse">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                            </div>
                            <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : resumes.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-dark-background-secondary rounded-lg">
                      <div className="mx-auto w-16 h-16 bg-light-neutral-100 dark:bg-dark-neutral-800 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-light-neutral-400 dark:text-dark-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h6 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                        No resumes uploaded
                      </h6>
                      <p className="text-light-text-secondary dark:text-dark-text-secondary">
                        Upload your first resume to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {resumes.map((resume) => (
                        <div
                          key={resume.id}
                          className="bg-white dark:bg-dark-background-secondary rounded-lg p-4 border border-light-neutral-200 dark:border-dark-neutral-700 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-light-primary-100 dark:bg-dark-primary-900 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-light-primary-600 dark:text-dark-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <h6 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                  {resume.resumeName}
                                </h6>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                  Resume #{resume.id}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {resume.resumePath && (
                                <button
                                  onClick={() => {
                                    window.open(resume.resumePath, '_blank');
                                    toast.success('Opening resume...');
                                  }}
                                  className="px-3 py-1.5 text-light-primary-600 dark:text-dark-primary-400 hover:bg-light-primary-50 dark:hover:bg-dark-primary-900/20 rounded-lg transition-colors text-sm font-medium"
                                  title="View/Download Resume"
                                >
                                  View
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteResume(resume.id, resume.resumeName)}
                                className="px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">Account Settings</h4>
                
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h5 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">Danger Zone</h5>
                  <p className="text-red-700 dark:text-red-300 mb-4">
                    Once you delete your profile, all your data will be permanently removed and cannot be recovered.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Profile
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-light-neutral-200 dark:border-dark-neutral-700">
              <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                {/* Removed validation error display */}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                  console.log('Save button clicked!');
                  console.log('Button disabled:', isSubmitting);
                  console.log('Form valid:', isValid);
                }}
                className="px-6 py-3 bg-light-primary-500 dark:bg-dark-primary-500 text-white rounded-lg hover:bg-light-primary-600 dark:hover:bg-dark-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving Entire Profile...' : 'Save Profile'}
              </button>
            </div>
                     </Form>
         );
         }}
       </Formik>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-background-secondary rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-4">
              Confirm Profile Deletion
            </h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              Are you sure you want to delete your profile? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 text-light-text-primary dark:text-dark-text-primary border border-light-neutral-300 dark:border-dark-neutral-600 rounded-lg hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProfile}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}