import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 pt-24">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👋 Welcome, {user?.name || 'User'}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all your contacts securely in one place.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">📇 Contacts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">View, add and manage your saved contacts.</p>
          <Button as={NavLink} to="/contacts" color="primary" size="sm" className="mt-4">
            View Contacts
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">❤️ Favorites</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Quickly access your favorite contacts.</p>
          <Button as={NavLink} to="/favorites" color="primary" size="sm" className="mt-4">
            View Favorites
          </Button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">👤 Profile</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Update your personal information.</p>
          <Button as={NavLink} to="/profile" color="primary" size="sm" className="mt-4">
            Go to Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
