import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  GraduationCap,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Play,
  X,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  Bell,
  Search
} from 'lucide-react';
import Loginform from '../../Component/Common-Components/loginform';

const StudentManagementHero = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDashboard, setShowDashboard] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    setShowLoginModal(false);
    setShowDashboard(true);
  };

  const stats = [
    { icon: Users, number: '10K+', label: 'Students' },
    { icon: BookOpen, number: '500+', label: 'Courses' },
    { icon: Award, number: '95%', label: 'Success Rate' },
  ];

  const features = [
    { icon: TrendingUp, title: 'Analytics', desc: 'Real-time insights' },
    { icon: Users, title: 'Collaboration', desc: 'Seamless teamwork' },
    { icon: BookOpen, title: 'Course Management', desc: 'Easy organization' },
    { icon: Award, title: 'Performance', desc: 'Track achievements' }
  ];

  const dashboardCards = [
    { title: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Courses', value: '156', change: '+8%', icon: BookOpen, color: 'bg-green-500' },
    { title: 'Attendance Rate', value: '94.2%', change: '+2.1%', icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Assignments', value: '1,234', change: '+15%', icon: Award, color: 'bg-orange-500' }
  ];

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <GraduationCap className="text-blue-600 w-8 h-8" />
                <h1 className="text-2xl font-bold text-gray-900">EduManage Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setShowDashboard(false)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin!</h2>
              <p className="text-gray-600">Here's what's happening with your students today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardCards.map((card, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                      <p className="text-green-600 text-sm">{card.change} from last month</p>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <card.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Chart Placeholder */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Enrollment Trends</h3>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive charts and analytics</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: 'New student registration', time: '2 hours ago', type: 'success' },
                    { action: 'Course assignment updated', time: '4 hours ago', type: 'info' },
                    { action: 'Grade report generated', time: '6 hours ago', type: 'warning' },
                    { action: 'System backup completed', time: '1 day ago', type: 'success' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm">{activity.action}</p>
                        <p className="text-gray-500 text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="text-white text-3xl" />
            <span className="text-white text-xl font-bold">EduManage</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-8 text-white">
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">Features</a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">Pricing</a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">About</a>
              <a href="#" className="hover:text-blue-300 transition-colors duration-200">Contact</a>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium border border-white/30"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            
            {/* Hero Text */}
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Empower Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                  Educational
                </span>
                Journey
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform student management with our cutting-edge platform. 
                Streamline admissions, track progress, and boost academic success 
                with intelligent analytics and seamless collaboration tools.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <stat.icon className="text-blue-400 w-8 h-8 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Vision Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Experience the Future of Education Management
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get a glimpse of our intuitive dashboard designed to make student management effortless
            </p>
            
            {/* Dashboard Preview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-5xl mx-auto border border-white/20">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Mock Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="text-white w-6 h-6" />
                    <span className="text-white font-semibold">Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Bell className="text-white w-5 h-5" />
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  </div>
                </div>
                
                {/* Mock Dashboard Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {dashboardCards.map((card, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`${card.color} p-2 rounded-lg`}>
                            <card.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-green-600 text-sm font-medium">{card.change}</span>
                        </div>
                        <h3 className="text-gray-600 text-sm">{card.title}</h3>
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 h-40 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Analytics Overview</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 h-40 flex items-center justify-center">
                      <div className="text-center">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Schedule Management</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-20 grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-full mb-4 group-hover:bg-white/20 transition-all duration-300">
                  <feature.icon className="text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <Loginform onClose={()=>setShowLoginModal(false)}/>
      )}

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StudentManagementHero;