import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import { userAPI, healthAPI } from '../services/api';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    fetchUsers();
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const health = await healthAPI.checkHealth();
      setHealthStatus(health);
    } catch (err) {
      setHealthStatus({ status: 'unhealthy' });
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await userAPI.getUsers();
      setUsers(data);
      setError(''); 
    } catch (err) {
      setError(err.message || 'Failed to load users');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = async (userData) => {
    try {
      const newUser = await userAPI.createUser(userData);
      setUsers([...users, newUser]);
      setSuccess(`User "${newUser.name}" created successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await userAPI.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      setSuccess('User deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-500">System Health</p>
              <h3 className={`text-2xl font-bold mt-1 ${healthStatus?.status === 'healthy' ? 'text-green-600' : 'text-red-600'}`}>
                {healthStatus?.status === 'healthy' ? 'Healthy' : healthStatus ? 'Unhealthy' : 'Checking...'}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${healthStatus?.status === 'healthy' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {healthStatus?.status === 'healthy' ? '●' : '○'}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-500">Total Users</p>
              <h3 className="text-2xl font-bold mt-1 text-primary-900">{users.length}</h3>
            </div>
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-500">API Version</p>
              <h3 className="text-2xl font-bold mt-1 text-primary-900">{healthStatus?.version || 'v1.0.0'}</h3>
            </div>
            <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center">
              ⚙️
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2 max-w-sm w-full">
        {success && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span>✅</span>
            <span className="font-medium">{success}</span>
          </div>
        )}
        {error && healthStatus?.status === 'unhealthy' && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <span>⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <UserForm onUserCreated={handleUserCreated} />
        </div>
        <div className="lg:col-span-8">
          <UserList 
            users={users} 
            onDeleteUser={handleDeleteUser}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
