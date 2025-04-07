import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#C7D2FE] dark:bg-[#312E81]">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src='../assets/images/apple.png' className="h-8 me-3" alt="Job Connect Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Job Connect
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary uppercase">
                Explore
              </h2>
              <ul className="text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <li className="mb-4">
                  <Link to="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:underline">
                    Job Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary uppercase">
                Support
              </h2>
              <ul className="text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <li className="mb-4">
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-light-text-primary dark:text-dark-text-primary uppercase">
                Legal
              </h2>
              <ul className="text-light-text-secondary dark:text-dark-text-secondary font-medium">
                <li className="mb-4">
                  <Link to="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-light-text-secondary sm:text-center dark:text-dark-text-secondary">
            © 2024 <Link to="/" className="hover:underline">Job Connect</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="https://linkedin.com" className="text-light-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary ms-5" aria-label="LinkedIn">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.729V1.73C24 .774 23.208 0 22.23 0zM7.06 20.452H3.662V9.036H7.06v11.416zm-1.701-12.87a2.034 2.034 0 1 1 .001-4.068 2.034 2.034 0 0 1 0 4.068zM20.452 20.452h-3.4v-5.918c0-1.414-.026-3.24-2.048-3.24-2.048 0-2.36 1.6-2.36 3.143v6.015H9.243V9.036h3.264v1.556h.047c.455-.863 1.568-1.774 3.227-1.774 3.448 0 4.086 2.269 4.086 5.223v6.411z" />
              </svg>
            </a>
            <a href="https://github.com" className="text-light-text-secondary hover:text-light-text-primary dark:hover:text-dark-text-primary ms-5" aria-label="GitHub">
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.382 1.236-3.222-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.912 1.233 3.222 0 4.606-2.807 5.625-5.479 5.922.43.371.824 1.102.824 2.22 0 1.604-.014 2.896-.014 3.293 0 .319.216.694.824.577C20.565 22.092 24 17.593 24 12.297c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
