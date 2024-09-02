import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Roles.css';

export default function Home() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

return (        
    <div className='container-0'>
        <div className='displayed-pic'></div>
        <div className="container-role">
            <div>
                <h1>Welcome!</h1>
                <h3>Select User Type</h3>
            </div>
            <div className="button-group">
                <button 
                    className="user-type-button" 
                    onClick={() => navigateTo('/studentlogin')}>
                    Student
                </button>
                <button 
                    className="user-type-button" 
                    onClick={() => navigateTo('/teacherlogin')}>
                    Teacher
                </button>
                <button 
                    className="user-type-button" 
                    onClick={() => navigateTo('/adminlogin')}>
                    Admin
                </button>
            </div>
        </div>
    </div>
        
)}


