import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
  const navigate = useNavigate();

  // Function to handle navigation
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className='App'>
      <div className='animated-text'>
        <h1>Take Your Step with Us</h1>
      </div>
      <div className='modal-container'>
        
        <div className="modal">
          
          <div className="modal-body">
            <h1>Select User Type</h1>
            <div className="button-group">
              <button 
                className="user-type-button" 
                onClick={() => navigateTo('/studentlogin')}
              >
                Student
              </button>
              <button 
                className="user-type-button" 
                onClick={() => navigateTo('/teacherlogin')}
              >
                Teacher
              </button>
              <button 
                className="user-type-button" 
                onClick={() => navigateTo('/adminlogin')}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
