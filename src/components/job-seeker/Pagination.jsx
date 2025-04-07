import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="px-6 py-4 border-t border-light-neutral-200 dark:border-dark-neutral-700 flex justify-center">
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-md transition-colors duration-200 ${
            currentPage === 1
              ? 'text-light-neutral-400 dark:text-dark-neutral-500 cursor-not-allowed'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
          }`}
          aria-label="Previous page"
        >
          &lt;
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          const shouldShow = 
            pageNumber === 1 || 
            pageNumber === totalPages || 
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
          
          if (!shouldShow) {
            if (pageNumber === 2 || pageNumber === totalPages - 1) {
              return (
                <span 
                  key={`ellipsis-${pageNumber}`}
                  className="px-2 text-light-neutral-400 dark:text-dark-neutral-500"
                >
                  ...
                </span>
              );
            }
            return null;
          }
          
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 ${
                currentPage === pageNumber
                  ? 'bg-light-primary-600 text-white dark:bg-dark-primary-600 transform scale-110'
                  : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md transition-colors duration-200 ${
            currentPage === totalPages
              ? 'text-light-neutral-400 dark:text-dark-neutral-500 cursor-not-allowed'
              : 'text-light-text-primary dark:text-dark-text-primary hover:bg-light-neutral-100 dark:hover:bg-dark-neutral-700'
          }`}
          aria-label="Next page"
        >
          &gt;
        </button>
      </nav>
    </div>
  );
};

export default Pagination; 