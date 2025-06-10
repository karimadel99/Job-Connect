import React, { useState } from 'react';
import { submitContactForm } from '../api/authApi';

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showToastMessage = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await submitContactForm(formData);
            
            if (result.success) {
                showToastMessage('Thank you! Your message has been sent successfully.', 'success');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                showToastMessage(result.error || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showToastMessage('An error occurred. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div id='contact' className='bg-gradient-to-br from-light-background-primary to-light-primary-50 dark:from-dark-background-primary dark:to-dark-primary-50 py-16 min-h-screen'>
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
                            Get In <span className="text-light-primary-400 dark:text-dark-primary-500">Touch</span>
                        </h2>
                        <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                            Have questions or want to discuss opportunities? We'd love to hear from you. 
                            Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-light-primary-100 dark:bg-dark-primary-200 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">
                                    Contact Information
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Email</h4>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">contact@jobconnect.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Phone</h4>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-light-primary-400 dark:bg-dark-primary-400 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-light-text-primary dark:text-dark-text-primary">Office</h4>
                                            <p className="text-light-text-secondary dark:text-dark-text-secondary">123 Business Ave, Suite 100<br />New York, NY 10001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-dark-primary-100 p-8 rounded-2xl shadow-xl border border-light-primary-100 dark:border-dark-primary-300">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label htmlFor="firstName" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                            First Name<span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary  rounded-xl text-sm focus:ring-2 focus:ring-light-primary-400 focus:border-light-primary-400 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400 transition-all duration-200 group-hover:border-light-primary-300 dark:group-hover:border-dark-primary-400"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="lastName" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                            Last Name<span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary  rounded-xl text-sm focus:ring-2 focus:ring-light-primary-400 focus:border-light-primary-400 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400 transition-all duration-200 group-hover:border-light-primary-300 dark:group-hover:border-dark-primary-400"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label htmlFor="email" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                            Email Address<span className="text-red-500 ml-1">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary  rounded-xl text-sm focus:ring-2 focus:ring-light-primary-400 focus:border-light-primary-400 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400 transition-all duration-200 group-hover:border-light-primary-300 dark:group-hover:border-dark-primary-400"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="phone" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary rounded-xl text-sm focus:ring-2 focus:ring-light-primary-400 focus:border-light-primary-400 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400 transition-all duration-200 group-hover:border-light-primary-300 dark:group-hover:border-dark-primary-400"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <div className="group">
                                    <label htmlFor="message" className="block text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                                        Message<span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-light-primary-50 dark:bg-dark-primary-50 text-light-text-primary dark:text-dark-text-primary  rounded-xl text-sm focus:ring-2 focus:ring-light-primary-400 focus:border-light-primary-400 dark:focus:ring-dark-primary-400 dark:focus:border-dark-primary-400 transition-all duration-200 group-hover:border-light-primary-300 dark:group-hover:border-dark-primary-400 resize-none"
                                        placeholder="Tell us about your inquiry..."
                                        required
                                        disabled={loading}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 rounded-xl text-white bg-gradient-to-r from-light-primary-400 to-light-primary-500 hover:from-light-primary-500 hover:to-light-primary-600 dark:from-dark-primary-300 dark:to-dark-primary-400 dark:hover:from-dark-primary-400 dark:hover:to-dark-primary-500 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg border-l-4 animate-slide-in-right ${
                    toastType === 'success' 
                        ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-500' 
                        : 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-500'
                }`}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            {toastType === 'success' ? (
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{toastMessage}</p>
                        </div>
                        <div className="ml-auto pl-3">
                            <button
                                onClick={() => setShowToast(false)}
                                className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom CSS for animation */}
            <style jsx>{`
                @keyframes slide-in-right {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
