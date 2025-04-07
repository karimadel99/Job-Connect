import React, { useState } from 'react';

const AccordionItem = ({ id, title, isOpen, onToggle, children, className = '' }) => (
  <div className={`mb-4 border border-light-primary-100 dark:border-dark-primary-300 rounded-xl ${className}`}>
    <h2>
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-light-text-primary dark:text-dark-text-primary border-b border-light-primary-100 dark:border-dark-primary-300 rounded-t-xl focus:ring-2 focus:ring-light-primary-200 dark:focus:ring-dark-primary-500 hover:bg-light-primary-100 dark:hover:bg-dark-primary-200 gap-3"
      >
        <span>{title}</span>
        <svg
          className={`w-3 h-3 shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    {isOpen && (
      <div className="p-5 bg-light-background dark:bg-dark-primary-100 border-t border-light-primary-100 dark:border-dark-primary-300">
        {children}
      </div>
    )}
  </div>
);


export default AccordionItem;