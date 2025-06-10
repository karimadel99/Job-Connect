import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { jobFormValidationSchema, getInitialValues } from './JobFormSchema';
import JobBasicInfo from './JobBasicInfo';
import JobDetailsInfo from './JobDetailsInfo';

const JobFormWizard = ({ job, onSubmit, submitButtonText }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md text-light-text-primary dark:text-dark-text-primary">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <span className={`text-sm font-medium ${
              currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Basic Information
            </span>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="h-1 bg-gray-300 rounded">
              <div 
                className="h-1 bg-blue-600 rounded transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className={`text-sm font-medium ${
              currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
            }`}>
              Job Details
            </span>
          </div>
        </div>
      </div>

      <Formik
        initialValues={getInitialValues(job)}
        validationSchema={jobFormValidationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, handleReset, setFieldValue, validateForm, errors }) => (
          <Form className="space-y-8">
            {/* Step Content */}
            {currentStep === 1 && (
              <JobBasicInfo values={values} setFieldValue={setFieldValue} />
            )}
            
            {currentStep === 2 && (
              <JobDetailsInfo values={values} setFieldValue={setFieldValue} />
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div>
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      prevStep();
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReset();
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Reset
                </button>

                {isLastStep ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : submitButtonText}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      const formErrors = await validateForm();
                      const step1Fields = ['title', 'description', 'tags', 'responsibilities'];
                      const hasStep1Errors = step1Fields.some(field => formErrors[field]);
                      
                      if (!hasStep1Errors) {
                        nextStep();
                      }
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobFormWizard; 