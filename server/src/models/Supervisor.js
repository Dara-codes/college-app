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
    required: [true, 'Please add a department']
  },
  specialization: {
    type: String,
    required: [true, 'Please add a specialization']
  },
  yearsOfExperience: {
    type: Number,
    required: [true, 'Please add years of experience']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);