import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from "framer-motion";

export default function NotFound() {
  return <>
  <Navbar/>
  <div className="flex flex-col items-center justify-center h-screen bg-light-primary-50 text-light-text-primary dark:text-dark-text-primary dark:bg-dark-primary-100 py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Illustration */}
        <motion.img 
          src="/assets/images/NotFound.svg"
          alt="404 Illustration"
          className="w-96 mx-auto mb-6"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Text Content */}
        <h1 className="text-display-1 font-extrabold">Oops!</h1>
        <p className="text-p1 mt-2">
          The page you're looking for doesn't exist.
        </p>

        {/* CTA Button */}
        <motion.div 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }} 
          className="mt-6"
        >
        </motion.div>
      </motion.div>
    </div>
  <Footer/>
  </>
}


