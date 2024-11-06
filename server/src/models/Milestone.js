const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title can not be more than 50 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
    default: Date.now()
  },
  deadlineDate: {
    type: Date,
    required: [true, 'Please add a deadline date']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // This option adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Milestone', MilestoneSchema);