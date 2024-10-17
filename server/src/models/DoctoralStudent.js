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
  researchTopic: {
    type: String,
    required: [true, 'Please add a research topic']
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor'
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  expectedCompletionDate: {
    type: Date,
    required: [true, 'Please add an expected completion date']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('DoctoralStudent', DoctoralStudentSchema);