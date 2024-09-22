const express = require("express");
const router = express.Router();
const Certificate=require("../models/Certificate");

const mongoose = require('mongoose');


// POST API to add a new certificate
router.post('/submitcertificates', async (req, res) => {
  try {
    const {
      candidateName,
      courseTitle,
      issuingAuthority,
      duration,
      issueDate,
      addedBy, // Assume this is the user ID of the person submitting the certificate
    } = req.body;

    // Create a new certificate instance
    const newCertificate = new Certificate({
      candidateName,
      courseTitle,
      issuingAuthority,
      duration,
      issueDate,
      addedBy,
      isRequested: true, // Set to true when submitted for approval
      isApproved: false, // Default to false
    });

    // Save the certificate to the database
    await newCertificate.save();

    // Send success response
    res.status(201).json({
      message: 'Certificate added successfully!',
      certificate: newCertificate,
    });
  } catch (error) {
    console.error('Error adding certificate:', error);
    res.status(500).json({
      message: 'Error adding certificate',
      error: error.message,
    });
  }
});

module.exports = router;
