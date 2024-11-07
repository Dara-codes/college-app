const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: [true, 'Please add a department'] // TODO - change to point to the department collection instead
  },
  university: {
    type: String,
    required: [true, 'Please add a university'] // TODO - change to point to the university collection instead
  },
  specialization: {
    type: String,
  },
  yearsOfExperience: {
    type: String,
    required: [true, 'Please add years of experience']
  },
  academicTitle: {
    type: String,
    enum: ['Mr', 'Dr', 'Prof']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);