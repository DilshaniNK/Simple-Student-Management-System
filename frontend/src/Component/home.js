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
    <div className="App">
      <h1 className="heading">
        Write your future with{" "}
        <span style={{ color: "#1E2A5E", fontSize: "40px" }}>ChalkBoard !</span>
      </h1>
      <div className="animated-text"></div>
      <div className="modal-container">
        <div className="modal">
          <div className="modal-body">
            <h1>Select User Type</h1>
            <div className="button-group">
              <button
                className="user-type-button"
                onClick={() => navigateTo("/studentlogin")}
              >
                Student
              </button>
              <button
                className="user-type-button"
                onClick={() => navigateTo("/teacherlogin")}
              >
                Teacher
              </button>
              <button
                className="user-type-button"
                onClick={() => navigateTo("/adminlogin")}
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
