import UserProgress from '../models/UserProgress.js';
import Course from '../models/Course.js';

// GET /api/progress/:userId/:courseId
export const getUserProgress = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    let progress = await UserProgress.findOne({ userId, courseId });
    
    if (!progress) {
      // Return empty progress if none exists yet
      return res.json({
        userId,
        courseId,
        completedModules: []
      });
    }

    res.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    res.status(500).json({ message: 'Server error fetching progress' });
  }
};

// PUT /api/progress/:userId/:moduleId
export const updateProgress = async (req, res) => {
  const { userId, moduleId } = req.params;
  const { courseId } = req.body; // Expect courseId in the body to know which progress to update

  if (!courseId) {
    return res.status(400).json({ message: 'courseId is required in the request body' });
  }

  try {
    // Find or create the progress record
    let progress = await UserProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new UserProgress({
        userId,
        courseId,
        completedModules: [moduleId]
      });
    } else {
      // Add moduleId if not already present
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
      }
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Server error updating progress' });
  }
};
