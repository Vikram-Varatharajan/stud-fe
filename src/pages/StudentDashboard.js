// File: src/pages/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentAttendance } from '../services/studentService';

const StudentDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      navigate('/student/login');
      return;
    }
    loadAttendance();
  }, [navigate]);

  const loadAttendance = async () => {
    try {
      const response = await getStudentAttendance();
      setAttendance(response.data);
    } catch (err) {
      console.error('Error loading attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentData');
    navigate('/');
  };

  const getAttendanceStats = () => {
    if (attendance.length === 0) return { present: 0, absent: 0, percentage: 0 };
    
    const present = attendance.filter(record => record.status === 'present').length;
    const absent = attendance.filter(record => record.status === 'absent').length;
    const percentage = ((present / attendance.length) * 100).toFixed(1);
    
    return { present, absent, percentage };
  };

  const stats = getAttendanceStats();

  // Dark theme styles
  const darkStyles = {
    container: {
      backgroundColor: '#121212',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '20px'
    },
    card: {
      backgroundColor: '#1e1e1e',
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    },
    header: {
      backgroundColor: '#2d2d2d',
      padding: '15px 20px',
      borderRadius: '8px',
      marginBottom: '20px',
      border: '1px solid #444'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    btn: {
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    btnDanger: {
      backgroundColor: '#dc3545',
      color: 'white'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      backgroundColor: '#1e1e1e'
    },
    th: {
      backgroundColor: '#2d2d2d',
      color: '#ffffff',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #444'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #333',
      color: '#e0e0e0'
    },
    statusPresent: {
      backgroundColor: '#2e7d32',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    statusAbsent: {
      backgroundColor: '#d32f2f',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: 'bold'
    }
  };

  if (loading) {
    return (
      <div style={darkStyles.container}>
        <div style={{ ...darkStyles.card, textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={darkStyles.container}>
      <div style={darkStyles.header}>
        <div style={darkStyles.nav}>
          <h1 style={{ margin: 0, color: '#ffffff' }}>Student Dashboard</h1>
          <div>
            <span style={{ marginRight: '20px', color: '#e0e0e0' }}>
              Welcome, {studentData.name}
            </span>
            <button 
              style={{ ...darkStyles.btn, ...darkStyles.btnDanger }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div style={darkStyles.grid}>
        <div style={darkStyles.card}>
          <h3 style={{ color: '#ffffff', marginTop: 0 }}>Attendance Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#66bb6a', margin: '0 0 8px 0' }}>{stats.present}</h2>
              <p style={{ color: '#b0b0b0', margin: 0 }}>Present Days</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#ef5350', margin: '0 0 8px 0' }}>{stats.absent}</h2>
              <p style={{ color: '#b0b0b0', margin: 0 }}>Absent Days</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#42a5f5', margin: '0 0 8px 0' }}>{stats.percentage}%</h2>
              <p style={{ color: '#b0b0b0', margin: 0 }}>Attendance Rate</p>
            </div>
          </div>
        </div>

        <div style={darkStyles.card}>
          <h3 style={{ color: '#ffffff', marginTop: 0 }}>Student Information</h3>
          <div style={{ marginTop: '20px' }}>
            <p style={{ color: '#e0e0e0' }}>
              <strong style={{ color: '#ffffff' }}>Name:</strong> {studentData.name}
            </p>
            <p style={{ color: '#e0e0e0' }}>
              <strong style={{ color: '#ffffff' }}>Email:</strong> {studentData.email}
            </p>
            <p style={{ color: '#e0e0e0' }}>
              <strong style={{ color: '#ffffff' }}>Class:</strong> {studentData.class}
            </p>
            <p style={{ color: '#e0e0e0' }}>
              <strong style={{ color: '#ffffff' }}>Total Records:</strong> {attendance.length}
            </p>
          </div>
        </div>
      </div>

      <div style={darkStyles.card}>
        <h3 style={{ color: '#ffffff', marginTop: 0 }}>Attendance Records</h3>
        {attendance.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
            No attendance records found.
          </p>
        ) : (
          <table style={darkStyles.table}>
            <thead>
              <tr>
                <th style={darkStyles.th}>Date</th>
                <th style={darkStyles.th}>Status</th>
                <th style={darkStyles.th}>Marked By</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(record => (
                <tr key={record._id}>
                  <td style={darkStyles.td}>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td style={darkStyles.td}>
                    <span style={record.status === 'present' ? darkStyles.statusPresent : darkStyles.statusAbsent}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={darkStyles.td}>
                    {record.teacherId?.name || 'Unknown Teacher'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;