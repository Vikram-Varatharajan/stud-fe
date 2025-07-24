// File: src/pages/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getStudents, 
  markAttendance, 
  getAttendanceHistory 
} from '../services/teacherService';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('teacherToken');
    if (!token) {
      navigate('/teacher/login');
      return;
    }
    loadStudents();
    loadAttendanceHistory();
  }, [navigate]);

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (err) {
      console.error('Error loading students:', err);
    }
  };

  const loadAttendanceHistory = async () => {
    try {
      const response = await getAttendanceHistory();
      setAttendanceHistory(response.data);
    } catch (err) {
      console.error('Error loading attendance history:', err);
    }
  };

  const handleMarkAttendance = async (studentId, status) => {
    setLoading(true);
    try {
      await markAttendance({
        studentId,
        date: selectedDate,
        status
      });
      setMessage(`Attendance marked as ${status} successfully!`);
      loadAttendanceHistory();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error marking attendance');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherToken');
    localStorage.removeItem('teacherData');
    navigate('/');
  };

  const renderStudents = () => (
    <div className="content-card">
      <div className="card-header">
        <h3 className="card-title">Mark Attendance</h3>
        <div className="date-section">
          <label className="date-label">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Class</th>
              <th>Mark Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td className="student-name">{student.name}</td>
                <td className="student-email">{student.email}</td>
                <td className="student-class">{student.class}</td>
                <td className="action-buttons">
                  <button
                    className="btn present-btn"
                    onClick={() => handleMarkAttendance(student._id, 'present')}
                    disabled={loading}
                  >
                    {loading ? 'Marking...' : 'Present'}
                  </button>
                  <button
                    className="btn absent-btn"
                    onClick={() => handleMarkAttendance(student._id, 'absent')}
                    disabled={loading}
                  >
                    {loading ? 'Marking...' : 'Absent'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendanceHistory = () => (
    <div className="content-card">
      <div className="card-header">
        <h3 className="card-title">Attendance History</h3>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory.map(record => (
              <tr key={record._id}>
                <td className="student-name">{record.studentId?.name || 'Unknown'}</td>
                <td className="record-date">{new Date(record.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${record.status}`}>
                    {record.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Teacher Dashboard</h1>
          <div className="user-section">
            <span className="welcome-text">Welcome, {teacherData.name}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="tab-navigation">
        <button
          className={`nav-tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Mark Attendance
        </button>
        <button
          className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          View History
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'history' && renderAttendanceHistory()}
      </div>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #000000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: #ffffff;
        }

        .dashboard-header {
          background: #1a1a1a;
          border-bottom: 1px solid #333333;
          padding: 20px 40px;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .welcome-text {
          color: #cccccc;
          font-size: 1rem;
        }

        .logout-btn {
          background: #dc3545;
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: #c82333;
        }

        .tab-navigation {
          background: #1a1a1a;
          padding:  0px;
          border-bottom: 1px solid #333333;
        }

        .tab-navigation {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 0;
        }

        .nav-tab {
          background: transparent;
          color: #cccccc;
          border: none;
          padding: 16px 24px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 3px solid transparent;
        }

        .nav-tab:hover {
          color: #ffffff;
          background: #2a2a2a;
        }

        .nav-tab.active {
          color: #28a745;
          border-bottom-color: #28a745;
          background: #1a2e1a;
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px;
        }

        .content-card {
          background: #1a1a1a;
          border-radius: 12px;
          border: 1px solid #333333;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .card-header {
          padding: 24px 32px;
          border-bottom: 1px solid #333333;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }

        .date-section {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .date-label {
          color: #cccccc;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .date-input {
          background: #2a2a2a;
          border: 2px solid #333333;
          border-radius: 6px;
          color: #ffffff;
          padding: 8px 12px;
          font-size: 0.9rem;
        }

        .date-input:focus {
          outline: none;
          border-color: #28a745;
        }

        .message {
          margin: 24px 32px;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .message.success {
          background: #1a2e1a;
          color: #28a745;
          border: 1px solid #28a745;
        }

        .message.error {
          background: #2d1a1a;
          color: #dc3545;
          border: 1px solid #dc3545;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          background: #2a2a2a;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: left;
          padding: 16px 24px;
          border-bottom: 1px solid #333333;
        }

        .data-table td {
          padding: 16px 24px;
          border-bottom: 1px solid #333333;
          color: #cccccc;
        }

        .data-table tr:hover {
          background: #2a2a2a;
        }

        .student-name {
          font-weight: 500;
          color: #ffffff;
        }

        .student-email {
          color: #999999;
          font-size: 0.9rem;
        }

        .student-class {
          font-weight: 500;
        }

        .record-date {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          min-width: 80px;
        }

        .present-btn {
          background: #28a745;
          color: #ffffff;
        }

        .present-btn:hover:not(:disabled) {
          background: #218838;
        }

        .absent-btn {
          background: #dc3545;
          color: #ffffff;
        }

        .absent-btn:hover:not(:disabled) {
          background: #c82333;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.present {
          background: #1a2e1a;
          color: #28a745;
          border: 1px solid #28a745;
        }

        .status-badge.absent {
          background: #2d1a1a;
          color: #dc3545;
          border: 1px solid #dc3545;
        }

        @media (max-width: 768px) {
          .dashboard-header,
          .tab-navigation,
          .dashboard-content {
            padding-left: 20px;
            padding-right: 20px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .user-section {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .card-header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .data-table {
            font-size: 0.8rem;
          }

          .data-table th,
          .data-table td {
            padding: 12px 16px;
          }

          .action-buttons {
            flex-direction: column;
            gap: 8px;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;