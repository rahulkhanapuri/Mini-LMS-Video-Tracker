import mongoose from 'mongoose';
import Course from './models/Course.js';
import Module from './models/Module.js';
import UserProgress from './models/UserProgress.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mini-lms');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Course.deleteMany({});
    await Module.deleteMany({});
    await UserProgress.deleteMany({});

    // Create Modules
    const module1 = new Module({
      title: 'Introduction to React',
      description: 'Learn the basics of React, components, and JSX.',
      videoUrl: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
    });

    const module2 = new Module({
      title: 'State and Props',
      description: 'Understanding data flow in React applications.',
      videoUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4'
    });

    const module3 = new Module({
      title: 'React Hooks',
      description: 'Deep dive into useState, useEffect, and custom hooks.',
      videoUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4'
    });

    const module4 = new Module({
      title: 'Context API',
      description: 'Managing global state without prop drilling.',
      videoUrl: 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4'
    });

    const module5 = new Module({
      title: "React Router",
      description: "Adding navigation to your Single Page Application.",
      videoUrl:"https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4",
    });

    const savedModules = await Promise.all([
      module1.save(),
      module2.save(),
      module3.save(),
      module4.save(),
      module5.save()
    ]);

    // Create Course
    const course = new Course({
      title: 'Advanced React Development',
      description: 'Master React by building scalable and maintainable applications.',
      modules: savedModules.map(m => m._id)
    });

    await course.save();

    console.log('Database seeded successfully');
    console.log(`Course ID: ${course._id}`);
    console.log('You can use this Course ID to test the frontend.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
