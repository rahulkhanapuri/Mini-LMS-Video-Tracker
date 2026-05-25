import express from 'express';
import { getCourseById, getAllCourses } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;
