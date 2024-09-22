const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  issuingAuthority: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // Duration in days
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  isRequested: {
    type: Boolean,
    default: true, // Set to true when a certificate is submitted for approval
  },
  isApproved: {
    type: Boolean,
    default: false, // Set to true once the certificate is approved by the admin
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who added the certificate
    ref: 'User', // Assuming you have a User model
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model based on the schema
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
