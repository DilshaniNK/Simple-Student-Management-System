import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    const res = await fetch('http://localhost:8070/api/create-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Redirect back to login form
      navigate('/');
    } else {
      setError(data.message || 'Error creating password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Create New Password</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-blue-500/50"
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-blue-500/50"
          placeholder="Confirm new password"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:scale-105 transition-all"
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default CreatePassword;
