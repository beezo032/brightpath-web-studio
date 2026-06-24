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
    // Construct the Nominatim query: e.g. "Plumber in Austin, TX"
    const query = `${industry} in ${location}`;
    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&extratags=1&limit=20`;
    
    // Nominatim requires a User-Agent header
    const searchRes = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'BrightpathCRM/1.0 (Contact: admin@brightpath.local)',
        'Accept': 'application/json'
      }
    });
    
    if (!searchRes.ok) {
      throw new Error(`OSM API Error: ${searchRes.status}`);
    }

    const searchData = await searchRes.json();

    // Map OpenStreetMap data to our expected format
    const mappedResults = searchData.map(place => {
      // Name usually comes from place.name or extratags
      const businessName = place.name || (place.address && place.address.amenity) || place.display_name.split(',')[0];
      
      // Try to extract phone and website from extratags
      let phone = '';
      let websiteUrl = '';
      if (place.extratags) {
        phone = place.extratags.phone || place.extratags['contact:phone'] || '';
        websiteUrl = place.extratags.website || place.extratags['contact:website'] || '';
      }

      return {
        place_id: place.place_id.toString(),
        name: businessName,
        formatted_address: place.display_name,
        formatted_phone_number: phone,
        website: websiteUrl,
        rating: null, // OSM does not have a 5-star rating system
        user_ratings_total: 0
      };
    });

    // Remove duplicates based on place_id and filter out entries that don't look like businesses
    const uniqueResults = mappedResults.filter((v, i, a) => a.findIndex(t => (t.place_id === v.place_id)) === i);

    res.json({ results: uniqueResults, mockData: false });

  } catch (error) {
    console.error('Prospector OSM API Error:', error);
    res.status(500).json({ error: 'Failed to fetch prospects from OpenStreetMap.' });
  }
});

export default router;
