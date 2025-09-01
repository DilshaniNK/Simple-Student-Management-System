import { Eye, EyeOff, GraduationCap, Lock, Mail, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

const Loginform = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8070/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

        
      


      if (response.ok) {
        if (data.firstLogin) {
          // Redirect first-time users to create-password page
          navigate('/create-password', { state: { email } });
        } else if(data.token){
          // Normal login: store token and redirect based on role
          const decoded = jwtDecode(data.token);
          localStorage.setItem('token', data.token);
          if (decoded.role === 'admin') navigate('/admin/interface');
          else if (decoded.role === 'teacher') navigate('/teacher/interface');
          else if (decoded.role === 'student') navigate('/student/interface');
        }
      } else {
        setError(data.message || 'Login failed');
      }
          

    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 w-full max-w-md animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Sign In</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <p className="text-gray-300">Access your dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-300 cursor-pointer">
              <input type="checkbox" className="mr-2 rounded" />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Sign In to Dashboard
          </button>

          <div className="text-center">
            <span className="text-gray-300">Don't have an account? </span>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Sign up here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginform;
