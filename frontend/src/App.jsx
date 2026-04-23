import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header / Nav */}
      <nav className="bg-white border-b border-primary-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="text-lg font-semibold tracking-tight text-primary-900">UserOps</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-primary-500 font-medium">
            <span>v1.0.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 tracking-tight">Dashboard</h1>
          <p className="text-primary-500 mt-1">Manage your team and monitor system health in real-time.</p>
        </header>
        
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
