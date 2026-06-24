import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/search', async (req, res) => {
  const { industry, location } = req.body;

  if (!industry || !location) {
    return res.status(400).json({ error: 'Industry and Location are required' });
  }

  try {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ 
        error: 'GEOAPIFY_API_KEY is not set. Please create a free account at myprojects.geoapify.com and add your key to Vercel.' 
      });
    }

    const query = `${industry} in ${location}`;
    const searchUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&limit=20&apiKey=${apiKey}`;
    
    const searchRes = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!searchRes.ok) {
      throw new Error(`Geoapify API Error: ${searchRes.status}`);
    }

    const searchData = await searchRes.json();

    if (!searchData.features) {
      return res.json({ results: [], mockData: false });
    }

    // Map Geoapify data to our expected format
    const mappedResults = searchData.features.map(feature => {
      const place = feature.properties;
      
      const businessName = place.name || (place.address_line1 ? place.address_line1.split(',')[0] : 'Unknown Business');
      
      let phone = '';
      let websiteUrl = '';
      if (place.contact) {
        phone = place.contact.phone || '';
        websiteUrl = place.contact.website || '';
      }

      return {
        place_id: place.place_id || Math.random().toString(36),
        name: businessName,
        formatted_address: place.formatted || place.address_line2 || '',
        formatted_phone_number: phone,
        website: websiteUrl,
        rating: null,
        user_ratings_total: 0
      };
    });

    // Remove duplicates and entries that are probably just cities
    const uniqueResults = mappedResults.filter((v, i, a) => 
      a.findIndex(t => (t.place_id === v.place_id)) === i && v.name.toLowerCase() !== location.toLowerCase()
    );

    res.json({ results: uniqueResults, mockData: false });

  } catch (error) {
    console.error('Prospector Geoapify API Error:', error);
    res.status(500).json({ error: 'Failed to fetch prospects from Geoapify.' });
  }
});

export default router;
