// File: src/pages/StudentLogin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginStudent } from '../services/studentService';

const StudentLogin = () => {
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
      const response = await loginStudent(formData);
      localStorage.setItem('studentToken', response.data.token);
      localStorage.setItem('studentData', JSON.stringify(response.data.student));
      navigate('/student/dashboard');
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
            ← Back to Home
          </Link>
          
          <div className="login-header">
            
            <h1 className="login-title">Student Login</h1>
            <p className="login-subtitle">Sign in to view your attendance</p>
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
                <span className="error-icon">⚠️</span>
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
                  <span className="loading-spinner">↻</span>
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

        .login-header {
          text-align: center;
        }

        .icon-wrapper {
          margin-bottom: 20px;
        }

        .student-icon {
          font-size: 4rem;
          line-height: 1;
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
          font-size: 1.2rem;
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
          border-color: #007bff;
          background: #2d2d2d;
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
          margin-right: 8px;
          flex-shrink: 0;
          font-size: 1.1rem;
        }

        .submit-btn {
          width: 100%;
          padding: 16px 24px;
          background: #007bff;
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
          background: #0056b3;
        }

        .submit-btn:disabled {
          background: #004085;
          cursor: not-allowed;
        }

        .loading-spinner {
          font-size: 1.2rem;
          animation: spin 1s linear infinite;
          display: inline-block;
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
          
          .student-icon {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentLogin;