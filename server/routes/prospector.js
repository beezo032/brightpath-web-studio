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
        place_id: 'mock_1',
        name: `Elite ${industry} of ${location}`,
        formatted_address: `123 Main St, ${location}`,
        formatted_phone_number: '(555) 123-4567',
        website: `https://www.elite${industry.toLowerCase().replace(/[^a-z]/g, '')}${location.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        rating: 4.8,
        user_ratings_total: 124
      },
      {
        place_id: 'mock_2',
        name: `${location} Premier ${industry}`,
        formatted_address: `456 Oak Ave, ${location}`,
        formatted_phone_number: '(555) 987-6543',
        website: '', // Intentionally blank to show missing data handling
        rating: 4.2,
        user_ratings_total: 56
      },
      {
        place_id: 'mock_3',
        name: `A1 Reliable ${industry}`,
        formatted_address: `789 Pine Ln, ${location}`,
        formatted_phone_number: '(555) 555-0199',
        website: `https://www.a1reliable.com`,
        rating: 3.9,
        user_ratings_total: 12
      },
      {
        place_id: 'mock_4',
        name: `Family Owned ${industry} Pros`,
        formatted_address: `321 Elm St, ${location}`,
        formatted_phone_number: '(555) 222-3333',
        website: `https://www.familypros${location.toLowerCase().replace(/[^a-z]/g, '')}.com`,
        rating: 4.9,
        user_ratings_total: 310
      },
      {
        place_id: 'mock_5',
        name: `Budget ${industry} Services`,
        formatted_address: `999 Industrial Blvd, ${location}`,
        formatted_phone_number: '(555) 444-5555',
        website: `http://www.budgetservices.net`,
        rating: 3.5,
        user_ratings_total: 89
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
