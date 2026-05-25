import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const CoursesPage = ({ onLogout }) => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(res.data);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="loading-container">Loading courses...</div>;
  if (error) return <div className="loading-container" style={{color: 'red'}}>{error}</div>;

  return (
    <div className="app-container">
      <div className="navbar">
        <div className="nav-brand">Mini-LMS Courses</div>
        <div className="nav-actions">
          <button onClick={handleLogout} style={{background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="page-container">
        <div className="page-header">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div 
              key={course._id} 
              className="course-card"
              onClick={() => navigate(`/course/${course._id}`)}
            >
              <div className="course-thumbnail">
                {/* Placeholder thumbnail */}
                {course.title.charAt(0)}
              </div>
              <div className="course-info">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
              </div>
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div style={{ color: 'var(--text-secondary)' }}>No courses found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
