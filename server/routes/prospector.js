import express from 'express';
import fetch from 'node-fetch';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/search', async (req, res) => {
  const { industry, location } = req.body;
  const apiKey = process.env.YELP_API_KEY;

  if (!industry || !location) {
    return res.status(400).json({ error: 'Industry and Location are required' });
  }

  // If no API key is provided, return rich mock data so the user can test the UI
  if (!apiKey) {
    console.log('No YELP_API_KEY found. Returning mock data.');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResults = [
      {
        place_id: 'real_tx_1',
        name: 'Radiant Plumbing & Air Conditioning',
        formatted_address: '2908 San Gabriel St, Austin, TX 78705',
        formatted_phone_number: '(512) 263-9988',
        website: 'https://radiantplumbing.com/',
        rating: 4.8,
        user_ratings_total: 8452
      },
      {
        place_id: 'real_tx_2',
        name: 'ABC Home & Commercial Services',
        formatted_address: '9475 E Hwy 290, Austin, TX 78724',
        formatted_phone_number: '(512) 837-9500',
        website: 'https://www.abchomeandcommercial.com/austin',
        rating: 4.7,
        user_ratings_total: 4120
      },
      {
        place_id: 'real_ga_1',
        name: 'Reliable Heating & Air',
        formatted_address: '1305 Chastain Rd NW, Kennesaw, GA 30144',
        formatted_phone_number: '(770) 594-9969',
        website: 'https://reliableair.com/',
        rating: 4.9,
        user_ratings_total: 12503
      },
      {
        place_id: 'real_fl_1',
        name: 'CoolToday',
        formatted_address: '7025 Deacon Rd, Sarasota, FL 34238',
        formatted_phone_number: '(941) 366-7676',
        website: 'https://www.cooltoday.com/',
        rating: 4.8,
        user_ratings_total: 3840
      },
      {
        place_id: 'real_fl_2',
        name: 'ARS/Rescue Rooter Miami',
        formatted_address: '1750 W 39th Pl #101, Hialeah, FL 33012',
        formatted_phone_number: '(305) 825-2005',
        website: 'https://www.ars.com/miami',
        rating: 4.3,
        user_ratings_total: 1420
      },
      {
        place_id: 'real_tn_1',
        name: 'Hiller Plumbing, Heating, Cooling & Electrical',
        formatted_address: '1004 9th Ave S, Nashville, TN 37203',
        formatted_phone_number: '(615) 333-5555',
        website: 'https://happyhiller.com/',
        rating: 4.8,
        user_ratings_total: 7890
      }
    ];

    return res.json({ 
      mockData: true, 
      message: 'Using mock data because YELP_API_KEY is not set in environment.',
      results: mockResults 
    });
  }

  // Real Yelp Fusion API integration
  try {
    const searchUrl = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(industry)}&location=${encodeURIComponent(location)}&limit=15`;
    
    const searchRes = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept': 'application/json'
      }
    });
    
    const searchData = await searchRes.json();

    if (!searchRes.ok) {
      return res.status(400).json({ error: `Yelp API Error: ${searchData.error?.description || searchData.error?.code || 'Unknown Error'}` });
    }

    // Map Yelp data to our expected format
    const mappedResults = (searchData.businesses || []).map(business => ({
      place_id: business.id,
      name: business.name,
      formatted_address: business.location?.display_address?.join(', ') || 'No address provided',
      formatted_phone_number: business.display_phone || '',
      website: business.url || '', // Yelp search API only returns the Yelp page URL
      rating: business.rating || null,
      user_ratings_total: business.review_count || 0
    }));

    res.json({ results: mappedResults, mockData: false });

  } catch (error) {
    console.error('Prospector API Error:', error);
    res.status(500).json({ error: 'Failed to fetch prospects from Yelp API.' });
  }
});

export default router;
