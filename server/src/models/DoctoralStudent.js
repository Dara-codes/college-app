const mongoose = require('mongoose');

const DoctoralStudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  thesisTitle: {
    type: String,
    required: [true, 'Please add a research topic']
  },
  thesisDescription: {
    type: String,
    required: [true, 'Please add a research topic']
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor'
  },
  startDate: {
    type: Date,
    required: [false, 'Please add a start date'],
    default: Date.now()
  },
  expectedCompletionDate: {
    type: Date,
    required: [false, 'Please add an expected completion date']
  },
  milestones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Milestone'
    }
  ],
  researchInterest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ResearchInterest'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DoctoralStudent', DoctoralStudentSchema);