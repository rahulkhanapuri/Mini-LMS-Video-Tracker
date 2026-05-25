import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedModules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
  }],
}, { timestamps: true });

// Ensure a user has only one progress record per course
userProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
