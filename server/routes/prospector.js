import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/search', async (req, res) => {
  const { industry, location } = req.body;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!industry || !location) {
    return res.status(400).json({ error: 'Industry and Location are required' });
  }

  // If no API key is provided, return rich mock data so the user can test the UI
  if (!apiKey) {
    console.log('No GOOGLE_PLACES_API_KEY found. Returning mock data.');
    
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
      message: 'Using mock data because GOOGLE_PLACES_API_KEY is not set in environment.',
      results: mockResults 
    });
  }

  // Real Google Places API integration (Text Search)
  try {
    const query = `${industry} in ${location}`;
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
    
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    if (searchData.status !== 'OK') {
      return res.status(400).json({ error: `Google API Error: ${searchData.status}` });
    }

    // Google Text Search doesn't always return website/phone. We need to do a Place Details call for each.
    // To save time/cost, we will only fetch details for the top 10 results.
    const topResults = searchData.results.slice(0, 10);
    
    const detailedResults = await Promise.all(topResults.map(async (place) => {
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total&key=${apiKey}`;
      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();
      
      if (detailsData.status === 'OK') {
        return {
          place_id: place.place_id,
          ...detailsData.result
        };
      }
      return place; // Fallback to basic info if details fail
    }));

    res.json({ results: detailedResults });
  } catch (error) {
    console.error('Prospector API Error:', error);
    res.status(500).json({ error: 'Failed to fetch prospects from Google API.' });
  }
});

export default router;
