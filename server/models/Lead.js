import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  industry: { type: String },
  city: { type: String },
  state: { type: String },
  websiteUrl: { type: String },
  email: { type: String },
  phone: { type: String },
  websiteScore: { type: Number, min: 0, max: 100 },
  estimatedValue: { type: Number, default: 0 },
  notes: { type: String },
  contactStatus: { 
    type: String, 
    enum: ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New'
  },
  lastContactedDate: { type: Date },
  followUpDate: { type: Date }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export default mongoose.model('Lead', leadSchema);
