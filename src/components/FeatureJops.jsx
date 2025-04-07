import JobCard from "./JopCard";

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
        <section id="jobs" className="py-12 bg-light-background-primary dark:bg-dark-background-primary">
          <div className="max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-light-text-primary dark:text-dark-text-primary">
              Our Featured Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job,index) => (
                <JobCard key={index} job={job} />
              ))}
            </div>
          </div>
        </section>
      );
    }