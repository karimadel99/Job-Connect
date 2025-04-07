import React from 'react';
import PricingCard from '../components/public/PricingCard';

const PricingPage = () => {
  // Pricing data for Job Seekers
  const jobSeekerPlans = [
    {
      planName: 'Free Plan',
      price: '0',
      frequency: '/month',
      features: [
        { name: 'Access to limited job postings', available: true },
        { name: 'Basic profile', available: true },
        { name: 'Limited messaging', available: false },
        { name: 'Community support', available: true },
      ],
      buttonText: 'Choose Free',
    },
    {
      planName: 'Premium Plan',
      price: '29',
      frequency: '/month',
      features: [
        { name: 'Unlimited job applications', available: true },
        { name: 'Enhanced profile visibility', available: true },
        { name: 'Priority messaging', available: true },
        { name: '1-on-1 career coaching', available: true },
      ],
      buttonText: 'Choose Premium',
    },
  ];

  // Pricing data for Employers
  const employerPlans = [
    {
      planName: 'Free Plan',
      price: '0',
      frequency: '/month',
      features: [
        { name: 'Post limited jobs', available: true },
        { name: 'Basic candidate matching', available: true },
        { name: 'Limited candidate access', available: false },
        { name: 'Community support', available: true },
      ],
      buttonText: 'Choose Free',
    },
    {
      planName: 'Premium Plan',
      price: '49',
      frequency: '/month',
      features: [
        { name: 'Unlimited job postings', available: true },
        { name: 'Advanced candidate matching', available: true },
        { name: 'Full candidate access', available: true },
        { name: 'Dedicated account manager', available: true },
      ],
      buttonText: 'Choose Premium',
    },
  ];

  return (
    <div className="py-24 px-4 bg-light-primary-50 dark:bg-dark-primary-100">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-h1 font-bold text-center mb-12 text-light-text-primary dark:text-dark-text-primary">
          Pricing
        </h1>

        {/* Job Seekers Section */}
        <section className="mb-16">
          <h2 className="text-h2 font-semibold text-light-text-primary dark:text-dark-text-primary mb-8 text-center">
            Job Seekers
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {jobSeekerPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </section>

        {/* Employers Section */}
        <section>
          <h2 className="text-h2 font-semibold text-light-text-primary dark:text-dark-text-primary mb-8 text-center">
            Employers
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {employerPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PricingPage;
