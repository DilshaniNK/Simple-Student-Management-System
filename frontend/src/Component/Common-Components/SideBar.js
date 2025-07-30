// 👇 Your original logic, structure, icons, routes are untouched
import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Projects from '@mui/icons-material/FolderOpenOutlined';
import Payments from '@mui/icons-material/ReceiptOutlined';
import Labors from '@mui/icons-material/Groups2Outlined';
import Calendar from '@mui/icons-material/CalendarMonthOutlined';
import Materials from '@mui/icons-material/HandymanOutlined';
import Inventory from '@mui/icons-material/Inventory2Outlined';
import TodoList from '@mui/icons-material/ListAltOutlined';

import {
  Home, Users, BarChart3, BookmarkCheck, ClipboardPenLine, UserRoundSearch,
  Clipboard, BadgeCheck, BookOpen, Shield, ChevronRight, Bell, MessageSquare,
  Settings, LogOut, Rocket, Loader, FileText, Truck, Package, Receipt, FolderOpen,
  User, MapPin, X
} from 'lucide-react';

const SideBar = ({
  userRole = 'Admin',
  activeItem = 'home',
  onNavigate,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { supplierId } = useParams();

  const menuItems = {
    admin: [
      { id: 'dashbord', label: 'Dashboard', icon: Home, path: `/admin/interface`, badge: null },
      { id: 'courses', label: 'Courses', icon: BookOpen, path: '/admin/view_courses', badge: null },
      { id: 'allteachers', label: 'All Teachers', icon: UserRoundSearch, path: '/admin/view_teacher', badge: null },
    ],

  teacher: [
      { id: 'dashbord', label: 'Dashboard', icon: Home, path: `/admin/interface`, badge: null },
      { id: 'courses', label: 'Courses', icon: BookOpen, path: '/admin/view_courses', badge: null },
      { id: 'allteachers', label: 'All Teachers', icon: UserRoundSearch, path: '/admin/view_teacher', badge: null },
    ]


  };

  const currentMenu = menuItems[userRole] || menuItems.Designer;

  const handleItemClick = (item) => {
    if (onNavigate) {
      onNavigate(item.id, item.path);
    } else if (item.path) {
      navigate(item.path);
    }
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const getRoleTitle = (role) => {
    const titles = {
      admin: 'Administration',
      Example: 'example portal',
    };
    return titles[role] || 'Dashboard';
  };

  const sidebarWidth = (isDesktopHovered || isSidebarOpen) ? 'w-72' : 'w-20';

  return (
    <>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 p-8 m-4 max-w-md w-full transform transition-all duration-500 scale-100 opacity-100">
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 via-red-50 to-red-100 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-700 hover:scale-110 hover:rotate-3">
                  <div className="absolute inset-0 bg-red-500/10 rounded-2xl animate-pulse"></div>
                  <LogOut className="w-8 h-8 text-red-600 relative z-10 animate-bounce" style={{ animationDuration: '2s' }} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="text-gray-400 hover:text-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-90 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                Confirm Logout
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-300 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Are you sure you want to logout from your account?
              </p>
              <p className="text-sm text-gray-400 mt-2">
                You'll need to sign in again to access your dashboard.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-6 py-4 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 hover:translate-y-[-2px]"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 px-6 py-4 text-white bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:via-red-600 hover:to-red-700 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg shadow-red-500/25 hover:translate-y-[-2px]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '1.5s',
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        style={{ background: '#113F67' }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)]   border-r border-gray-200 z-40 transition-all duration-300 ease-in-out shadow-lg ${sidebarWidth} flex flex-col overflow-hidden`}
        onMouseEnter={() => setIsDesktopHovered(true)}
        onMouseLeave={() => {
          setIsDesktopHovered(false);
          setHoveredItem(null);
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#FAAD00]/8 via-[#FAAD00]/5 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAAD00]/10 to-transparent opacity-50"></div>
          <div className="flex items-center space-x-3 relative">
            <div className="w-12 h-12 bg-[#E8FFD7] rounded-2xl flex items-center justify-center shadow-lg shadow-[#FAAD00]/25 flex-shrink-0 ring-2 ring-[#FAAD00]/20">
              <span className="text-black font-bold text-base tracking-wide">
                {userRole.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className={`transition-all duration-300 ${isDesktopHovered || isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 lg:opacity-0 lg:-translate-x-4'}`}>
              <h2 className="text-white font-bold text-xl whitespace-nowrap tracking-tight">
                {getRoleTitle(userRole)}
              </h2>
              <div className="w-16 h-1 bg-[#FDF5AA] rounded-full mt-1"></div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 hide-scrollbar">
          <nav className="space-y-1 pb-40 lg:pb-32">
            {currentMenu.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              const isExpanded = isDesktopHovered || isSidebarOpen;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`group w-full flex items-center rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${
                    isExpanded ? 'px-3 lg:px-4 py-2 lg:py-3 justify-between' : 'px-2 lg:px-3 py-2 lg:py-3 justify-center'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FAAD00] via-[#FAAD00]/95 to-[#FAAD00]/90 text-white shadow-lg shadow-[#FAAD00]/30 scale-[1.02] border border-[#FAAD00]/20'
                      : 'text-white hover:bg-white hover:text-[#213765] hover:scale-[1.01] hover:shadow-md hover:shadow-[#FAAD00]/10'
                  }`}
                >
                  
                  <div className={`flex items-center ${!isExpanded ? 'justify-center w-full' : ''}`}>
                    <div className={`flex items-center justify-center rounded-xl transition-all duration-300 flex-shrink-0 ${
                      isExpanded ? 'w-8 h-8 lg:w-11 lg:h-11 mr-2 lg:mr-4' : 'w-10 h-10 lg:w-12 lg:h-12'
                    } ${isActive ? 'bg-white/20 backdrop-blur-sm shadow-inner' : isExpanded ? 'bg-gray-100 group-hover:bg-[#FAAD00]/20' : 'bg-gray-50 group-hover:bg-[#FAAD00]/15 border border-gray-200 group-hover:border-[#FAAD00]/30 shadow-sm'}`}>
                      <IconComponent className={`transition-all duration-300 ${
                        isExpanded ? 'w-4 h-4 lg:w-5 lg:h-5' : 'w-5 h-5 lg:w-6 lg:h-6'
                      } ${isActive ? 'text-white drop-shadow-sm' : 'text-gray-700 group-hover:text-black'}`} />
                    </div>
                    <span className={`font-semibold text-xs lg:text-sm whitespace-nowrap transition-all duration-300 ${
                      isExpanded ? 'opacity-100 translate-x-0 block' : 'opacity-0 -translate-x-4  overflow-hidden hidden lg:block'
                    }`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 shadow-lg"style={{ background: '#2563eb' }} >
          <div className="p-2 lg:p-3">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className={`group w-full flex items-center rounded-2xl text-left transition-all duration-300 ${
                isDesktopHovered || isSidebarOpen ? 'px-3 lg:px-4 py-2 lg:py-3 justify-start' : 'px-2 lg:px-3 py-2 lg:py-3 justify-center'
              } text-red-600 hover:bg-red-50 hover:text-red-700 hover:scale-[1.01] hover:shadow-md hover:shadow-red-500/10`}
            >
              <div className={`flex items-center ${!isSidebarOpen && !isDesktopHovered ? 'justify-center w-full' : ''}`}>
                <div className="flex items-center justify-center rounded-xl bg-red-100 group-hover:bg-red-200 w-8 h-8 lg:w-11 lg:h-11 mr-0 lg:mr-4 shadow-sm transition-all duration-300">
                  <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <span className={`font-semibold text-xs lg:text-sm whitespace-nowrap transition-all duration-300 ml-3 lg:ml-0 ${
                  isSidebarOpen || isDesktopHovered ? 'opacity-100 translate-x-0 block' : 'opacity-0 -translate-x-4 w-0 overflow-hidden hidden lg:block'
                }`}>
                  Logout
                </span>
              </div>
            </button>
          </div>
          
        </div>
      </aside>
    </>
  );
};

export default SideBar;
