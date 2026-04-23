import React from 'react';

const UserList = ({ users, onDeleteUser, loading }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="card p-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin"></div>
        <p className="text-primary-500 font-medium">Fetching team members...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 bg-primary-50 text-primary-300 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          📭
        </div>
        <h3 className="text-lg font-bold text-primary-900">No users found</h3>
        <p className="text-primary-500 mt-1 max-w-xs mx-auto">
          Start building your team by adding your first user account using the form.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="px-6 py-4 border-b border-primary-100 flex items-center justify-between bg-primary-50/50">
        <h2 className="font-bold text-primary-900 flex items-center gap-2">
          Team Members
          <span className="bg-white border border-primary-200 text-primary-600 text-xs px-2 py-0.5 rounded-full">
            {users.length}
          </span>
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-primary-500 bg-primary-50/50">
              <th className="px-6 py-3 font-semibold">User</th>
              <th className="px-6 py-3 font-semibold">Contact</th>
              <th className="px-6 py-3 font-semibold">Joined</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-primary-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-primary-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary-600 text-sm">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-primary-500 text-sm">{formatDate(user.created_at)}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="btn btn-danger text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
