import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

export default Module;
