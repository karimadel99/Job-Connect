import React from 'react';

const Loader = ({ size = 55 }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative flex flex-col items-center">
      {/* Light mode logo */}
      <img src="/assets/logoLight (1).svg" alt="Job Connect Logo" className="mx-auto mb-4 block dark:hidden" style={{ width: size, height: size }} />
      {/* Dark mode logo */}
      <img src="/assets/logoDark (1).svg" alt="Job Connect Logo" className="mx-auto mb-4 hidden dark:block" style={{ width: size, height: size }} />
      <div className="absolute bottom-2/3 left-1/2 transform -translate-x-1/2">
        <div className="h-1 w-[80%] from-transparent via-light-primary-600 dark:via-dark-primary-500 to-transparent animate-pulse"></div>
      </div>
      <span className="mt-4 text-lg font-semibold text-light-primary-600 dark:text-dark-primary-500">Loading...</span>
    </div>
  </div>
);

// Define keyframes for fading effect
const styles = `
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

// Inject styles into document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Loader;