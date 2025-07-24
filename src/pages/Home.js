// File: src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <div className="header-section">
          
          <h1 className="main-title">Attendance Management System</h1>
          <p className="subtitle">Professional attendance tracking solution</p>
        </div>

        <div className="welcome-card">
          <h2 className="welcome-text">Welcome</h2>
          <p className="description">
            Please select your role to access the system
          </p>
          
          <div className="button-container">
            <Link to="/teacher/login" className="login-btn teacher-btn">
              <div className="btn-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
                </svg>
              </div>
              <div className="btn-content">
                <span className="btn-title">Teacher Login</span>
                <span className="btn-subtitle">Manage classes and attendance</span>
              </div>
            </Link>

            <Link to="/student/login" className="login-btn student-btn">
              <div className="btn-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                </svg>
              </div>
              <div className="btn-content">
                <span className="btn-title">Student Login</span>
                <span className="btn-subtitle">View attendance records</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          padding: 20px;
        }

        .main-content {
          width: 100%;
          max-width: 480px;
        }

        .header-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .icon-wrapper {
          margin-bottom: 20px;
        }

        .main-icon {
          width: 64px;
          height: 64px;
          fill: #ffffff;
        }

        .main-title {
          font-size: 2.2rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .subtitle {
          color: #cccccc;
          font-size: 1rem;
          font-weight: 400;
          margin: 0;
        }

        .welcome-card {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 40px 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 1px solid #333333;
        }

        .welcome-text {
          color: #ffffff;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0 0 12px 0;
          text-align: center;
        }

        .description {
          color: #cccccc;
          font-size: 1rem;
          text-align: center;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .login-btn {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          border-radius: 8px;
          text-decoration: none;
          border: 2px solid #333333;
          background: #2a2a2a;
          color: #ffffff;
        }

        .login-btn:hover {
          border-color: #007bff;
          background-color: #1a2332;
        }

        .teacher-btn:hover {
          border-color: #28a745;
          background-color: #1a2e1a;
        }

        .student-btn:hover {
          border-color: #007bff;
          background-color: #1a2332;
        }

        .btn-icon {
          width: 48px;
          height: 48px;
          margin-right: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #404040;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .teacher-btn .btn-icon {
          background-color: #1a3a1a;
        }

        .teacher-btn .btn-icon svg {
          fill: #28a745;
        }

        .student-btn .btn-icon {
          background-color: #1a2947;
        }

        .student-btn .btn-icon svg {
          fill: #007bff;
        }

        .btn-icon svg {
          width: 24px;
          height: 24px;
          fill: #cccccc;
        }

        .btn-content {
          flex: 1;
          text-align: left;
        }

        .btn-title {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: #ffffff;
        }

        .btn-subtitle {
          display: block;
          font-size: 0.9rem;
          color: #cccccc;
          font-weight: 400;
        }

        @media (max-width: 640px) {
          .home-container {
            padding: 16px;
          }
          
          .main-title {
            font-size: 1.8rem;
          }
          
          .welcome-card {
            padding: 32px 24px;
          }
          
          .welcome-text {
            font-size: 1.5rem;
          }
          
          .login-btn {
            padding: 18px 20px;
          }
          
          .btn-title {
            font-size: 1rem;
          }
          
          .btn-subtitle {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;