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
          title: "Cold Outreach #1 — No Website",
          subject: "{{BusinessName}} — quick question about your website",
          body: "Hi {{FirstName}},\n\nI was searching for {{Industry}} businesses in the area and came across {{BusinessName}}. I noticed you don't currently have a website — or at least I couldn't find one.\n\nI build fast, professional websites specifically for local businesses like yours. A well-built site can help you show up on Google, build trust instantly, and turn people searching for your services into actual paying customers.\n\nI'd love to put together a free, no-obligation mockup for {{BusinessName}} so you can see exactly what it could look like before committing to anything.\n\nWould that be of interest? Takes about 5 minutes to discuss.\n\nBest,\nBrandon\nSignalRise Studio\nhello@signalrisestudio.com"
        },
        {
          title: "Cold Outreach #2 — Outdated Website",
          subject: "I had some ideas for {{BusinessName}}'s website",
          body: "Hi {{FirstName}},\n\nI came across {{BusinessName}} online and checked out your current website. You've clearly built a solid business — but I think your website might be holding you back from getting even more customers online.\n\nI specialize in building high-converting websites for local businesses. I recently helped a similar business in your industry update their site and they saw a significant increase in phone calls and quote requests within the first month.\n\nI'd love to do a free, 5-minute website audit for {{BusinessName}} and share a few specific ideas that could make a real difference. No pressure — just genuine value.\n\nWould Tuesday or Wednesday work for a quick call?\n\nBest,\nBrandon\nSignalRise Studio\nhello@signalrisestudio.com"
        },
        {
          title: "Follow-Up #1 — After Initial Outreach",
          subject: "Re: {{BusinessName}} website",
          body: "Hi {{FirstName}},\n\nI wanted to follow up on my last message about {{BusinessName}}'s website. I know things get busy — totally understand.\n\nI put together a quick list of 3 specific improvements that could help you get more leads from Google. Happy to send it over if you're interested.\n\nEither way, hope things are going well!\n\nBest,\nBrandon\nSignalRise Studio"
        },
        {
          title: "Follow-Up #2 — Final Touch",
          subject: "Last follow-up — {{BusinessName}}",
          body: "Hi {{FirstName}},\n\nI'll keep this short — I don't want to keep showing up in your inbox if the timing isn't right.\n\nIf you ever decide you'd like a modern website that helps bring in more business, I'd love to help. No hard sell, just good work at fair prices.\n\nFeel free to check out some of our recent work at signalrisestudio.com.\n\nWishing you and {{BusinessName}} continued success!\n\nBest,\nBrandon\nSignalRise Studio"
        },
        {
          title: "Post-Meeting — Proposal Coming",
          subject: "Great talking with you, {{FirstName}} — proposal on the way",
          body: "Hi {{FirstName}},\n\nThank you for taking the time to chat today! It was great learning more about {{BusinessName}} and what you're trying to accomplish.\n\nBased on our conversation, I'll be putting together a custom proposal that covers:\n\n• The recommended package and deliverables\n• Timeline from kickoff to launch\n• Total investment and payment structure\n• Next steps to get started\n\nYou can expect to receive it within 24–48 hours. In the meantime, feel free to reach out if you think of any questions.\n\nLooking forward to working with you!\n\nBest,\nBrandon\nSignalRise Studio\nhello@signalrisestudio.com"
        },
        {
          title: "Proposal Follow-Up",
          subject: "Following up on your proposal — {{BusinessName}}",
          body: "Hi {{FirstName}},\n\nI wanted to check in on the proposal I sent over for {{BusinessName}}. Did you have a chance to look it over?\n\nI'm happy to answer any questions, adjust the scope, or jump on a quick call to walk through it together.\n\nJust let me know what works best for you!\n\nBest,\nBrandon\nSignalRise Studio"
        },
        {
          title: "Project Kickoff",
          subject: "We're official! Kickoff details for {{BusinessName}}",
          body: "Hi {{FirstName}},\n\nThis is exciting — welcome to SignalRise Studio! I'm looking forward to building something great for {{BusinessName}}.\n\nHere's what happens next:\n\n1. I'll send over a brief questionnaire to collect your brand details, preferences, and any content you have ready\n2. You'll receive a design concept within 5–7 business days\n3. We'll review it together and make any adjustments\n4. Once approved, I'll complete the build and we'll launch!\n\nExpect to hear from me within 24 hours with the onboarding questionnaire. In the meantime, start gathering any logos, photos, or text you'd like to include.\n\nLet's build something great!\n\nBest,\nBrandon\nSignalRise Studio"
        },
        {
          title: "Launch Day Announcement",
          subject: "🚀 {{BusinessName}}'s new website is LIVE!",
          body: "Hi {{FirstName}},\n\nThe moment we've been working toward — {{BusinessName}}'s new website is officially live!\n\nYour site is now:\n✅ Live and accessible to the public\n✅ Indexed by Google (full ranking takes 4–6 weeks)\n✅ Mobile-optimized and fast-loading\n✅ Ready to capture leads\n\nHere's what I'd recommend doing today:\n• Share the link on your social media\n• Update your Google Business Profile with the new URL\n• Send the link to past customers and ask for a Google review\n\nIt's been a pleasure working with you. If you ever need updates, have questions, or want to talk about growing your online presence further — I'm just an email away.\n\nCongratulations!\n\nBrandon\nSignalRise Studio\nhello@signalrisestudio.com"
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

