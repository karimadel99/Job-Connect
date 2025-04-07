const CounterInput = ({ name, value, onChange, onBlur, error, touched }) => {
    const increment = () => {
      const newValue = Number(value) + 1;
      onChange({ target: { name, value: newValue.toString() } });
    };
  
    const decrement = () => {
      const newValue = Number(value) - 1;
      if (newValue >= 0) {
        onChange({ target: { name, value: newValue.toString() } });
      }
    };
  
    return (
      <div className="max-w-xs ">
        <label htmlFor={name} className="block mb-2 text-sm font-medium  text-light-text-primary dark:text-dark-text-primary">
          Years of Experience
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button 
            type="button" 
            onClick={decrement} 
            className="bg-light-primary-50 dark:bg-dark-primary-100 hover:bg-light-primary-100 dark:hover:bg-dark-primary-100 border-light-primary-50 dark:border-dark-primary-200 rounded-l-lg p-3 h-11 focus:ring-2 focus:outline-none focus:ring-light-primary-100 dark:focus:ring-dark-primary-300"
          >
            <svg className="w-3 h-3 text-light-text-primary dark:text-dark-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <input 
            type="text"
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="0"
            required
            className="bg-light-primary-50 dark:bg-dark-primary-100 border-t-0 border-b-0 border-light-primary-50 dark:border-dark-primary-200 h-11 text-center text-sm text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:outline-none focus:ring-light-primary-100 dark:focus:ring-dark-primary-300 w-full py-2.5"
          />
          <button 
            type="button" 
            onClick={increment} 
            className="bg-light-primary-50 dark:bg-dark-primary-100 hover:bg-light-primary-100 dark:hover:bg-dark-primary-100 border-light-primary-50 dark:border-dark-primary-200 rounded-r-lg p-3 h-11 focus:ring-2 focus:outline-none focus:ring-light-primary-100 dark:focus:ring-dark-primary-300"
          >
            <svg className="w-3 h-3 text-light-text-primary dark:text-dark-text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
        {touched && error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };


  export default CounterInput;