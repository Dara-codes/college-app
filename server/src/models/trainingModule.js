const mongoose = require('mongoose');

const TrainingModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['research', 'writing', 'ethics', 'mentorship', 'supervision']
  },
  targetAudience: {
    type: String,
    required: [true, 'Please specify the target audience'],
    enum: ['doctoral_student', 'supervisor', 'both']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // This option adds createdAt and updatedAt fields
});

module.exports = mongoose.model('TrainingModule', TrainingModuleSchema);