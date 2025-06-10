import React, { createContext, useContext, useState, useCallback } from 'react';
import { saveJob, unsaveJob, getSavedJobs } from '../api/jobSeekerApi';
import { toast } from 'react-hot-toast';

const SavedJobsContext = createContext();

export const useSavedJobs = () => {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error('useSavedJobs must be used within a SavedJobsProvider');
  }
  return context;
};

export const SavedJobsProvider = ({ children }) => {
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Fetch saved jobs from API
  const fetchSavedJobs = useCallback(async () => {
    try {
      const response = await getSavedJobs();
      if (response.error) {
        toast.error(response.error);
      } else {
        const savedIds = new Set(response.data.map(job => job.id));
        setSavedJobIds(savedIds);
      }
    } catch (error) {
      toast.error('Failed to fetch saved jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle save/unsave job
  const toggleSaveJob = useCallback(async (jobId) => {
    const isSaved = savedJobIds.has(jobId);
    
    try {
      const response = isSaved ? 
        await unsaveJob(jobId) : 
        await saveJob(jobId);

      if (response.error) {
        toast.error(response.error);
        return false;
      }

      // Update local state
      setSavedJobIds(prev => {
        const newSet = new Set(prev);
        if (isSaved) {
          newSet.delete(jobId);
        } else {
          newSet.add(jobId);
        }
        return newSet;
      });

      // Show success message
      toast.success(isSaved ? 'Job removed from saved jobs' : 'Job saved successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update job save status');
      return false;
    }
  }, [savedJobIds]);

  // Check if a job is saved
  const isJobSaved = useCallback((jobId) => {
    return savedJobIds.has(jobId);
  }, [savedJobIds]);

  const value = {
    savedJobIds,
    isLoading,
    fetchSavedJobs,
    toggleSaveJob,
    isJobSaved
  };

  return (
    <SavedJobsContext.Provider value={value}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export default SavedJobsContext; 