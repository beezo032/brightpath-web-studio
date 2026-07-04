const sharedMetrics = {
  performance: '95+', accessibility: '100', seo: '100', bestPractices: '100', responsive: '100%', coreWebVitals: 'Optimized',
};

export const portfolioProjects = [
  {
    id: 1, slug: 'aster-house-dental', title: 'Aster House Dental', industry: 'Dental', location: 'Charleston, South Carolina',
    heroImage: '/aster_house_dental.webp', mobileImage: '/aster_house_dental.webp', gallery: ['/aster_house_dental.webp', '/aster_house_dental.webp', '/aster_house_dental.webp'],
    overview: 'A serene, relationship-first digital experience for a boutique dental practice redefining what a visit to the dentist can feel like.',
    challenge: 'Dental websites often amplify anxiety with clinical language and cluttered interfaces. Aster House needed to communicate expertise while feeling calm, human, and distinctly premium.',
    solution: 'We created a hospitality-inspired experience with generous space, reassuring content, elegant typography, and clear pathways to care.',
    goals: ['Reduce patient uncertainty', 'Build trust before the first visit', 'Make scheduling effortless'],
    features: ['Online scheduling', 'Smile gallery', 'Service education', 'Patient-first navigation'],
    services: ['Strategy', 'UX/UI Design', 'Web Development', 'Conversion Design'], technologies: ['React', 'Vite', 'Responsive CSS', 'Semantic HTML'],
    performanceMetrics: sharedMetrics, seoFeatures: ['Local service architecture', 'Structured metadata', 'Semantic content hierarchy', 'Optimized social sharing'],
    businessImpact: ['Increase Trust', 'Increase Appointment Requests', 'Improve Local SEO', 'Premium Brand Positioning'],
    colorPalette: ['#173833', '#F1EAE0', '#D4A67B', '#FFFFFF'], testimonial: null,
    liveDemo: 'https://aster-house-dental.vercel.app/', github: 'https://github.com/beezo032/Aster-House-Dental', previousProject: 'vesper-tattoo', nextProject: 'northstar-heating-air',
    metaDescription: 'Explore the Aster House Dental website case study by SignalLight Studio—a calm, conversion-focused digital experience for a boutique dental practice.',
  },
  {
    id: 2, slug: 'northstar-heating-air', title: 'Northstar Heating & Air', industry: 'HVAC', location: 'Charlotte, North Carolina',
    heroImage: '/northstar_heating.webp', mobileImage: '/northstar_heating.webp', gallery: ['/northstar_heating.webp', '/northstar_heating.webp', '/northstar_heating.webp'],
    overview: 'A fast, dependable service website that turns urgent heating and cooling needs into confident calls and bookings.',
    challenge: 'In a crowded local market, Northstar needed to establish trust in seconds, surface emergency help immediately, and make complex services easy to understand.',
    solution: 'We built a conversion-led experience around speed, proof, transparent service information, and strong local relevance.',
    goals: ['Capture emergency demand', 'Clarify services and pricing', 'Strengthen local credibility'],
    features: ['24/7 emergency pathways', 'Pricing guides', 'Service-area content', 'Mobile-first contact'],
    services: ['Research', 'UX/UI Design', 'Development', 'Local SEO'], technologies: ['React', 'Vite', 'Responsive CSS', 'Schema.org'],
    performanceMetrics: sharedMetrics, seoFeatures: ['Service-area landing structure', 'Local intent signals', 'Technical metadata', 'Fast crawlable pages'],
    businessImpact: ['Increase Service Calls', 'Improve Local SEO', 'Higher Conversion Rate', 'Faster Load Times'],
    colorPalette: ['#10263C', '#F4B43C', '#F4F7FA', '#FFFFFF'], testimonial: null,
    liveDemo: 'https://northstar-heating.vercel.app/', github: 'https://github.com/beezo032/Northstar--Heating', previousProject: 'aster-house-dental', nextProject: 'vesper-tattoo',
    metaDescription: 'See how SignalLight Studio designed a fast, conversion-focused HVAC website for Northstar Heating & Air in Charlotte, North Carolina.',
  },
  {
    id: 3, slug: 'vesper-tattoo', title: 'Vesper Tattoo Co.', industry: 'Tattoo Studio', location: 'Richmond, Virginia',
    heroImage: '/vesper_tattoo.webp', mobileImage: '/vesper_tattoo.webp', gallery: ['/vesper_tattoo.webp', '/vesper_tattoo.webp', '/vesper_tattoo.webp'],
    overview: 'A cinematic digital home for a private tattoo studio—designed to make exceptional work unforgettable and the next step effortless.',
    challenge: 'Vesper had a distinct point of view, meticulous craft, and hundreds of five-star reviews. Its digital presence needed to translate that trust before a visitor stepped inside.',
    solution: 'We built an editorial, image-led experience around restraint, artistic confidence, and focused consultation pathways.',
    goals: ['Let the artwork lead', 'Attract aligned clients', 'Simplify consultation requests'],
    features: ['Immersive work gallery', 'Artist-led storytelling', 'Consultation pathways', 'Responsive editorial layouts'],
    services: ['Strategy', 'UX/UI Design', 'Web Development', 'Art Direction'], technologies: ['React', 'Vite', 'Responsive CSS', 'Semantic HTML'],
    performanceMetrics: sharedMetrics, seoFeatures: ['Richmond local relevance', 'Structured creative-work data', 'Descriptive image content', 'Social preview metadata'],
    businessImpact: ['Increase Trust', 'Increase Booking Requests', 'Improve Local SEO', 'Premium Brand Positioning'],
    colorPalette: ['#0B0B0B', '#E9E1D4', '#A4472C', '#071426'], testimonial: null,
    liveDemo: 'https://vesper-tattoo.vercel.app/', github: 'https://github.com/beezo032/Vesper-Tattoo', previousProject: 'northstar-heating-air', nextProject: 'aster-house-dental',
    metaDescription: 'Discover the Vesper Tattoo Co. case study—a cinematic, conversion-focused website created by SignalLight Studio for a private Richmond tattoo studio.',
  },
];

export const getProjectBySlug = (slug) => portfolioProjects.find((project) => project.slug === slug);
