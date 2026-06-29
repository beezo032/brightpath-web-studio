import express from 'express';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import { authenticateToken } from '../middleware/auth.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const sendLeadEmail = async (lead) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO } = process.env;
  
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('WARNING: SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured. Email notifications are skipped.');
    return;
  }

  const recipient = SMTP_TO || 'hello@signallightstudio.com';
  const port = Number(SMTP_PORT) || 587;
  const isSecure = port === 465;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: port,
    secure: isSecure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"Signal Light Studio Alerts" <${SMTP_USER}>`,
    to: recipient,
    subject: `🚨 New Lead Captured: ${lead.businessName || 'Unknown Business'}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; color: #1e293b;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 20px;">New Lead Submission</h2>
        <p>A new lead has been submitted on the website. Details are listed below:</p>
        
        <table style="border-collapse: collapse; width: 100%; margin-top: 15px; margin-bottom: 25px;">
          <tr style="background-color: #f8fafc;">
            <th style="border: 1px solid #e2e8f0; text-align: left; padding: 12px; font-weight: bold; width: 180px;">Field</th>
            <th style="border: 1px solid #e2e8f0; text-align: left; padding: 12px; font-weight: bold;">Value</th>
          </tr>
          <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Business Name</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">${lead.businessName || 'N/A'}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Industry / Niche</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">${lead.industry || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Email Address</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px;"><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email || 'N/A'}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Phone Number</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">${lead.phone || 'N/A'}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Website URL</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px;">${lead.websiteUrl ? `<a href="${lead.websiteUrl}" target="_blank" style="color: #2563eb; text-decoration: none;">${lead.websiteUrl}</a>` : 'N/A'}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold;">Estimated Value</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px; color: #16a34a; font-weight: bold;">$${lead.estimatedValue || 0}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #e2e8f0; padding: 12px; font-weight: bold; vertical-align: top;">Notes / Details</td>
            <td style="border: 1px solid #e2e8f0; padding: 12px; white-space: pre-wrap; line-height: 1.5;">${lead.notes || 'N/A'}</td>
          </tr>
        </table>
        
        <p style="margin-top: 30px; font-size: 0.85em; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          This notification was generated automatically by the Signal Light Studio backend. 
          You can manage this lead by logging into your CRM dashboard.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Successfully sent email alert to ${recipient} for lead: ${lead.businessName}`);
  } catch (err) {
    console.error('Error sending lead email alert:', err);
  }
};

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = '', 
      industry = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) query.contactStatus = status;
    if (industry) query.industry = industry;

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const leads = await Lead.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Lead.countDocuments(query);

    res.json({
      leads,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalLeads: count
    });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    let savedLead = null;
    let dbError = null;
    
    try {
      if (mongoose.connection.readyState >= 1) {
        savedLead = await newLead.save();
      } else {
        console.warn('Database is not connected. Skipping MongoDB save.');
      }
    } catch (dbErr) {
      console.error('Failed to save lead to database:', dbErr.message);
      dbError = dbErr.message;
    }
    
    // Await email notification to ensure it finishes executing on Vercel's serverless container
    try {
      await sendLeadEmail(req.body);
    } catch (mailErr) {
      console.error('Background sendLeadEmail failed:', mailErr.message);
    }
    
    res.status(201).json(savedLead || { 
      message: 'Lead received successfully', 
      warning: dbError || 'Database is down' 
    });
  } catch (error) {
    // Return friendly success anyway to prevent user-facing errors
    res.status(201).json({ message: 'Lead received successfully' });
  }
});

router.post('/bulk', authenticateToken, async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Body must be an array of leads' });
    }
    const savedLeads = await Lead.insertMany(req.body);
    res.status(201).json(savedLeads);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

export default router;
