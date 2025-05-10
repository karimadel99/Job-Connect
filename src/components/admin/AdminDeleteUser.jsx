import React, { useState } from 'react';
import { deleteUser } from '../../api/adminApi';
import { toast } from 'react-hot-toast';

const AdminDeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await deleteUser(userId);
      toast.success('User deleted successfully.');
      setUserId('');
    } catch (err) {
      toast.error('Failed to delete user.');
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleDelete} className="flex mb-4">
        <input
          type="text"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          placeholder="Enter user ID..."
          className="flex-1 w-3/4 px-3 py-2 border border-light-neutral-200 dark:border-dark-neutral-700 rounded-l-lg bg-light-background dark:bg-dark-neutral-700 text-light-text-primary dark:text-dark-text-primary focus:ring-light-primary-500 dark:focus:ring-dark-primary-500 focus:border-light-primary-500 dark:focus:border-dark-primary-500"
        />
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-r-lg font-semibold hover:bg-red-600" disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </form>
    </div>
  );
};

export default AdminDeleteUser; 