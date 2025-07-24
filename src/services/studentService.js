


// File: src/services/studentService.js
import api from './api';

export const loginStudent = (credentials) => {
  return api.post('/student/login', credentials);
};

export const getStudentAttendance = () => {
  return api.get('/student/attendance');
};
