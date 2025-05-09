import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import HeroSection from '../components/HeroSection';
import FeaturesJobs from '../components/FeatureJops';
import JobCategoryCarousel from '../components/JobCategoryCarousel';
import Contact from '../components/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loader />;
  return <>
    <HeroSection/>
    <FeaturesJobs/>
    <JobCategoryCarousel/>
    <Contact/>
  </>;
}
