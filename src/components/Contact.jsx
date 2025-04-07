import React from 'react';

export default function Contact() {
    return <>
        <div id='contact' className='bg-light-background-primary dark:bg-dark-background-primary py-12 text-3xl font-bold text-light-text-primary dark:text-dark-text-primary min-h-screen'>
            <h2 className="text-2xl font-bold text-center mb-8 text-light-text-primary dark:text-dark-text-primary">Contact Us</h2>
            <div className="flex items-center justify-center">
                <form className="w-full max-w-3xl bg-light-primary-100 dark:bg-dark-primary-100 p-8 rounded-xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                First Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="mt-1 block w-full px-3 py-2 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary border border-light-primary-100 dark:border-dark-primary-300 rounded-md text-sm focus:ring-light-primary-300 focus:border-light-primary-300 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                Last Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="mt-1 block w-full px-3 py-2 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary border border-light-primary-100 dark:border-dark-primary-300 rounded-md text-sm focus:ring-light-primary-300 focus:border-light-primary-300 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                Email Address<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full px-3 py-2 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary border border-light-primary-100 dark:border-dark-primary-300 rounded-md text-sm focus:ring-light-primary-300 focus:border-light-primary-300 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="Company" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                Company<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="Company"
                                className="mt-1 block w-full px-3 py-2 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary border border-light-primary-100 dark:border-dark-primary-300 rounded-md text-sm focus:ring-light-primary-300 focus:border-light-primary-300 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="mt-1 block w-full px-3 py-2 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary border border-light-primary-100 dark:border-dark-primary-300 rounded-md text-sm focus:ring-light-primary-300 focus:border-light-primary-300 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400"
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg text-light-background dark:text-dark-text-primary bg-light-primary-400 hover:bg-light-primary-500 dark:bg-dark-primary-300 dark:hover:bg-dark-primary-400 text-sm font-medium"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>;
}
