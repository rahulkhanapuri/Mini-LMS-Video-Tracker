import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const useCourseStore = create((set, get) => ({
  // State for Courses List
  courses: [],
  searchQuery: '',
  isFetchingCourses: false,
  coursesError: null,

  // State for Course Player
  activeCourse: null,
  activeModule: null,
  completedModules: [],
  isFetchingPlayer: false,
  playerError: null,

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setActiveModule: (module) => set({ activeModule: module }),

  fetchCourses: async () => {
    set({ isFetchingCourses: true, coursesError: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`);
      set({ courses: res.data, isFetchingCourses: false });
    } catch (err) {
      set({ coursesError: 'Failed to fetch courses.', isFetchingCourses: false });
    }
  },

  fetchCourseData: async (courseId, userId) => {
    set({ isFetchingPlayer: true, playerError: null });
    try {

      const courseDetailsRes = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
      const courseData = courseDetailsRes.data;
      
      
      const progressRes = await axios.get(`${API_BASE_URL}/progress/${userId}/${courseId}`);
      const completedIds = progressRes.data.completedModules || [];


      let currentActiveModule = courseData.modules[0];
      if (courseData.modules && courseData.modules.length > 0) {
        const firstUncompleted = courseData.modules.find(
          m => !completedIds.includes(m._id)
        );
        
        currentActiveModule = firstUncompleted || courseData.modules[0];
      }

      set({ 
        activeCourse: courseData,
        completedModules: completedIds,
        activeModule: currentActiveModule,
        isFetchingPlayer: false 
      });
    } catch (err) {
      set({ playerError: 'Failed to load course details.', isFetchingPlayer: false });
    }
  },

  markModuleComplete: async (moduleId, courseId, userId) => {
    const { completedModules, activeCourse } = get();
    
    if (completedModules.includes(moduleId)) return;

    // Optimistic UI Update
    const previousCompleted = [...completedModules];
    set({ completedModules: [...completedModules, moduleId] });

    try {
      await axios.put(`${API_BASE_URL}/progress/${userId}/${moduleId}`, {
        courseId
      });
      
      // Auto-advance logic
      if (activeCourse && activeCourse.modules) {
        const currentIndex = activeCourse.modules.findIndex(m => m._id === moduleId);
        if (currentIndex !== -1 && currentIndex < activeCourse.modules.length - 1) {
          setTimeout(() => {
            // Need to read fresh state in case it changed during timeout
            const freshActiveCourse = get().activeCourse;
            if (freshActiveCourse && freshActiveCourse._id === courseId) {
              set({ activeModule: freshActiveCourse.modules[currentIndex + 1] });
            }
          }, 1000);
        }
      }
    } catch (err) {
      // Revert on failure
      set({ completedModules: previousCompleted });
      alert('Failed to mark as complete. Please try again.');
    }
  }
}));

export default useCourseStore;
