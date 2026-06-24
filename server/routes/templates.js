import express from 'express';
import Template from '../models/Template.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

// GET all templates
router.get('/', async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

// POST new template
router.post('/', async (req, res) => {
  try {
    const { title, subject, body } = req.body;
    const template = new Template({ title, subject, body });
    await template.save();
    res.status(201).json({ template });
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({ error: 'Failed to create template' });
  }
});

// PUT update template
router.put('/:id', async (req, res) => {
  try {
    const { title, subject, body } = req.body;
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { title, subject, body, updatedAt: Date.now() },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json({ template });
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({ error: 'Failed to update template' });
  }
});

// DELETE template
router.delete('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({ error: 'Failed to delete template' });
  }
});

// Seed default templates if none exist
router.post('/seed', async (req, res) => {
  try {
    const count = await Template.countDocuments();
    if (count === 0) {
      const defaults = [
        {
          title: "Initial Outreach (Cold)",
          subject: "Ideas for {{BusinessName}}'s online presence",
          body: "Hi {{FirstName}},\n\nI came across {{BusinessName}} while searching for local businesses in your industry. I noticed a few areas where your website could be optimized to bring in more leads.\n\nI'd love to share a quick 5-minute audit I ran on your site. Are you free for a brief chat later this week?\n\nBest,\nBrightpath Team"
        },
        {
          title: "Audit Follow-up",
          subject: "Following up: {{BusinessName}} Website Audit",
          body: "Hi {{FirstName}},\n\nJust floating this to the top of your inbox. Did you get a chance to review the audit findings I sent over?\n\nI'm happy to walk you through it and answer any questions you might have.\n\nBest,\nBrightpath Team"
        },
        {
          title: "Proposal Sent",
          subject: "Proposal attached for {{BusinessName}}",
          body: "Hi {{FirstName}},\n\nIt was great speaking with you earlier! I've attached the detailed proposal and pricing breakdown for the project we discussed.\n\nPlease let me know if you have any questions or need adjustments before we move forward.\n\nBest,\nBrightpath Team"
        }
      ];
      await Template.insertMany(defaults);
      const templates = await Template.find().sort({ createdAt: -1 });
      return res.status(201).json({ message: 'Seeded default templates', templates });
    }
    res.json({ message: 'Templates already exist' });
  } catch (error) {
    console.error('Error seeding templates:', error);
    res.status(500).json({ error: 'Failed to seed templates' });
  }
});

export default router;
