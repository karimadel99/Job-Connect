import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';

const JobSeekerHeader = () => {
    return (
        <header className="flex flex-col md:flex-row justify-around gap-4 p-1
                       bg-light-primary-100 text-light-text-primary 
                       dark:bg-dark-primary-100 dark:text-dark-text-primary 
                       shadow-sm">
            <div className="w-full max-w-screen-2xl ">
                <div className="flex items-center h-16">
                    {/* Middle section - Search */}
                    <div className="flex-1 w-96 max-w-xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <HiOutlineSearch className="h-5 w-5 text-light-neutral-400 dark:text-dark-neutral-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-lg bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500"
                                placeholder="Job title, keyword, company"
                            />
                        </div>
                    </div>

                    {/* Right section - Icons */}
                    <div className="flex items-center space-x-4 ml-auto">
                        <button className="text-light-text-primary dark:text-dark-text-primary hover:text-light-primary-600 dark:hover:text-dark-primary-500">
                            <HiOutlineBell className="h-6 w-6" />
                        </button>
                        <button className="flex items-center">
                            <img
                                className="h-8 w-8 rounded-full object-cover"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default JobSeekerHeader; 