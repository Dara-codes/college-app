const mongoose = require('mongoose');

const ResearchInterestSchema = new mongoose.Schema({
  researchMethod: {
    type: String,
    required: [true, 'Please add a research method'],
    trim: true,
    maxlength: [150, 'Research method can not be more than 50 characters']
  },
  interests: {
    type: String,
    trim: true
  },
  researchGoals: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResearchInterest', ResearchInterestSchema);