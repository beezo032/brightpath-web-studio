import express from 'express';
import Lead from '../models/Lead.js';
import { authenticateToken } from '../middleware/auth.js';
import { leadLimiter } from '../middleware/rateLimits.js';
import { claimSubmission, normalizeLead } from '../services/leadSecurity.js';
import { sendLeadEmail } from '../services/leadEmail.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
    const query = {};
    const search = typeof req.query.search === 'string' ? req.query.search.slice(0, 100).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
    if (search) query.$or = [{ businessName: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
    if (typeof req.query.status === 'string' && req.query.status) query.contactStatus = req.query.status;
    if (typeof req.query.industry === 'string' && req.query.industry) query.industry = req.query.industry;
    const allowedSorts = new Set(['createdAt', 'businessName', 'estimatedValue', 'contactStatus']);
    const sortBy = allowedSorts.has(req.query.sortBy) ? req.query.sortBy : 'createdAt';
    const sort = { [sortBy]: req.query.sortOrder === 'asc' ? 1 : -1 };
    const [leads, count] = await Promise.all([Lead.find(query).sort(sort).limit(limit).skip((page - 1) * limit), Lead.countDocuments(query)]);
    res.json({ leads, totalPages: Math.ceil(count / limit), currentPage: page, totalLeads: count });
  } catch { res.status(500).json({ error: 'Server Error' }); }
});

router.post('/', leadLimiter, async (req, res) => {
  try {
    let payload;
    try { payload = normalizeLead(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
    if (!claimSubmission(payload)) return res.status(409).json({ error: 'Duplicate submission' });
    const savedLead = await new Lead(payload).save();
    try { await sendLeadEmail(payload); } catch  {
      await Lead.findByIdAndDelete(savedLead._id).catch(() => {});
      return res.status(502).json({ error: 'Lead notification failed. Please try again.' });
    }
    return res.status(201).json(savedLead);
  } catch { return res.status(500).json({ error: 'Lead submission failed' }); }
});

router.post('/bulk', authenticateToken, async (req, res) => {
  if (!Array.isArray(req.body) || req.body.length > 100) return res.status(400).json({ error: 'Body must contain at most 100 leads' });
  try { res.status(201).json(await Lead.insertMany(req.body.map(normalizeLead))); } catch (error) { res.status(400).json({ error: error.message }); }
});
router.get('/:id', authenticateToken, async (req, res) => { try { const lead = await Lead.findById(req.params.id); return lead ? res.json(lead) : res.status(404).json({ error: 'Lead not found' }); } catch { return res.status(400).json({ error: 'Invalid lead ID' }); } });
router.put('/:id', authenticateToken, async (req, res) => { try { const lead = await Lead.findByIdAndUpdate(req.params.id, normalizeLead(req.body), { new: true, runValidators: true }); return lead ? res.json(lead) : res.status(404).json({ error: 'Lead not found' }); } catch (error) { return res.status(400).json({ error: error.message }); } });
router.delete('/:id', authenticateToken, async (req, res) => { try { const lead = await Lead.findByIdAndDelete(req.params.id); return lead ? res.json({ message: 'Lead deleted successfully' }) : res.status(404).json({ error: 'Lead not found' }); } catch { return res.status(400).json({ error: 'Invalid lead ID' }); } });

export default router;
