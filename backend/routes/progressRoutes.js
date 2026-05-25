import express from 'express';
import { getUserProgress, updateProgress } from '../controllers/progressController.js';

const router = express.Router();

router.get('/:userId/:courseId', getUserProgress);
router.put('/:userId/:moduleId', updateProgress);

export default router;
