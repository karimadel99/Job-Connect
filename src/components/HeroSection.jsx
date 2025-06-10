export default function HeroSection() {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById('jobs');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-light-background-primary to-light-primary-50 dark:from-dark-background-primary dark:to-dark-primary-50 flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
      {/* Left Column (Text) */}
      <div id="hero" className="flex flex-col justify-center w-full md:w-1/2 space-y-6 text-light-text-primary dark:text-dark-text-primary mt-6 md:mt-0">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Find A <span className="text-light-primary-400 dark:text-dark-primary-500">Job</span> That Matches Your Passion
        </h1>
        
        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
          Hand-picked opportunities to work from home, remotely, freelance,
          full-time, part-time, contract, and internships.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={scrollToJobs}
            className="px-8 py-3 rounded-lg text-white bg-light-primary-400 hover:bg-light-primary-500 dark:bg-dark-primary-400 dark:hover:bg-dark-primary-500 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Explore Jobs
          </button>
        
        </div>
      </div>

      {/* Right Column (Image) */}
      <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src="/assets/images/Search-rafiki.svg"
          alt="Job search illustration"
          className="w-full md:w-4/5 max-w-lg"
        />
      </div>
    </div>
  );
}
