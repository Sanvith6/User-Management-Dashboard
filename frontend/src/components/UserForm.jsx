import React, { useState } from 'react';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onUserCreated(formData);
      setFormData({ name: '', email: '' });
    } catch (err) {
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center text-base">
          +
        </span>
        Add New User
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-primary-700 mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="input"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 animate-in fade-in zoom-in duration-200">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            'Create User Account'
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
