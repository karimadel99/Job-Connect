import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturesJobs from '../components/FeatureJops'
import JobCategoryCarousel from '../components/JobCategoryCarousel'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return <>
   <HeroSection/>
   <FeaturesJobs/>
   <JobCategoryCarousel/>
   <Contact/>
  </>
}
