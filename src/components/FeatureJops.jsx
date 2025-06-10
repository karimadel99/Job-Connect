import JobCard from "./JobCard";

const jobs = [
    {
      type: "Full Time",
      location: "New York, CA",
      title: "Product Manager",
      category: "Marketing",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: true,
      companyLogo: "/assets/images/apple (2).png",
    },
    {
      type: "Part Time",
      location: "Glenwood, CA",
      title: "Product Designer",
      category: "Designer",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: false,
      companyLogo: "/assets/images/spotify.png",
    },
    {
      type: "Part Time",
      location: "Tropica, CA",
      title: "Recruiting Coordinator",
      category: "Customers Service",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: false,
      companyLogo: "/assets/images/google.png",
    },
    {
      type: "Part Time",
      location: "Greensberg, CA",
      title: "Software Engineer",
      category: "Developer",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: false,
      companyLogo: "/assets/images/pintrest1).png",
    },
    {
      type: "Part Time",
      location: "Rosemerry, CA",
      title: "Customer Support",
      category: "Support",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: false,
      companyLogo: "/assets/images/google.png",
    },
    {
      type: "Part Time",
      location: "Grandview, CA",
      title: "UI/UX Designer",
      category: "Designer",
      salary: "$2,000 - $5,000 / Monthly",
      isHighlighted: false,
      companyLogo: "/assets/images/meta.png",
    },
  ];
  
export default function FeaturesJobs() {
    return (
        <section id="jobs" className="bg-light-background-primary dark:bg-dark-background-primary py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text-primary dark:text-dark-text-primary">
                Our Featured <span className="text-light-primary-400 dark:text-dark-primary-500">Jobs</span>
              </h2>
              
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                Discover hand-picked job opportunities from top companies. Find your perfect match and take the next step in your career.
              </p>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </section>
      );
    }