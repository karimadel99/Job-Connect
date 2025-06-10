import * as Yup from 'yup';

export const jobTagsOptions = [
  'Software Development', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science',
  'Machine Learning', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Network Administration',
  'Marketing', 'Sales', 'Finance', 'Accounting', 'Human Resources', 'Project Management',
  'Business Analysis', 'Customer Service', 'Operations', 'Consulting',
  'Nursing', 'Medicine', 'Pharmacy', 'Healthcare Administration', 'Mental Health',
  'Teaching', 'Research', 'Educational Administration', 'Tutoring',
  'Graphic Design', 'Content Creation', 'Video Production', 'Photography', 'Writing',
  'Engineering', 'Legal', 'Hospitality', 'Retail', 'Manufacturing', 'Construction',
  'Transportation', 'Logistics', 'Real Estate', 'Agriculture'
];

export const jobFormValidationSchema = Yup.object({
  title: Yup.string().required('Job Title is required'),
  tags: Yup.array().of(Yup.string()),
  description: Yup.string().required('Job Description is required'),
  minSalary: Yup.number()
    .typeError('Must be a number')
    .min(0, 'Salary cannot be negative')
    .required('Required'),
  maxSalary: Yup.number()
    .typeError('Must be a number')
    .min(Yup.ref('minSalary'), 'Max salary must be greater than min salary')
    .required('Required'),
  salaryType: Yup.string(),
  responsibilities: Yup.array().of(Yup.string()), 
  education: Yup.string(),
  experience: Yup.string(), 
  jobType: Yup.string().required('Job Type is required'),
  workPlace: Yup.string().required('Work Place is required'),
  vacancies: Yup.number()
    .typeError('Must be a number')
    .min(1, 'At least 1 is required')
    .required('Required'),
  expirationDate: Yup.date()
    .typeError('Invalid date')
    .min(new Date(), 'Expiration date must be in the future')
    .nullable(),
  location: Yup.string().required('Location is required')
});

export const getInitialValues = (job = null) => ({
  title: job?.title || '',
  tags: job?.tags || [],
  description: job?.description || '',
  minSalary: job?.minSalary !== undefined && job?.minSalary !== null ? String(job.minSalary) : '',
  maxSalary: job?.maxSalary !== undefined && job?.maxSalary !== null ? String(job.maxSalary) : '',
  salaryType: job?.salaryType || '',
  responsibilities: job?.responsibilities || [],
  education: job?.education || '',
  experience: job?.experience || '',
  jobType: job?.jobType || '',
  workPlace: job?.workPlace || '',
  vacancies: job?.vacancies !== undefined && job?.vacancies !== null ? String(job.vacancies) : '',
  expirationDate: job?.expirationDate ? new Date(job.expirationDate).toISOString().split('T')[0] : '',
  status: job?.status || 'active',
  location: job?.location || '',
});