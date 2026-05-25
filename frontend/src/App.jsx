import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CoursePlayerPage from './pages/CoursePlayerPage';
import useAuthStore from './store/useAuthStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/courses" /> : <LoginPage />
          } 
        />
        <Route 
          path="/courses" 
          element={
            isAuthenticated ? <CoursesPage /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/course/:id" 
          element={
            isAuthenticated ? <CoursePlayerPage /> : <Navigate to="/" />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
