import React from 'react';

const PricingCard = ({ planName, price, frequency, features, buttonText }) => {
  return (
    <div className="w-full max-w-sm p-4 bg-light-primary-50 dark:bg-dark-primary-100 border border-light-primary-100 dark:border-dark-primary-300 rounded-lg shadow-sm sm:p-8">
      <h5 className="mb-4 text-xl font-medium text-light-text-primary dark:text-dark-text-primary">
        {planName}
      </h5>
      <div className="flex items-baseline text-light-text-primary dark:text-dark-text-primary">
        <span className="text-3xl font-semibold">$</span>
        <span className="text-5xl font-extrabold tracking-tight">{price}</span>
        <span className="ms-1 text-xl font-normal text-light-primary-400 dark:text-dark-primary-300">
          {frequency}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center ${
              feature.available ? '' : 'line-through decoration-light-primary-200'
            }`}
          >
            <svg
              className={`shrink-0 w-4 h-4 ${
                feature.available
                  ? 'text-light-primary-400 dark:text-dark-primary-500'
                  : 'text-light-primary-200 dark:text-dark-primary-300'
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-light-text-primary dark:text-dark-text-primary ms-3">
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="text-light-background bg-light-primary-400 hover:bg-light-primary-300 focus:ring-4 focus:outline-none focus:ring-light-primary-200 dark:bg-dark-primary-500 dark:hover:bg-dark-primary-400 dark:focus:ring-dark-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
