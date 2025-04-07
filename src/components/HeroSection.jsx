export default function HeroSection() {
  return (
    <>
      <div
        className="min-h-screen pt-20 bg-cover bg-center bg-no-repeat flex flex-col md:flex-row items-center justify-center px-6 md:px-20 bg-light-background-primary dark:bg-dark-background-primary"
      >
        {/* Left Column (Text) */}
        <div id="hero" className="flex flex-col justify-center w-full md:w-1/2 space-y-6 text-light-text-primary dark:text-dark-text-primary mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold">
            Find A <span className="text-light-primary-400 dark:text-dark-primary-500">Job</span> That Matches Your Passion
          </h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Hand-picked opportunities to work from home, remotely, freelance,
            full-time, part-time, contract, and internships.
          </p>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search by job title..."
              className="flex-grow border-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 bg-light-primary-200 focus:ring-light-primary-100 dark:bg-dark-primary-100 dark:border-dark-text-primary dark:placeholder-dark-text-secondary"
            />
            <button className="bg-light-primary-400 dark:bg-dark-primary-200 text-light-text-primary dark:text-dark-text-primary font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-[102%] transform transition-transform duration-300">
              Search
            </button>
          </div>
        </div>

        {/* Right Column (Image) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/assets/images/Search-rafiki.svg"
            alt="Job search illustration"
            className="w-full md:w-2/3"
          />
        </div>
      </div>
    </>
  );
}
