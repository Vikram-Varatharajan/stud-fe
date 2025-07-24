
// File: src/services/teacherService.js
import api from './api';

export const loginTeacher = (credentials) => {
  return api.post('/teacher/login', credentials);
};

export const getStudents = () => {
  return api.get('/teacher/students');
};

export const markAttendance = (attendanceData) => {
  return api.post('/teacher/mark-attendance', attendanceData);
};

export const getAttendanceHistory = () => {
  return api.get('/teacher/attendance-history');
};
