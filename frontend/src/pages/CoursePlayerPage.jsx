import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import CoursePlaylist from '../components/CoursePlaylist';
import VideoPlayer from '../components/VideoPlayer';

const USER_ID = 'user123';
const API_BASE_URL = 'http://localhost:5000/api';

const CoursePlayerPage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        // Fetch full course details
        const courseDetailsRes = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
        const courseData = courseDetailsRes.data;
        setCourse(courseData);

        // Fetch user progress
        const progressRes = await axios.get(`${API_BASE_URL}/progress/${USER_ID}/${courseId}`);
        setCompletedModules(progressRes.data.completedModules || []);

        // Set active module to the first uncompleted one, or first overall
        if (courseData.modules && courseData.modules.length > 0) {
          const firstUncompleted = courseData.modules.find(
            m => !(progressRes.data.completedModules || []).includes(m._id)
          );
          setActiveModule(firstUncompleted || courseData.modules[0]);
        }
      } catch (err) {
        console.error("Error fetching course data:", err);
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!activeModule || !course) return;

    const moduleId = activeModule._id;
    
    // Check if already completed
    if (completedModules.includes(moduleId)) return;

    // Optimistic UI Update
    const previousCompleted = [...completedModules];
    setCompletedModules([...completedModules, moduleId]);

    try {
      await axios.put(`${API_BASE_URL}/progress/${USER_ID}/${moduleId}`, {
        courseId: course._id
      });
      // Optionally auto-advance to next module
      const currentIndex = course.modules.findIndex(m => m._id === moduleId);
      if (currentIndex !== -1 && currentIndex < course.modules.length - 1) {
        setTimeout(() => {
          setActiveModule(course.modules[currentIndex + 1]);
        }, 1000);
      }
    } catch (err) {
      console.error("Error marking complete:", err);
      // Revert optimistic update on failure
      setCompletedModules(previousCompleted);
      alert('Failed to mark as complete. Please try again.');
    }
  };

  if (loading) return <div className="loading-container">Loading player...</div>;
  if (error) return <div className="loading-container" style={{color: 'red'}}>{error}</div>;

  return (
    <div className="app-container">
      <div className="navbar">
        <button 
          onClick={() => navigate('/courses')} 
          style={{background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: '500'}}
        >
          <ArrowLeft size={20} /> Back to Courses
        </button>
        <div className="nav-brand">{course?.title}</div>
        <div style={{width: '100px'}}></div> {/* spacer */}
      </div>

      <div className="progress-area">
        <ProgressBar 
          totalModules={course?.modules?.length || 0} 
          completedModulesCount={completedModules.length} 
        />
      </div>
      
      <div className="player-layout">
        <VideoPlayer 
          activeModule={activeModule}
          isCompleted={activeModule ? completedModules.includes(activeModule._id) : false}
          onMarkComplete={handleMarkComplete}
        />
        
        <CoursePlaylist 
          course={course}
          completedModules={completedModules}
          activeModule={activeModule}
          onSelectModule={setActiveModule}
        />
      </div>
    </div>
  );
};

export default CoursePlayerPage;
