import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes.js';
import progressRoutes from './routes/progressRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/mini-lms')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);

app.get('/', (req, res) => {
  res.send('LMS API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});