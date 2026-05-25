import Course from '../models/Course.js';
import Module from '../models/Module.js';

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
};

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('modules');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error fetching course' });
  }
};

