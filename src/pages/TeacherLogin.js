// File: src/pages/TeacherLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginTeacher } from '../services/teacherService';

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginTeacher(formData);
      localStorage.setItem('teacherToken', response.data.token);
      localStorage.setItem('teacherData', JSON.stringify(response.data.teacher));
      navigate('/teacher/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="header-section">
          <Link to="/" className="back-btn">
            <svg viewBox="0 0 24 24" className="back-icon">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.42-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Home
          </Link>
          
          <div className="login-header">
          
            <h1 className="login-title">Teacher Login</h1>
            <p className="login-subtitle">Sign in to manage your classes</p>
          </div>
        </div>

        <div className="login-card">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper"> 
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
               
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" className="error-icon">
                  <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg viewBox="0 0 24 24" className="loading-icon">
                    <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          padding: 20px;
        }

        .login-content {
          width: 100%;
          max-width: 420px;
        }

        .header-section {
          margin-bottom: 40px;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          color: #cccccc;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 30px;
          padding: 8px 0;
        }

        .back-btn:hover {
          color: #ffffff;
        }

        .back-icon {
          width: 20px;
          height: 20px;
          fill: currentColor;
          margin-right: 8px;
        }

        .login-header {
          text-align: center;
        }

        .icon-wrapper {
          margin-bottom: 20px;
        }

        .teacher-icon {
          width: 64px;
          height: 64px;
          fill: #28a745;
        }

        .login-title {
          font-size: 2.2rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 8px 0;
        }

        .login-subtitle {
          color: #cccccc;
          font-size: 1rem;
          margin: 0;
        }

        .login-card {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 40px 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 1px solid #333333;
        }

        .login-form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          fill: #666666;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          background: #2a2a2a;
          border: 2px solid #333333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 1rem;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #28a745;
          background: #2d2d2d;
        }

        .form-input:focus + .input-icon {
          fill: #28a745;
        }

        .form-input::placeholder {
          color: #666666;
        }

        .error-message {
          display: flex;
          align-items: center;
          background: #2d1a1a;
          color: #ff6b6b;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid #4d2626;
          margin-bottom: 24px;
          font-size: 0.9rem;
        }

        .error-icon {
          width: 18px;
          height: 18px;
          fill: currentColor;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          background: #28a745;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #218838;
        }

        .submit-btn:disabled {
          background: #1e7e34;
          cursor: not-allowed;
        }

        .loading-icon {
          width: 20px;
          height: 20px;
          fill: currentColor;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 16px;
          }
          
          .login-title {
            font-size: 1.8rem;
          }
          
          .login-card {
            padding: 32px 24px;
          }
          
          .form-input {
            padding: 14px 14px 14px 44px;
          }
          
          .submit-btn {
            padding: 14px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default TeacherLogin;