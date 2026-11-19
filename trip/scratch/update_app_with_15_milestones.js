const fs = require('fs');
const path = require('path');

const jaipurMilestones = [
    {
        id: 1,
        name: "Hawa Mahal (Palace of Winds)",
        category: "Heritage Architecture",
        coords: [26.9239, 75.8267],
        timings: "09:00 AM - 05:00 PM (Daily)",
        entryFee: { budget: 50, standard: 200, foreign: 500 },
        travelTimeFromPrev: "Start Point / 15 mins from City Center",
        transitMode: "Public Bus 9A / E-Rickshaw (₹20)",
        googleRating: 4.6,
        reviewsCount: "94,000+",
        proTip: "Visit before 10:00 AM to capture morning sunlight reflecting on the pink honeycomb windows.",
        busAvailability: "High - Direct Stop: Badi Chaupar Bus Stand",
        description: "Iconic five-story palace built in 1799 with 953 windows (jharokhas) designed for royal women to observe street festivals secretly."
    },
    {
        id: 2,
        name: "City Palace of Jaipur",
        category: "Royal Residence & Courtyards",
        coords: [26.9258, 75.8237],
        timings: "09:30 AM - 05:00 PM & 07:00 PM - 10:00 PM (Night Tour)",
        entryFee: { budget: 150, standard: 300, foreign: 700 },
        travelTimeFromPrev: "8 mins walk (600m) from Hawa Mahal",
        transitMode: "Walking / Heritage Walkway",
        googleRating: 4.7,
        reviewsCount: "82,500+",
        proTip: "Get the composite ticket at entry to skip secondary lines at Jantar Mantar and Albert Hall.",
        busAvailability: "City Bus Route 1, 2, 9 stop right outside Sireh Deori Gate",
        description: "Sprawling royal complex of courtyards, Chandra Mahal, Mubarak Mahal, and museum galleries preserving Maharaja regalia."
    },
    {
        id: 3,
        name: "Jantar Mantar Astronomical Observatory",
        category: "UNESCO World Heritage Site",
        coords: [26.9248, 75.8246],
        timings: "09:00 AM - 05:00 PM (Daily)",
        entryFee: { budget: 50, standard: 100, foreign: 200 },
        travelTimeFromPrev: "4 mins walk (300m) from City Palace Gate",
        transitMode: "Walking",
        googleRating: 4.7,
        reviewsCount: "62,000+",
        proTip: "Hire an audio guide or certified astronomy guide to understand how the giant stone sundial measures time to 2-second accuracy.",
        busAvailability: "Badi Chaupar Bus Stop (400m walk)",
        description: "Historic 18th-century observatory built by Maharaja Sawai Jai Singh II featuring the world's largest stone sundial."
    },
    {
        id: 4,
        name: "Albert Hall Museum (Central Museum)",
        category: "Indo-Saracenic Art & History",
        coords: [26.9116, 75.8195],
        timings: "09:00 AM - 05:00 PM & 07:00 PM - 10:00 PM (Night Illumination)",
        entryFee: { budget: 40, standard: 150, foreign: 300 },
        travelTimeFromPrev: "10 mins transit (2.2 km) via Sanganeri Gate",
        transitMode: "E-Rickshaw / Bus Route 2 (₹15)",
        googleRating: 4.6,
        reviewsCount: "58,000+",
        proTip: "View the museum at night when exterior facade is bathed in colorful changing LED lights with hundreds of pigeons.",
        busAvailability: "Bus Route 2 & Ajmeri Gate feeder buses stop directly at Ram Niwas Garden",
        description: "Rajasthan's oldest museum housed in magnificent Indo-Saracenic architecture showcasing rare carpets, Egyptian mummy, and metal crafts."
    },
    {
        id: 5,
        name: "Amer Fort & Maota Lake",
        category: "UNESCO Hilltop Fortress & Palaces",
        coords: [26.9855, 75.8513],
        timings: "08:00 AM - 05:30 PM & 06:30 PM - 09:15 PM (Light & Sound)",
        entryFee: { budget: 100, standard: 250, foreign: 550 },
        travelTimeFromPrev: "25 mins drive (11 km) via Amer Road",
        transitMode: "AC Bus Route AC-5 or Uber/Auto (₹150)",
        googleRating: 4.8,
        reviewsCount: "135,000+",
        proTip: "Book the 7:00 PM English/Hindi light and sound show for a spectacular historic narration over Maota Lake.",
        busAvailability: "AC Low-Floor Bus AC-5 runs every 10 mins from Ajmeri Gate to Amer Fort",
        description: "UNESCO World Heritage fortress perched high on a hill, renowned for Sheesh Mahal (Mirror Palace) and Rajput architecture."
    },
    {
        id: 6,
        name: "Jaigarh Fort & Jaivana Cannon",
        category: "Hilltop Military Fortress",
        coords: [26.9850, 75.8456],
        timings: "09:00 AM - 05:00 PM (Daily)",
        entryFee: { budget: 70, standard: 150, foreign: 300 },
        travelTimeFromPrev: "12 mins uphill drive / connected tunnel from Amer Fort",
        transitMode: "Fort Shuttle / Auto / Taxi",
        googleRating: 4.6,
        reviewsCount: "44,000+",
        proTip: "Stand on the fort ramparts overlooking Amer Fort and Maota Lake for unmatched aerial photo panoramas.",
        busAvailability: "Shuttle cabs connect from Amer Fort base parking",
        description: "Imposing military fortress housing Jaivana, once the world's largest cannon on wheels, and ancient armory storage vaults."
    },
    {
        id: 7,
        name: "Nahargarh Fort & Sunset Point",
        category: "Panoramic Sunset & Hilltop Overlook",
        coords: [26.9378, 75.8156],
        timings: "10:00 AM - 10:00 PM (Best at 05:30 PM)",
        entryFee: { budget: 50, standard: 150, foreign: 300 },
        travelTimeFromPrev: "20 mins scenic ghat road drive (8 km)",
        transitMode: "Private Taxi / Self-drive Scooter / Cab",
        googleRating: 4.7,
        reviewsCount: "68,000+",
        proTip: "Arrive 45 minutes before sunset for the golden hour over the entire Pink City skyline from Padao rooftop cafe.",
        busAvailability: "Private shuttle cabs available from foot of hill; city bus stops at Ghat gate",
        description: "A fortress standing on the edge of the Aravalli Hills overlooking the entire city with rooftop cafes and wax museum."
    },
    {
        id: 8,
        name: "Jal Mahal (Water Palace)",
        category: "Scenic Lake Palace Viewpoint",
        coords: [26.9535, 75.8462],
        timings: "Open 24/7 (Exterior Lakefront Promenade)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins drive downhill along Amer Road (6 km)",
        transitMode: "Bus AC-5 / Auto / Taxi",
        googleRating: 4.6,
        reviewsCount: "76,000+",
        proTip: "Enjoy camel rides, traditional street kulfi, and handicraft stalls along the lakeside paved promenade.",
        busAvailability: "Direct stop: Jal Mahal Bus Stand on AC-5 route",
        description: "A gorgeous 18th-century Rajput style palace situated in the middle of Man Sagar Lake, appearing to float on water."
    },
    {
        id: 9,
        name: "Galta Ji (Monkey Temple & Natural Springs)",
        category: "Ancient Temple Complex & Sacred Kunds",
        coords: [26.9163, 75.8596],
        timings: "05:00 AM - 09:00 PM (Daily)",
        entryFee: { budget: 0, standard: 50, foreign: 100 },
        travelTimeFromPrev: "20 mins drive (7.5 km) eastward into the Aravalli gorge",
        transitMode: "Auto Rickshaw / Taxi",
        googleRating: 4.5,
        reviewsCount: "38,000+",
        proTip: "Keep food and shiny items secured in backpacks as the resident Rhesus macaques are curious and agile.",
        busAvailability: "Buses stop at Galta Gate; 1.5 km scenic uphill walk/rickshaw to kunds",
        description: "Historic Hindu pilgrimage retreat set within a mountain pass, featuring 7 natural freshwater spring pools (kunds) and carved pavilions."
    },
    {
        id: 10,
        name: "Birla Mandir (Laxmi Narayan Temple)",
        category: "Modern White Marble Architecture",
        coords: [26.8925, 75.8155],
        timings: "06:00 AM - 12:00 PM & 03:00 PM - 09:00 PM",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins drive (5.5 km) via JLN Marg",
        transitMode: "Bus Route 2 / Auto (₹60)",
        googleRating: 4.7,
        reviewsCount: "54,000+",
        proTip: "Visit around 7:00 PM during evening aarti when the white marble temple shines under glowing floodlights below Moti Dungri fort.",
        busAvailability: "Direct stop at Birla Mandir on JLN Marg",
        description: "Pure white Makrana marble temple with intricate mythological carvings, stained glass panels, and manicured green gardens."
    },
    {
        id: 11,
        name: "Patrika Gate & Jawahar Circle",
        category: "Artistic Architecture & Musical Fountain",
        coords: [26.8172, 75.8037],
        timings: "Open 24/7 (Musical Fountain: 07:00 PM daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "18 mins south on JLN Marg (8 km)",
        transitMode: "Low-Floor Bus AC-1 / Metro to Durgapura",
        googleRating: 4.8,
        reviewsCount: "71,000+",
        proTip: "Walk through each vibrant pastel archway inside the gate to photograph hand-painted Rajasthani art murals.",
        busAvailability: "Direct bus connectivity from airport and city center on JLN Marg",
        description: "Ultra-photogenic monument serving as entrance to Jawahar Circle, featuring 9 grand painted arches depicting Rajasthan history."
    },
    {
        id: 12,
        name: "Bapu Bazaar & Johari Bazaar",
        category: "Traditional Heritage Shopping & Street Food",
        coords: [26.9197, 75.8258],
        timings: "11:00 AM - 10:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "20 mins return drive to Walled Pink City core",
        transitMode: "E-Rickshaw / Walking / Bus 9A",
        googleRating: 4.6,
        reviewsCount: "89,000+",
        proTip: "Try signature pyaaz kachori at Rawat Mishtan Bhandar and bargain for Jaipuri quilts (razai) and camel-leather juttis.",
        busAvailability: "Badi Chaupar and Sanganeri Gate bus terminals",
        description: "Vibrant pink-walled market streets famous for authentic Mojari leather footwear, Bandhani textiles, gemstones, and block-print handicrafts."
    },
    {
        id: 13,
        name: "Sisodia Rani Ka Bagh & Palace",
        category: "Royal Terraced Garden & Water Fountains",
        coords: [26.8931, 75.8690],
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 50, standard: 100, foreign: 200 },
        travelTimeFromPrev: "15 mins drive (6 km) on Jaipur-Agra Highway",
        transitMode: "Auto Rickshaw / Taxi / Bus",
        googleRating: 4.5,
        reviewsCount: "22,000+",
        proTip: "A serene getaway with minimal crowds compared to Amer; perfect for relaxing amidst painted wall frescoes.",
        busAvailability: "Agra Road buses stop right outside garden gates",
        description: "Multi-tiered landscaped royal garden built in 1728 for the Sisodia Queen, adorned with water channels, fountains, and Radha-Krishna murals."
    },
    {
        id: 14,
        name: "Panna Meena Ka Kund (Stepwell)",
        category: "Historic 16th-Century Stepwell",
        coords: [26.9912, 75.8576],
        timings: "07:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins drive from Amer Fort base (1.5 km)",
        transitMode: "Walking / Auto Rickshaw",
        googleRating: 4.6,
        reviewsCount: "18,500+",
        proTip: "Photograph the hypnotic symmetrical criss-cross staircases in the morning light when shadows create dramatic geometric patterns.",
        busAvailability: "Amer Fort bus drop point + 10 min walk",
        description: "Striking 16th-century square stepwell with interlocking zigzag steps, historic community gathering alcoves, and ancient water engineering."
    },
    {
        id: 15,
        name: "Chokhi Dhani Ethnic Village Resort",
        category: "Rajasthani Cultural Village & Royal Thali Feast",
        coords: [26.7663, 75.8362],
        timings: "05:00 PM - 11:00 PM (Evening Experience)",
        entryFee: { budget: 900, standard: 1200, foreign: 1500 },
        travelTimeFromPrev: "35 mins drive (18 km) south on Tonk Road",
        transitMode: "Pre-booked Cab / Uber / Shuttle",
        googleRating: 4.6,
        reviewsCount: "65,000+",
        proTip: "Arrive by 6:00 PM to enjoy camel rides, puppet shows, fire acrobatics, and Ghoomar dances before the grand traditional dining.",
        busAvailability: "Tonk Road express buses run to Vatika Mod",
        description: "Immersive 5-star ethnic cultural village celebrating Rajasthan's folk dances, magic shows, pottery making, and authentic royal dining."
    }
];

const parisMilestones = [
    {
        id: 1,
        name: "Eiffel Tower & Champ de Mars",
        category: "World Landmark & Panoramic Summit",
        coords: [48.8584, 2.2945],
        timings: "09:00 AM - 11:45 PM (Daily)",
        entryFee: { budget: 1100, standard: 2800, foreign: 2800 },
        travelTimeFromPrev: "Start Point / Metro Line 6 Bir-Hakeim",
        transitMode: "Metro Line 6 / RER C / Bus 42, 87",
        googleRating: 4.7,
        reviewsCount: "320,000+",
        proTip: "Book summit lift tickets 60 days online or take stairs to Level 2 to skip the main queue.",
        busAvailability: "RATP Bus 42, 69, 82, 87 stop right at Tour Eiffel",
        description: "Gustave Eiffel's 330-meter iron lattice masterpiece offering panoramic 360-degree vistas of Paris."
    },
    {
        id: 2,
        name: "Louvre Museum & Glass Pyramid",
        category: "World's Largest Art Museum",
        coords: [48.8606, 2.3376],
        timings: "09:00 AM - 06:00 PM (Closed Tuesdays; Open till 9:45 PM Wed/Fri)",
        entryFee: { budget: 1600, standard: 2200, foreign: 2200 },
        travelTimeFromPrev: "15 mins via Bus 72 along the Seine River",
        transitMode: "Bus 72 / Metro Line 1 Palais Royal",
        googleRating: 4.8,
        reviewsCount: "290,000+",
        proTip: "Enter through the Carrousel du Louvre underground mall entrance for shorter security lines.",
        busAvailability: "Bus lines 21, 27, 39, 68, 69, 72, 95",
        description: "Home to the Mona Lisa, Venus de Milo, and over 35,000 historic works of art spanning 9,000 years."
    },
    {
        id: 3,
        name: "Musée d'Orsay (Impressionist Art)",
        category: "Fine Arts in Beaux-Arts Railway Station",
        coords: [48.8600, 2.3266],
        timings: "09:30 AM - 06:00 PM (Closed Mondays, Open till 9:45 PM Thursdays)",
        entryFee: { budget: 1400, standard: 1800, foreign: 1800 },
        travelTimeFromPrev: "10 mins walk across Passerelle Léopold-Sédar-Senghor",
        transitMode: "Walking / RER C Musée d'Orsay",
        googleRating: 4.8,
        reviewsCount: "115,000+",
        proTip: "Head straight up to the 5th floor for Van Gogh, Monet, and the iconic giant clock face overlooking Montmartre.",
        busAvailability: "Bus 68, 69, 73, 84 stop directly outside",
        description: "World's premier collection of Impressionist and Post-Impressionist masterpieces housed in a grand 1900 railway station."
    },
    {
        id: 4,
        name: "Cathédrale Notre-Dame & Île de la Cité",
        category: "Gothic Masterpiece & Historic Island",
        coords: [48.8530, 2.3499],
        timings: "08:00 AM - 06:45 PM (Open Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins pleasant riverside walk (1.2 km)",
        transitMode: "Walking / Metro Line 4 Cité",
        googleRating: 4.8,
        reviewsCount: "140,000+",
        proTip: "Stroll across Pont de l'Archevêché for stunning views of the restored spire and flying buttresses.",
        busAvailability: "Bus 21, 38, 47, 85, 96 at Cité - Palais de Justice",
        description: "Historic Catholic cathedral on Île de la Cité, one of the finest examples of French Gothic architecture."
    },
    {
        id: 5,
        name: "Sainte-Chapelle & Conciergerie",
        category: "13th-Century Rayonnant Gothic Chapel",
        coords: [48.8554, 2.3450],
        timings: "09:00 AM - 07:00 PM (Daily)",
        entryFee: { budget: 1100, standard: 1400, foreign: 1400 },
        travelTimeFromPrev: "4 mins walk (350m) across Île de la Cité",
        transitMode: "Walking",
        googleRating: 4.8,
        reviewsCount: "68,000+",
        proTip: "Visit on a bright sunny afternoon to experience sunlight pouring through 1,113 dazzling stained glass panels.",
        busAvailability: "Metro Line 4 Cité / Bus 21, 27",
        description: "Royal medieval chapel built by King Louis IX with extraordinary soaring stained-glass windows depicting biblical history."
    },
    {
        id: 6,
        name: "Arc de Triomphe & Avenue des Champs-Élysées",
        category: "Triumphal Arch & Luxury Boulevard",
        coords: [48.8738, 2.2950],
        timings: "10:00 AM - 10:30 PM (Daily)",
        entryFee: { budget: 0, standard: 1300, foreign: 1300 },
        travelTimeFromPrev: "15 mins via Metro Line 1 from Châtelet to Charles de Gaulle-Étoile",
        transitMode: "Metro Line 1 / RER A",
        googleRating: 4.7,
        reviewsCount: "175,000+",
        proTip: "Use the pedestrian underground subway under Place de l'Étoile; never attempt to cross the traffic roundabout on foot.",
        busAvailability: "Bus 22, 30, 31, 52, 73, 92 at Étoile",
        description: "Majestic triumphal monument honoring French soldiers, offering panoramic rooftop vistas along 12 radiating avenues."
    },
    {
        id: 7,
        name: "Montmartre & Sacré-Cœur Basilica",
        category: "Bohemian Hilltop Village & City Panorama",
        coords: [48.8867, 2.3431],
        timings: "06:30 AM - 10:30 PM (Dome: 10:00 AM - 05:30 PM)",
        entryFee: { budget: 0, standard: 600, foreign: 600 },
        travelTimeFromPrev: "20 mins via Metro Line 2 to Anvers",
        transitMode: "Metro 2 + Montmartre Funicular",
        googleRating: 4.8,
        reviewsCount: "115,000+",
        proTip: "Catch street musicians on the basilica steps at dusk, then dine in Place du Tertre amidst portrait artists.",
        busAvailability: "Montmartrobus / Bus 40 loops directly through the hill",
        description: "Picturesque bohemian hilltop district with cobblestone streets, artist squares, and sweeping city vistas."
    },
    {
        id: 8,
        name: "Panthéon & Quartier Latin (Latin Quarter)",
        category: "Neoclassical Monument & Historic University Quarter",
        coords: [48.8462, 2.3464],
        timings: "10:00 AM - 06:30 PM (Daily)",
        entryFee: { budget: 900, standard: 1200, foreign: 1200 },
        travelTimeFromPrev: "20 mins via Metro Line 4 to Saint-Michel / Cluny",
        transitMode: "Metro Line 10 (Cardinal Lemoine) / RER B (Luxembourg)",
        googleRating: 4.7,
        reviewsCount: "52,000+",
        proTip: "Inspect Foucault's Pendulum demonstrating earth's rotation and pay homage in the crypt of Voltaire and Marie Curie.",
        busAvailability: "Bus 21, 27, 38, 84, 89 stop nearby",
        description: "Imposing neoclassical temple containing the monumental crypts of France's greatest thinkers, writers, and scientists."
    },
    {
        id: 9,
        name: "Jardin du Luxembourg & Palais du Luxembourg",
        category: "Royal Formal Gardens & Fountains",
        coords: [48.8462, 2.3372],
        timings: "07:30 AM - 08:30 PM (Varies by season)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "6 mins walk (500m) from Panthéon",
        transitMode: "Walking",
        googleRating: 4.8,
        reviewsCount: "94,000+",
        proTip: "Rent wooden vintage toy sailboats for children at the Grand Bassin and sit beside the shaded Medici Fountain.",
        busAvailability: "RER B Luxembourg Station at garden entrance",
        description: "Stunning 25-hectare garden created in 1612 by Marie de' Medici featuring tree-lined promenades, fountains, and classic green chairs."
    },
    {
        id: 10,
        name: "Centre Pompidou & Le Marais District",
        category: "Modern Art Museum & Trendy Historic Quarter",
        coords: [48.8606, 2.3522],
        timings: "11:00 AM - 09:00 PM (Closed Tuesdays; Open till 11 PM Thursdays)",
        entryFee: { budget: 1200, standard: 1500, foreign: 1500 },
        travelTimeFromPrev: "15 mins via Metro Line 4 to Châtelet / Rambuteau",
        transitMode: "Metro Line 11 (Rambuteau) / Metro Line 1 (Hôtel de Ville)",
        googleRating: 4.6,
        reviewsCount: "74,000+",
        proTip: "Take the exterior glass escalator tube to the 6th floor for sweeping views of Paris and explore Jewish bakeries on Rue des Rosiers.",
        busAvailability: "Bus 29, 38, 47, 75 at Centre Georges Pompidou",
        description: "Revolutionary high-tech architecture housing Europe's largest modern art collection in the heart of the historic Marais district."
    },
    {
        id: 11,
        name: "Palais Garnier (Opéra National de Paris)",
        category: "Opulent 19th-Century Beaux-Arts Opera House",
        coords: [48.8720, 2.3316],
        timings: "10:00 AM - 05:00 PM (Daily)",
        entryFee: { budget: 1100, standard: 1400, foreign: 1400 },
        travelTimeFromPrev: "12 mins via Metro Line 11 to 3 (Opéra)",
        transitMode: "Metro Lines 3, 7, 8 (Opéra Station)",
        googleRating: 4.8,
        reviewsCount: "66,000+",
        proTip: "Look up in the grand auditorium to admire Marc Chagall's vibrant 1964 painted ceiling surrounding the 7-ton bronze chandelier.",
        busAvailability: "RoissyBus to CDG Airport and buses 20, 21, 27, 29 stop at Opéra",
        description: "The lavish opera house that inspired 'The Phantom of the Opera', renowned for its grand marble staircase and gilded Grand Foyer."
    },
    {
        id: 12,
        name: "Place de la Concorde & Jardin des Tuileries",
        category: "Historic Royal Square & Luxor Obelisk",
        coords: [48.8656, 2.3211],
        timings: "Open 24/7 (Tuileries Garden: 07:00 AM - 09:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins walk (800m) down Rue Tronchet",
        transitMode: "Walking / Metro Concorde",
        googleRating: 4.7,
        reviewsCount: "86,000+",
        proTip: "Walk the central axis between the Louvre and Place de la Concorde for unbroken views of the Champs-Élysées.",
        busAvailability: "Metro Lines 1, 8, 12 at Concorde Station",
        description: "Paris's largest public square where French history unfolded, crowned by the 3,300-year-old Egyptian Luxor Obelisk and fountains."
    },
    {
        id: 13,
        name: "Pont Alexandre III & Grand Palais",
        category: "Belle Époque Bridge & Art Exhibition Palace",
        coords: [48.8639, 2.3136],
        timings: "Open 24/7 (Bridge Promenade)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "8 mins pleasant walk along the Seine riverbank",
        transitMode: "Walking / Metro Invalides",
        googleRating: 4.8,
        reviewsCount: "58,000+",
        proTip: "Sunset at Pont Alexandre III provides the ultimate romantic photo with the Eiffel Tower in the background and glowing golden pegasus statues.",
        busAvailability: "Bus 63, 72, 83, 93 at Invalides",
        description: "The most ornate, extravagant bridge in Paris with gilded statues of Fames, Cherubs, and Art Nouveau lampposts connecting to Grand Palais."
    },
    {
        id: 14,
        name: "Les Catacombes de Paris (Underground Ossuary)",
        category: "Subterranean Labyrinth & Historic Ossuary",
        coords: [48.8338, 2.3324],
        timings: "09:45 AM - 08:30 PM (Closed Mondays)",
        entryFee: { budget: 1500, standard: 2400, foreign: 2400 },
        travelTimeFromPrev: "18 mins via Metro Line 13/4 to Denfert-Rochereau",
        transitMode: "Metro Lines 4, 6 / RER B (Denfert-Rochereau)",
        googleRating: 4.5,
        reviewsCount: "49,000+",
        proTip: "Pre-booking online with audio guide is mandatory; wear sturdy flat shoes for the 131-step spiral descent and cool 14°C temperature.",
        busAvailability: "Bus 38, 68 direct to Place Denfert-Rochereau",
        description: "Fascinating underground labyrinth 20 meters beneath Paris streets containing the skeletal remains of over 6 million Parisians."
    },
    {
        id: 15,
        name: "Seine River Evening Cruise at Pont Neuf",
        category: "Illuminated Night Sightseeing Cruise",
        coords: [48.8570, 2.3410],
        timings: "10:00 AM - 10:30 PM (Hourly Departures)",
        entryFee: { budget: 1300, standard: 1600, foreign: 1600 },
        travelTimeFromPrev: "15 mins via Metro Line 4 to Pont Neuf",
        transitMode: "Vedettes du Pont Neuf / Bateaux Parisiens",
        googleRating: 4.8,
        reviewsCount: "92,000+",
        proTip: "Board the 9:00 PM evening cruise to see the Eiffel Tower sparkle with 20,000 golden strobe lights at the top of the hour.",
        busAvailability: "Bus 27, 72, 74, 85 at Pont Neuf",
        description: "One-hour guided panoramic boat voyage cruising past illuminated UNESCO bridges, Notre-Dame, Louvre, and Eiffel Tower."
    }
];

const tokyoMilestones = [
    {
        id: 1,
        name: "Senso-ji Temple & Nakamise-dori",
        category: "Ancient Buddhist Temple & Traditional Market",
        coords: [35.7148, 139.7967],
        timings: "06:00 AM - 05:00 PM (Grounds open 24/7)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "Start Point / Asakusa Station",
        transitMode: "Tokyo Metro Ginza Line / Toei Asakusa Line",
        googleRating: 4.7,
        reviewsCount: "82,000+",
        proTip: "Try warm melonpan bread and freshly grilled ningyo-yaki cakes along Nakamise shopping street before entering Kaminarimon gate.",
        busAvailability: "Toei Bus lines S-1, To-08 right at Asakusa Kaminarimon",
        description: "Tokyo's oldest and most significant Buddhist temple founded in 645 AD with the towering red Kaminarimon Gate."
    },
    {
        id: 2,
        name: "Shibuya Crossing & Hachiko Memorial",
        category: "World's Busiest Intersection & Monument",
        coords: [35.6595, 139.7004],
        timings: "Open 24/7 (Most energetic 06:00 PM - 10:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "25 mins via Metro Ginza Line direct to Shibuya",
        transitMode: "Tokyo Metro Ginza Line direct (¥210)",
        googleRating: 4.7,
        reviewsCount: "165,000+",
        proTip: "Cross during peak evening hours and snap a tribute photo with the bronze Hachiko dog statue outside Hachiko exit.",
        busAvailability: "Shibuya Bus Terminal connects over 20 city routes",
        description: "The pulsing heartbeat of Tokyo where up to 3,000 people cross simultaneously with every traffic light change."
    },
    {
        id: 3,
        name: "Shibuya Sky Rooftop Observatory",
        category: "360° Open-Air High Altitude Skydeck",
        coords: [35.6585, 139.7022],
        timings: "10:00 AM - 10:30 PM (Daily)",
        entryFee: { budget: 1400, standard: 2200, foreign: 2200 },
        travelTimeFromPrev: "3 mins walk (direct elevator from Shibuya Scramble Square)",
        transitMode: "High-Speed Sky Elevator",
        googleRating: 4.8,
        reviewsCount: "48,000+",
        proTip: "Book online tickets 4 weeks early for the sunset slot to witness Mount Fuji against the orange sky and neon lights switching on.",
        busAvailability: "Directly above Shibuya Station interchange",
        description: "229-meter rooftop observation deck offering unobstructed 360-degree open-air panoramas of the Shibuya scramble, Tokyo Tower, and Mt. Fuji."
    },
    {
        id: 4,
        name: "Meiji Jingu Shrine & Yoyogi Forest",
        category: "Shinto Shrine & Peaceful Evergreen Forest",
        coords: [35.6764, 139.6993],
        timings: "Sunrise to Sunset (Approx 05:30 AM - 06:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins walk or 1 stop on Yamanote Line to Harajuku",
        transitMode: "JR Yamanote Line / 15 mins shaded forest walk",
        googleRating: 4.7,
        reviewsCount: "74,000+",
        proTip: "Write an Ema prayer wooden tablet and admire the massive ceremonial sake barrels donated from across Japan.",
        busAvailability: "Hachiko Community Mini Bus stops at Meiji-Jingu-mae",
        description: "Serene Shinto shrine dedicated to Emperor Meiji, set inside a lush 170-acre forest of over 120,000 evergreen trees."
    },
    {
        id: 5,
        name: "Harajuku Takeshita Street & Omotesando",
        category: "Fashion Culture, Street Treats & Boutiques",
        coords: [35.6715, 139.7032],
        timings: "10:30 AM - 08:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins walk from Meiji Jingu entrance",
        transitMode: "Walking / Harajuku Station",
        googleRating: 4.6,
        reviewsCount: "62,000+",
        proTip: "Try gourmet Japanese crepes at Marion Crepes and explore the zelkova-lined Omotesando avenue for modernist architecture.",
        busAvailability: "Bus routes loop around Harajuku & Omotesando",
        description: "Vibrant epicenter of Japanese kawaii pop culture, quirky concept boutiques, decadent dessert shops, and tree-lined luxury boulevards."
    },
    {
        id: 6,
        name: "Akihabara Electric Town & Retro Arcades",
        category: "Anime, Manga, Retro Gaming & Tech",
        coords: [35.6984, 139.7731],
        timings: "10:00 AM - 09:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "18 mins via JR Yamanote Line from Harajuku to Akihabara",
        transitMode: "JR Yamanote Line direct",
        googleRating: 4.7,
        reviewsCount: "110,000+",
        proTip: "Visit Super Potato for 80s/90s vintage Nintendo/Sega gaming and Mandarake Complex for rare collectibles.",
        busAvailability: "Toei Bus line Cha-51 connects Akihabara to Tokyo Station",
        description: "The global mecca of gaming, electronics, manga culture, multi-level arcade game centers, and anime concept cafes."
    },
    {
        id: 7,
        name: "TeamLab Planets Digital Art Museum (Toyosu)",
        category: "Immersive Digital Light & Water Art",
        coords: [35.6491, 139.7898],
        timings: "09:00 AM - 10:00 PM (Daily)",
        entryFee: { budget: 2200, standard: 3200, foreign: 3200 },
        travelTimeFromPrev: "20 mins via Yurikamome Line to Shin-Toyosu Station",
        transitMode: "Yurikamome Monorail to Shin-Toyosu",
        googleRating: 4.8,
        reviewsCount: "78,000+",
        proTip: "Wear pants that can be rolled up to the knee as you will wade through knee-deep water projected with koi fish and infinity crystal rooms.",
        busAvailability: "Tokyo BRT bus stops at Toyosu",
        description: "Mind-bending interactive digital art museum where visitors walk barefoot through immersive water, mirror, and floating orchid installations."
    },
    {
        id: 8,
        name: "Tokyo Skytree & Solamachi Complex",
        category: "World's Tallest Freestanding Tower (634m)",
        coords: [35.7100, 139.8107],
        timings: "10:00 AM - 09:00 PM (Daily)",
        entryFee: { budget: 1600, standard: 2700, foreign: 2700 },
        travelTimeFromPrev: "15 mins via Asakusa Line to Oshiage Station",
        transitMode: "Tokyo Metro Hanzomon Line / Toei Asakusa Line",
        googleRating: 4.7,
        reviewsCount: "96,000+",
        proTip: "Visit the Tembo Galleria glass walkway at 450 meters for an exhilarating view straight down to the Tokyo grid.",
        busAvailability: "Skytree Shuttle buses run from Tokyo Station and Ueno",
        description: "Towering 634m neo-futuristic broadcasting tower offering unmatched panoramas of the Kanto plain, Bay area, and Mount Fuji."
    },
    {
        id: 9,
        name: "Tokyo Tower & Zojoji Temple",
        category: "Iconic Retro Red Tower & Historic Temple",
        coords: [35.6586, 139.7454],
        timings: "09:00 AM - 10:30 PM (Daily)",
        entryFee: { budget: 900, standard: 1800, foreign: 1800 },
        travelTimeFromPrev: "20 mins via Oedo Line to Akabanebashi Station",
        transitMode: "Toei Oedo Line (Akabanebashi) / Hibiya Line (Kamiyacho)",
        googleRating: 4.6,
        reviewsCount: "88,000+",
        proTip: "Photograph Tokyo Tower framed by the 600-year-old wooden Sanmon gate of Zojoji Temple for stunning contrast of old and new.",
        busAvailability: "Toei Bus Toku-06 stops right at Tokyo Tower base",
        description: "332.9m Eiffel-inspired communications tower illuminated in orange-red glow, standing as a beloved symbol of post-war Tokyo."
    },
    {
        id: 10,
        name: "Tsukiji Outer Market & Toyosu Fish Market",
        category: "World-Class Street Seafood & Fresh Sushi",
        coords: [35.6655, 139.7707],
        timings: "06:00 AM - 02:00 PM (Best 08:00 AM - 11:30 AM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins via Hibiya Line to Tsukiji Station",
        transitMode: "Tokyo Metro Hibiya Line (Tsukiji) / Oedo Line (Tsukijishijo)",
        googleRating: 4.6,
        reviewsCount: "75,000+",
        proTip: "Try grilled king crab legs, Japanese rolled tamagoyaki omelet on a stick, and fresh sea urchin (uni) bowls.",
        busAvailability: "Toei Bus lines To-01, To-04 stop at Tsukiji 6-chome",
        description: "Bustling foodie haven packed with over 400 wholesale seafood stalls, artisanal knife shops, and fresh sushi counters."
    },
    {
        id: 11,
        name: "Tokyo Imperial Palace & East Gardens",
        category: "Imperial Residence & Edo Castle Moats",
        coords: [35.6852, 139.7528],
        timings: "09:00 AM - 05:00 PM (Closed Mondays & Fridays)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins walk from Tokyo Station / Otemachi",
        transitMode: "Tokyo Metro Marunouchi Line / Chiyoda Line",
        googleRating: 4.6,
        reviewsCount: "68,000+",
        proTip: "Photograph the iconic double-arched Nijubashi Stone Bridge reflecting in the palace moat with pine trees.",
        busAvailability: "Toei Bus to Otemachi and Marunouchi loops",
        description: "Sprawling primary residence of the Emperor of Japan surrounded by ancient stone defense walls, defensive moats, and pristine gardens."
    },
    {
        id: 12,
        name: "Shinjuku Gyoen National Garden",
        category: "Imperial Japanese, French & English Gardens",
        coords: [35.6852, 139.7101],
        timings: "09:00 AM - 05:30 PM (Closed Mondays)",
        entryFee: { budget: 300, standard: 500, foreign: 500 },
        travelTimeFromPrev: "15 mins via Marunouchi Line to Shinjuku-Gyoemmae",
        transitMode: "Tokyo Metro Marunouchi Line (Shinjuku-Gyoemmae)",
        googleRating: 4.8,
        reviewsCount: "72,000+",
        proTip: "One of Tokyo's premier cherry blossom and autumn foliage spots; walk across the wooden footbridge over the tranquil carp ponds.",
        busAvailability: "Shinjuku WE Bus connects to park gates",
        description: "A 144-acre former imperial garden blending traditional Japanese landscaping with formal French and English garden architecture."
    },
    {
        id: 13,
        name: "Omoide Yokocho & Kabukicho Neon Alley",
        category: "Atmospheric Yakitori Alleys & Neon District",
        coords: [35.6938, 139.6998],
        timings: "05:00 PM - 02:00 AM (Night Vibe)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins walk from Shinjuku Station West Exit",
        transitMode: "JR Yamanote / Chuo Line (Shinjuku Station)",
        googleRating: 4.6,
        reviewsCount: "58,000+",
        proTip: "Squeeze into a tiny 6-seat counter stall in 'Memory Lane' (Omoide Yokocho) for charcoal-grilled yakitori skewers and cold draft beer.",
        busAvailability: "Busta Shinjuku Expressway Terminal right next door",
        description: "Showa-era narrow nostalgic alleyways filled with smoky izakayas contrasting with the colossal Godzilla head and neon lights of Kabukicho."
    },
    {
        id: 14,
        name: "Ueno Park, Tokyo National Museum & Shinobazu Pond",
        category: "Cultural Epicenter, Grand Museums & Lotus Pond",
        coords: [35.7140, 139.7741],
        timings: "05:00 AM - 11:00 PM (Museums: 09:30 AM - 05:00 PM)",
        entryFee: { budget: 0, standard: 1000, foreign: 1000 },
        travelTimeFromPrev: "15 mins via JR Yamanote Line from Shinjuku to Ueno",
        transitMode: "JR Yamanote Line / Tokyo Metro Ginza Line (Ueno Station)",
        googleRating: 4.7,
        reviewsCount: "84,000+",
        proTip: "Rent a swan paddleboat on Shinobazu Pond and see samurai armor and Buddhist statues in the Tokyo National Museum Honkan.",
        busAvailability: "Ueno Station Bus Terminal with 15+ lines",
        description: "Expansive public park home to Japan's oldest and largest museum, Ueno Zoo, Kaneiji Temple, and cherry blossom avenues."
    },
    {
        id: 15,
        name: "Odaiba Waterfront, Rainbow Bridge & Unicorn Gundam",
        category: "Futuristic Island, Bay Boardwalk & Statues",
        coords: [35.6244, 139.7755],
        timings: "Open 24/7 (Gundam Light Show at 07:00 PM & 08:30 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "25 mins via Yurikamome Driverless Monorail",
        transitMode: "Yurikamome Monorail across Rainbow Bridge",
        googleRating: 4.7,
        reviewsCount: "66,000+",
        proTip: "Watch the 19.7-meter life-sized Unicorn Gundam transform into Destroy Mode with glowing armor plates at evening dusk.",
        busAvailability: "Toei Bus lines To-05, Umi-01 to Odaiba Kaihinkoen",
        description: "High-tech entertainment island on Tokyo Bay featuring a replica Statue of Liberty, seaside boardwalks, and illuminated Rainbow Bridge vistas."
    }
];

const dubaiMilestones = [
    {
        id: 1,
        name: "Burj Khalifa & At The Top Observation Deck",
        category: "World's Tallest Skyscraper (828m)",
        coords: [25.1972, 55.2744],
        timings: "08:30 AM - 11:00 PM (Daily)",
        entryFee: { budget: 0, standard: 3800, foreign: 3800 },
        travelTimeFromPrev: "Start Point / Burj Khalifa Metro",
        transitMode: "Dubai Metro Red Line + AC Metro Link",
        googleRating: 4.8,
        reviewsCount: "410,000+",
        proTip: "Book level 124+125 sunset tickets online to watch dusk settle over the Arabian Gulf and Dubai desert skyline.",
        busAvailability: "RTA Bus 27, 29 connect directly to Dubai Mall basement",
        description: "828-meter engineering marvel with observation decks on levels 124, 125, and 148 overlooking the Arabian Gulf."
    },
    {
        id: 2,
        name: "The Dubai Mall & Dubai Fountain Show",
        category: "World's Largest Shopping & Choreographed Fountains",
        coords: [25.1995, 55.2796],
        timings: "10:00 AM - 12:00 AM (Fountain shows every 30 mins from 6 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "Direct connection inside Burj Khalifa complex",
        transitMode: "Walking / Indoor Mall Concourse",
        googleRating: 4.8,
        reviewsCount: "350,000+",
        proTip: "Watch the dancing fountain show from the Apple Store terrace or Souk Al Bahar bridge for the best vantage point.",
        busAvailability: "RTA Bus Station inside mall with 12 routes",
        description: "Massive lifestyle mall housing over 1,200 stores, Dubai Aquarium giant acrylic tank, Olympic ice rink, and lakeside restaurants."
    },
    {
        id: 3,
        name: "Dubai Frame & Zabeel Park",
        category: "Architectural Landmark & 150m Glass Bridge",
        coords: [25.2355, 55.3003],
        timings: "09:00 AM - 09:00 PM (Open 365 days)",
        entryFee: { budget: 1100, standard: 1200, foreign: 1200 },
        travelTimeFromPrev: "12 mins via Metro Red Line to Max Station",
        transitMode: "Metro Red Line to Max (Al Jafiliya) Station",
        googleRating: 4.6,
        reviewsCount: "92,000+",
        proTip: "Step onto the 50-meter luminous glass floor walkway at 150m height for an adrenaline rush overlooking old and new Dubai.",
        busAvailability: "RTA Bus C15, F09 stop at Zabeel Park Gate 4",
        description: "Massive picture frame standing 150 meters high framing Old Dubai on one side and Modern New Dubai on the other."
    },
    {
        id: 4,
        name: "Museum of the Future",
        category: "Torus Architecture & Futuristic Technology",
        coords: [25.2192, 55.2819],
        timings: "09:30 AM - 08:30 PM (Daily)",
        entryFee: { budget: 3200, standard: 3400, foreign: 3400 },
        travelTimeFromPrev: "8 mins via Metro Red Line to Emirates Towers",
        transitMode: "Dubai Metro Red Line (Emirates Towers Station)",
        googleRating: 4.7,
        reviewsCount: "78,000+",
        proTip: "Book tickets at least 3 weeks in advance as time slots sell out fast; admire the Arabic calligraphy facade laser-cut with poetry.",
        busAvailability: "Direct air-conditioned metro walkway to entrance",
        description: "Architectural masterpiece designed without internal columns, exploring humanity's next 50 years through AI, space, and bioengineering."
    },
    {
        id: 5,
        name: "Al Fahidi Historical Neighborhood (Bastakiya)",
        category: "Historic Heritage & Traditional Windtowers",
        coords: [25.2638, 55.2972],
        timings: "07:00 AM - 08:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins via Metro Green Line to Al Fahidi",
        transitMode: "Metro Green Line (Al Fahidi Station)",
        googleRating: 4.6,
        reviewsCount: "44,000+",
        proTip: "Sip traditional Arabic cardamon coffee and dates in the Arabian Tea House courtyard nestled under the bougainvillea trees.",
        busAvailability: "Bus routes 21, 29, 33 stop at Al Fahidi",
        description: "Preserved 19th-century district featuring narrow alleyways (sikkas), gypsum windtower houses, art galleries, and the Dubai Coffee Museum."
    },
    {
        id: 6,
        name: "Dubai Creek, Gold Souk & Spice Souk",
        category: "Traditional Souks & Heritage Abra Boat Ride",
        coords: [25.2684, 55.2974],
        timings: "10:00 AM - 10:00 PM (Abra boats run 24/7)",
        entryFee: { budget: 25, standard: 100, foreign: 100 },
        travelTimeFromPrev: "5 mins via Traditional Wooden Abra (1 AED / ₹23)",
        transitMode: "Traditional Wooden Abra Boat",
        googleRating: 4.6,
        reviewsCount: "78,000+",
        proTip: "Take the 1 AED wooden Abra boat across the Creek at sunset for golden reflections and bargain for saffron and pure gold jewelry.",
        busAvailability: "Bus routes C07, C09, 17, 33 stop at Gold Souk Bus Station",
        description: "Vibrant traditional marketplace famous for glittering gold jewellery, aromatic saffron, frankincense, and textiles."
    },
    {
        id: 7,
        name: "Dubai Marina & Yacht Club Promenade",
        category: "Waterfront Canal, Dining & Superyachts",
        coords: [25.0784, 55.1396],
        timings: "Open 24/7 (Vibrant evening dining)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "25 mins via Metro Red Line to DMCC Station",
        transitMode: "Dubai Metro Red Line + Dubai Tram",
        googleRating: 4.8,
        reviewsCount: "130,000+",
        proTip: "Rent an electric e-scooter or board the Dubai Marina Water Bus for scenic canal cruising past glittering high-rise towers.",
        busAvailability: "RTA Bus 8, 84, F55A stop all along JBR and Marina",
        description: "Man-made luxury marina lined with skyscrapers, fine waterfront restaurants, luxury yachts, and sandy beaches."
    },
    {
        id: 8,
        name: "JBR The Beach & Ain Dubai (Bluewaters Island)",
        category: "Golden Beach Promenade & Giant Observation Wheel",
        coords: [25.0805, 55.1270],
        timings: "Open 24/7 (Beach sports 08:00 AM - 07:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins walk across the Bluewaters Pedestrian Bridge",
        transitMode: "Dubai Tram (Jumeirah Beach Residence) / Walking",
        googleRating: 4.7,
        reviewsCount: "86,000+",
        proTip: "Walk across the scenic footbridge to Bluewaters Island for sunset views of the Marina skyline and Arabian Gulf surf.",
        busAvailability: "RTA Bus 8 stops directly at JBR 1 & 2",
        description: "Lively beachfront promenade featuring open-air cinema, water sports, camel rides on the sand, and trendy al-fresco cafes."
    },
    {
        id: 9,
        name: "Palm Jumeirah & The View at The Palm",
        category: "World-Famous Palm Archipelago & 360° Skydeck",
        coords: [25.1124, 55.1390],
        timings: "09:00 AM - 10:00 PM (Daily)",
        entryFee: { budget: 2200, standard: 2800, foreign: 2800 },
        travelTimeFromPrev: "15 mins via Palm Monorail to Nakheel Mall",
        transitMode: "Palm Monorail from Gateway Station",
        googleRating: 4.8,
        reviewsCount: "62,000+",
        proTip: "Visit The View at Level 52 of The Palm Tower for the only perspective revealing the entire tree-shaped island fronds.",
        busAvailability: "Monorail connects directly to Tram and Red Metro link",
        description: "Legendary man-made palm tree island featuring lavish villas, 5-star beach resorts, and an observatory 240m above the sea."
    },
    {
        id: 10,
        name: "Atlantis The Palm & Aquaventure Waterpark",
        category: "Iconic Luxury Resort & World's Largest Waterpark",
        coords: [25.1304, 55.1171],
        timings: "09:45 AM - 06:30 PM (Waterpark)",
        entryFee: { budget: 0, standard: 6800, foreign: 6800 },
        travelTimeFromPrev: "8 mins via Palm Monorail to Atlantis Aquaventure Terminus",
        transitMode: "Palm Monorail Terminus",
        googleRating: 4.8,
        reviewsCount: "140,000+",
        proTip: "Experience the Leap of Faith 9-story near-vertical waterslide that propels you through a clear acrylic tube surrounded by sharks.",
        busAvailability: "Palm Monorail drops at waterpark ticket gates",
        description: "Crown of Palm Jumeirah boasting the Lost Chambers Aquarium with 65,000 marine animals and 105 record-breaking waterslides."
    },
    {
        id: 11,
        name: "Burj Al Arab & Jumeirah Public Beach",
        category: "7-Star Luxury Sail Hotel & Sunset Beach",
        coords: [25.1412, 55.1852],
        timings: "Open 24/7 (Public Beach) | Tours: 10:00 AM - 07:00 PM",
        entryFee: { budget: 0, standard: 2500, foreign: 2500 },
        travelTimeFromPrev: "18 mins drive along Jumeirah Beach Road",
        transitMode: "RTA Bus 8, 88 / Taxi (₹300)",
        googleRating: 4.7,
        reviewsCount: "98,000+",
        proTip: "Sunset Beach (Umm Suqeim) right next to Burj Al Arab offers the classic postcard photo of the sail silhouette during golden hour.",
        busAvailability: "Bus 8, 81, 88, X28 stop at Wild Wadi / Burj Al Arab",
        description: "The world's most luxurious sail-shaped 7-star hotel set on its own island, renowned for opulent gold leaf interiors and underwater dining."
    },
    {
        id: 12,
        name: "Souk Madinat Jumeirah & Arabian Waterways",
        category: "Boutique Arabian Bazaar & Venice-Style Canals",
        coords: [25.1332, 55.1854],
        timings: "10:00 AM - 11:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins walk (400m) from Burj Al Arab",
        transitMode: "Walking / Abra Shuttle",
        googleRating: 4.7,
        reviewsCount: "74,000+",
        proTip: "Take an electric Abra ride along the 5km winding waterways with spectacular views of the Burj Al Arab framed by palm trees.",
        busAvailability: "RTA Bus 8, 81 stop at Madinat Jumeirah",
        description: "Authentic recreation of an ancient Arab market with carved wooden archways, perfumeries, spice merchants, and canal-side dining."
    },
    {
        id: 13,
        name: "Dubai Miracle Garden & Butterfly Garden",
        category: "World's Largest Natural Flower Garden",
        coords: [25.0599, 55.2444],
        timings: "09:00 AM - 09:00 PM (Open Nov - April Season)",
        entryFee: { budget: 1800, standard: 2100, foreign: 2100 },
        travelTimeFromPrev: "20 mins via Bus 105 from Mall of the Emirates",
        transitMode: "RTA Express Bus 105 (AED 5)",
        googleRating: 4.6,
        reviewsCount: "82,000+",
        proTip: "Photograph the Guinness World Record full-scale floral Emirates Airbus A380 covered with over 500,000 blooming petunias.",
        busAvailability: "RTA Bus 105 runs non-stop every 20 mins from MOE Metro",
        description: "72,000 sqm floral paradise featuring 150 million blooming flowers sculpted into whimsical castles, hearts, and life-size aircraft."
    },
    {
        id: 14,
        name: "Global Village Dubai",
        category: "Multicultural Festival Park & 90+ Country Pavilions",
        coords: [25.0680, 55.3780],
        timings: "04:00 PM - 12:00 AM (Open Oct - April Season)",
        entryFee: { budget: 450, standard: 550, foreign: 550 },
        travelTimeFromPrev: "20 mins drive via Sheikh Mohammed Bin Zayed Road",
        transitMode: "RTA Direct Bus 102, 103, 104, 106",
        googleRating: 4.8,
        reviewsCount: "165,000+",
        proTip: "Visit country pavilions (India, Turkey, Yemen, Thailand) for authentic street foods like Yemeni honey, Turkish kebabs, and live stunt shows.",
        busAvailability: "RTA Express Buses run from Union, Rashidiya, and Mall of the Emirates",
        description: "Spectacular international extravaganza bringing together world cultures, global cuisines, shopping pavilions, and carnival rides."
    },
    {
        id: 15,
        name: "Lahbab Red Dunes Desert Safari Camp",
        category: "High-Dune 4x4 Bashing, Sandboarding & BBQ",
        coords: [24.9577, 55.6022],
        timings: "03:00 PM - 09:30 PM (Evening Tour)",
        entryFee: { budget: 2500, standard: 4500, foreign: 4500 },
        travelTimeFromPrev: "45 mins transfer into the Arabian desert",
        transitMode: "4x4 Land Cruiser Hotel Pickup & Drop",
        googleRating: 4.8,
        reviewsCount: "190,000+",
        proTip: "Try sandboarding down the massive Big Red dune before enjoying henna painting, Tanoura dance, and a 5-star Arabic barbecue buffet.",
        busAvailability: "Safari packages include door-to-door luxury 4x4 transit",
        description: "Thrilling Arabian desert adventure with dune bashing on red sands, quad biking, camel rides, and star-lit Bedouin camp entertainment."
    }
];

const bengaluruMilestones = [
    {
        id: 1,
        name: "Lalbagh Botanical Garden & Victorian Glass House",
        category: "240-Acre Botanical Heritage",
        coords: [12.9507, 77.5848],
        timings: "06:00 AM - 07:00 PM (Daily)",
        entryFee: { budget: 25, standard: 50, foreign: 300 },
        travelTimeFromPrev: "Start Point / 15 mins from MG Road",
        transitMode: "Namma Metro Green Line (Lalbagh Station)",
        googleRating: 4.6,
        reviewsCount: "115,000+",
        proTip: "Visit early morning for serene lake walks and view the historic 1889 London Crystal Palace replica Glass House.",
        busAvailability: "Direct BMTC low-floor buses connect Lalbagh Main Gate with Majestic",
        description: "Centuries-old botanical haven commissioned by Hyder Ali, featuring over 1,800 species of flora, ancient geological rock, and rare trees."
    },
    {
        id: 2,
        name: "Bangalore Palace & Royal Grounds",
        category: "19th-Century Tudor Royal Palace",
        coords: [12.9988, 77.5921],
        timings: "10:00 AM - 05:30 PM (Open 365 Days)",
        entryFee: { budget: 250, standard: 300, foreign: 500 },
        travelTimeFromPrev: "20 mins drive (6 km) via Palace Road",
        transitMode: "BMTC Route 276 / Metro & Cab (₹120)",
        googleRating: 4.5,
        reviewsCount: "98,000+",
        proTip: "Audio tour headset is included with admission and reveals fascinating stories of the Wadiyar Royal Dynasty.",
        busAvailability: "BMTC buses drop at Mehkri Circle and Palace Gate",
        description: "Magnificent Tudor-revival royal palace with fortified turrets, battlements, vintage hunting trophies, and royal courtyards."
    },
    {
        id: 3,
        name: "Cubbon Park & Vidhana Soudha",
        category: "State Legislature & 300-Acre Green Lung",
        coords: [12.9797, 77.5907],
        timings: "06:00 AM - 08:00 PM (Vidhana Soudha illuminated Sundays & evenings)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins drive (3.5 km)",
        transitMode: "Namma Metro Purple Line (Vidhana Soudha Station)",
        googleRating: 4.7,
        reviewsCount: "145,000+",
        proTip: "Stroll through the bamboo groves to the neoclassical State Central Library and Attara Kacheri (High Court).",
        busAvailability: "Over 40 BMTC bus lines connect through KR Circle and High Court",
        description: "Sprawling central lung of Bengaluru featuring stately neo-Dravidian architecture, shaded bamboo avenues, and heritage museums."
    },
    {
        id: 4,
        name: "Bannerghatta Biological Park & Safari",
        category: "Wildlife Sanctuary & Tiger/Lion Safari",
        coords: [12.8009, 77.5777],
        timings: "09:30 AM - 05:00 PM (Closed Tuesdays)",
        entryFee: { budget: 100, standard: 350, foreign: 600 },
        travelTimeFromPrev: "45 mins drive (22 km) via Bannerghatta Main Road",
        transitMode: "AC Bus Route 365 or Uber/Cab",
        googleRating: 4.6,
        reviewsCount: "88,000+",
        proTip: "Book the Grand AC Bus Safari online to see tigers, lions, and bears in open natural enclosures and visit India's first butterfly park.",
        busAvailability: "BMTC AC Bus 365 runs every 15 mins direct from Majestic to Zoo Gates",
        description: "Vast biological sanctuary home to Asiatic lions, Bengal tigers, country's first butterfly conservatory, and elephant rescue reserve."
    },
    {
        id: 5,
        name: "ISKCON Temple Bangalore (Sri Radha Krishna)",
        category: "Modern Neo-Classical Vedic Temple",
        coords: [13.0098, 77.5511],
        timings: "07:15 AM - 01:00 PM & 04:15 PM - 08:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "20 mins via Green Line Metro to Mahalakshmi",
        transitMode: "Namma Metro Green Line (Mahalakshmi Station)",
        googleRating: 4.8,
        reviewsCount: "92,000+",
        proTip: "Try the piping hot prasadam sweets and witness the grand gold-plated dhwaja stambha (flagpole) on the Hare Krishna hill.",
        busAvailability: "BMTC buses drop at Rajajinagar 1st Block and ISKCON Gate",
        description: "One of the world's largest ISKCON temple complexes set upon a hilltop with ornate glass and gopuram architecture."
    },
    {
        id: 6,
        name: "Tipu Sultan's Summer Palace & Fort",
        category: "18th-Century Indo-Islamic Teakwood Palace",
        coords: [12.9592, 77.5737],
        timings: "08:30 AM - 05:30 PM (Daily)",
        entryFee: { budget: 25, standard: 50, foreign: 300 },
        travelTimeFromPrev: "12 mins transit (3 km) from KR Market",
        transitMode: "Metro Green Line (KR Market) / Auto Rickshaw",
        googleRating: 4.5,
        reviewsCount: "38,000+",
        proTip: "Observe the intricate floral motifs painted on the teakwood pillars, arches, and balconies constructed entirely of wood without iron nails.",
        busAvailability: "KR Market central bus interchange within 400m",
        description: "Historic two-story summer palace completed in 1791 by Tipu Sultan, showcasing Mysore Kingdom history and rocket prototypes."
    },
    {
        id: 7,
        name: "Bull Temple (Dodda Basavana Gudi) & Bugle Rock",
        category: "16th-Century Dravidian Monolithic Idol",
        coords: [12.9423, 77.5681],
        timings: "06:00 AM - 08:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins drive (2.5 km) to Basavanagudi",
        transitMode: "Green Line Metro (National College) / Auto",
        googleRating: 4.6,
        reviewsCount: "34,000+",
        proTip: "Walk to nearby Vidyarthi Bhavan on Gandhi Bazaar Main Road for Bengaluru's legendary crispy butter masala dosa.",
        busAvailability: "BMTC buses connect to Basavanagudi Bull Temple Road",
        description: "Ancient temple housing a monolithic 4.5m tall and 6m long granite bull statue of Nandi, sacred to Kempe Gowda I."
    },
    {
        id: 8,
        name: "UB City & Vittal Mallya Road",
        category: "Luxury Sky Deck, Fine Dining & Art Galleries",
        coords: [12.9719, 77.5960],
        timings: "10:30 AM - 11:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins drive (4 km) to Central Business District",
        transitMode: "Walking from Cubbon Park / Cab",
        googleRating: 4.6,
        reviewsCount: "52,000+",
        proTip: "Head to the open-air amphitheater on the 2nd floor and rooftop lounges for evening skyline dining.",
        busAvailability: "Direct stop at Richmond Circle and Kasturba Road",
        description: "India's first luxury commercial complex featuring high-end designer boutiques, art galleries, rooftop lounges, and European-style piazza."
    },
    {
        id: 9,
        name: "Church Street, Brigade Road & Commercial Street",
        category: "Bookstores, Cafes, Street Art & Shopping Spines",
        coords: [12.9752, 77.6053],
        timings: "11:00 AM - 11:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins walk from MG Road Metro",
        transitMode: "Namma Metro Purple Line (MG Road / Trinity)",
        googleRating: 4.7,
        reviewsCount: "120,000+",
        proTip: "Browse through thousands of second-hand classics at Blossom Book House and enjoy filter coffee and indie music at street cafes.",
        busAvailability: "MG Road & Shivaji Nagar Bus Stations nearby",
        description: "The vibrant cultural heart of Bengaluru featuring pedestrianized cobblestone walks, indie bookstores, street musicians, and fashion bazaars."
    },
    {
        id: 10,
        name: "National Gallery of Modern Art (NGMA)",
        category: "Heritage Mansion & Contemporary Indian Art",
        coords: [12.9897, 77.5884],
        timings: "10:00 AM - 05:00 PM (Closed Mondays)",
        entryFee: { budget: 20, standard: 50, foreign: 500 },
        travelTimeFromPrev: "10 mins drive (2.5 km) along Palace Road",
        transitMode: "Auto Rickshaw / Bus",
        googleRating: 4.7,
        reviewsCount: "18,000+",
        proTip: "Sit by the mirror pond under the giant heritage tree and sip freshly brewed filter coffee at the open-air sculpture cafe.",
        busAvailability: "Buses stop at Mount Carmel College / Palace Road",
        description: "Magnificent 100-year-old Manikyavelu Mansion surrounded by botanical grounds showcasing works by Raja Ravi Varma, Tagore, and Amrita Sher-Gil."
    },
    {
        id: 11,
        name: "Visvesvaraya Industrial & Technological Museum",
        category: "Interactive Science & Space Exploration",
        coords: [12.9751, 77.5963],
        timings: "09:30 AM - 06:00 PM (Daily)",
        entryFee: { budget: 85, standard: 100, foreign: 100 },
        travelTimeFromPrev: "5 mins walk from Cubbon Park",
        transitMode: "Walking / Metro Cubbon Park",
        googleRating: 4.6,
        reviewsCount: "42,000+",
        proTip: "Don't miss the full-scale animated dinosaur pavilion, engine exhibits, and live science demonstration shows on the 3rd floor.",
        busAvailability: "Kasturba Road bus stops",
        description: "Interactive science museum dedicated to Bharat Ratna Sir M. Visvesvaraya, with 7 interactive galleries and space simulators."
    },
    {
        id: 12,
        name: "Ulsoor Lake & Boating Promenade",
        category: "Picturesque Central Lake & Island Views",
        coords: [12.9818, 77.6200],
        timings: "06:00 AM - 08:00 PM (Closed Wednesdays)",
        entryFee: { budget: 0, standard: 50, foreign: 500 },
        travelTimeFromPrev: "10 mins via Purple Line Metro to Halasuru",
        transitMode: "Namma Metro Purple Line (Halasuru / Trinity)",
        googleRating: 4.5,
        reviewsCount: "35,000+",
        proTip: "Take a tranquil pedal boat ride around the small islands and enjoy the shaded walking and jogging track at sunrise.",
        busAvailability: "BMTC buses connect to Ulsoor / Kensington Road",
        description: "Sprawling 120-acre historical lake constructed by Kempe Gowda II, dotted with small islands and jogging trails."
    },
    {
        id: 13,
        name: "Indiranagar 100ft Road & Craft Microbreweries",
        category: "Craft Beer Capital, Culinary Trails & Boutiques",
        coords: [12.9716, 77.6412],
        timings: "12:00 PM - 12:00 AM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "8 mins via Metro Purple Line to Indiranagar",
        transitMode: "Namma Metro Purple Line (Indiranagar / CMH Road)",
        googleRating: 4.7,
        reviewsCount: "78,000+",
        proTip: "Taste freshly brewed mango cider and Belgian witbier at Toit Brewpub, and explore artisanal gelato and fashion boutiques on 12th Main.",
        busAvailability: "Direct BMTC low-floor buses connect Indiranagar with Silk Board and Majestic",
        description: "India's premier culinary and microbrewery hub, boasting world-renowned brewpubs, indie fashion boutiques, and specialty coffee roasters."
    },
    {
        id: 14,
        name: "Jawaharlal Nehru Planetarium & Science Park",
        category: "Astronomy Sky Theatre & Science Park",
        coords: [12.9848, 77.5898],
        timings: "10:00 AM - 05:30 PM (Closed Mondays)",
        entryFee: { budget: 60, standard: 100, foreign: 200 },
        travelTimeFromPrev: "10 mins transit to High Grounds",
        transitMode: "Metro (Vidhana Soudha) + 8 min walk",
        googleRating: 4.6,
        reviewsCount: "26,000+",
        proTip: "Book the full-dome 4K sky theater show online to experience interactive simulations of galaxies, black holes, and space missions.",
        busAvailability: "Direct stop at Planetarium / Raj Bhavan Road",
        description: "Premier astronomy learning hub featuring a 15-meter dome sky theatre, outdoor science park, and astronomical observatory."
    },
    {
        id: 15,
        name: "Nandi Hills Sunrise Fortress & Cloud-Bed Vista",
        category: "Ancient Hill Fortress & Cloud Canopy Overlook",
        coords: [13.3702, 77.6835],
        timings: "06:00 AM - 06:00 PM (Best at 05:45 AM for Sunrise)",
        entryFee: { budget: 20, standard: 100, foreign: 200 },
        travelTimeFromPrev: "1 hr 15 mins drive (60 km) north on Bellary Highway",
        transitMode: "BMTC / KSRTC Morning Bus or Early Cab (₹1,500)",
        googleRating: 4.6,
        reviewsCount: "95,000+",
        proTip: "Arrive at the base gates by 05:30 AM to catch the magical ocean of morning clouds rolling below the cliff edges.",
        busAvailability: "Direct morning KSRTC and BMTC buses run from Majestic to Nandi Hills base",
        description: "Ancient hill fortress standing 1,478m above sea level, featuring Tipu's Drop, 1,000-year-old Bhoga Nandeeshwara Temple, and misty valley views."
    }
];

const goaMilestones = [
    {
        id: 1,
        name: "Fort Aguada & 1864 Lighthouse",
        category: "17th-Century Portuguese Sea Fortress",
        coords: [15.4925, 73.7737],
        timings: "09:30 AM - 05:30 PM (Daily)",
        entryFee: { budget: 25, standard: 50, foreign: 300 },
        travelTimeFromPrev: "Start Point / 20 mins from Panaji",
        transitMode: "Kadamba AC City Bus / Self-drive Scooter (₹350/day)",
        googleRating: 4.6,
        reviewsCount: "87,000+",
        proTip: "Visit around 4:00 PM for scenic ocean breeze and 360-degree views of Sinquerim beach and Arabian Sea.",
        busAvailability: "Kadamba Shuttle runs from Panaji to Candolim-Aguada",
        description: "Historic Portuguese fort standing guard over the Arabian Sea with a 4-tier freshwater reservoir."
    },
    {
        id: 2,
        name: "Basilica of Bom Jesus & Old Goa",
        category: "UNESCO World Heritage Baroque Architecture",
        coords: [15.5009, 73.9116],
        timings: "09:00 AM - 06:30 PM (Sundays: 10:30 AM - 06:30 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "25 mins drive (18 km) via NH748",
        transitMode: "Kadamba Intercity Bus from Panaji Bus Stand",
        googleRating: 4.7,
        reviewsCount: "72,000+",
        proTip: "Wear modest clothing covering shoulders and knees out of respect for the sacred sanctum.",
        busAvailability: "Direct Panaji - Old Goa Kadamba buses every 10 mins",
        description: "Baroque Catholic basilica containing the sacred mortal remains of St. Francis Xavier."
    },
    {
        id: 3,
        name: "Se Cathedral (Sé Catedral de Santa Catarina)",
        category: "Largest Church in Asia & Golden Bell",
        coords: [15.5034, 73.9128],
        timings: "07:30 AM - 06:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "3 mins walk (200m) across the heritage square",
        transitMode: "Walking",
        googleRating: 4.7,
        reviewsCount: "38,000+",
        proTip: "Listen to the famous 'Golden Bell', one of the best in the world for its deep melodic tone.",
        busAvailability: "Direct stop at Old Goa Church Complex",
        description: "Magnificent 16th-century Portuguese-Manueline cathedral dedicated to St. Catherine of Alexandria with 14 ornate altars."
    },
    {
        id: 4,
        name: "Calangute Beach & Water Sports Hub",
        category: "The Queen of Beaches & Water Adventures",
        coords: [15.5439, 73.7553],
        timings: "Open 24/7 (Water sports 09:00 AM - 05:30 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "30 mins drive (22 km) through scenic coastal villages",
        transitMode: "Scooter / Open Jeep / Bus",
        googleRating: 4.5,
        reviewsCount: "160,000+",
        proTip: "Try parasailing, jet ski, and banana boat rides at Calangute central hub, then relax with fresh coconut water.",
        busAvailability: "Private & Kadamba shuttle buses running every 15 minutes",
        description: "The Queen of Beaches, famous for beach shack cafes, nightlife, water sports, and sunset strolls."
    },
    {
        id: 5,
        name: "Baga Beach & Tito's Lane",
        category: "Nightlife Epicenter & Coastal Shacks",
        coords: [15.5553, 73.7517],
        timings: "Open 24/7 (Shacks & Clubs active till late night)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins drive / beach walk (1.5 km) from Calangute",
        transitMode: "Walking / Scooter",
        googleRating: 4.6,
        reviewsCount: "145,000+",
        proTip: "Dine with your feet in the sand with candlelit seafood platters at Britto's and listen to live acoustic music.",
        busAvailability: "Baga bus stop connected with Mapusa and Panaji",
        description: "Lively coastal beach famous for vibrant beach clubs, water sports at the Baga river creek, and candlelit seafood shacks."
    },
    {
        id: 6,
        name: "Anjuna Beach & Wednesday Flea Market",
        category: "Bohemian Hippie Heritage & Beach Bars",
        coords: [15.5804, 73.7431],
        timings: "Open 24/7 (Flea market Wednesdays 09:00 AM - 07:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins drive (6 km) via Anjuna coastal road",
        transitMode: "Scooter / Auto",
        googleRating: 4.6,
        reviewsCount: "82,000+",
        proTip: "Visit on Wednesday to shop for silver jewelry, handmade leather bags, spices, and Tibetan handicrafts at the flea market.",
        busAvailability: "Local buses run from Mapusa bus terminal",
        description: "Iconic bohemian beach with rocky volcanic headlands, trance music history, and world-famous Wednesday flea market."
    },
    {
        id: 7,
        name: "Chapora Fort ('Dil Chahta Hai' Fort)",
        category: "Panoramic Cliff Fort & Estuary Vistas",
        coords: [15.6059, 73.7369],
        timings: "09:00 AM - 06:00 PM (Best at Sunset)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins drive (4.5 km) to Chapora base",
        transitMode: "Scooter + 10 min scenic walk up laterite stone path",
        googleRating: 4.6,
        reviewsCount: "64,000+",
        proTip: "Sit on the red ramparts overlooking the Chapora River meeting the Arabian Sea for the iconic sunset silhouette photo.",
        busAvailability: "Buses connect from Mapusa to Chapora village",
        description: "1717 red-laterite cliff fort immortalized in Bollywood cinema, offering panoramic 360-degree coastal and river estuary vistas."
    },
    {
        id: 8,
        name: "Vagator Beach & Ozran (Little Vagator)",
        category: "Dramatic Red Cliffs & Shiva Rock Carving",
        coords: [15.5991, 73.7380],
        timings: "Open 24/7",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins drive from Chapora Fort base",
        transitMode: "Scooter / Walking",
        googleRating: 4.6,
        reviewsCount: "58,000+",
        proTip: "Walk down to Little Vagator (Ozran) to find the face of Lord Shiva sculpted directly onto the beach rock face.",
        busAvailability: "Buses to Vagator stop near HillTop",
        description: "Stunning crescent beaches framed by dramatic red cliffs, fresh water springs, and world-renowned cliffside sunset cafes."
    },
    {
        id: 9,
        name: "Dudhsagar Waterfalls & Jeep Safari",
        category: "Four-Tiered 310m Cascades & Jungle Reserve",
        coords: [15.3144, 74.3143],
        timings: "07:00 AM - 05:00 PM (Best Post-Monsoon / Winter)",
        entryFee: { budget: 50, standard: 500, foreign: 500 },
        travelTimeFromPrev: "1.5 hrs scenic drive to Kulem Jeep Hub",
        transitMode: "Official 4x4 Safari Jeep from Kulem Hub (₹500/seat)",
        googleRating: 4.7,
        reviewsCount: "54,000+",
        proTip: "Rent a life jacket at Kulem gate to safely swim in the natural mountain plunge pool directly beneath the railway bridge.",
        busAvailability: "State buses to Kulem station from Margao and Ponda terminals",
        description: "One of India's tallest 310m tiered waterfalls resembling a sea of milk amidst lush Western Ghats jungles."
    },
    {
        id: 10,
        name: "Palolem Beach & Butterfly Island (South Goa)",
        category: "Crescent Golden Bay & Kayaking with Dolphins",
        coords: [15.0100, 74.0232],
        timings: "Open 24/7 (Calm swimming beach)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "1 hr 15 mins scenic coastal drive south from Margao",
        transitMode: "Kadamba South Express / Scooter / Private Cab",
        googleRating: 4.8,
        reviewsCount: "96,000+",
        proTip: "Rent a sea kayak in the early morning for ₹300/hour to paddle out and spot wild dolphins playing in the calm bay waters.",
        busAvailability: "Direct Kadamba buses from Margao KTC to Canacona / Palolem",
        description: "Breathtaking semi-circular white sand beach lined with swaying coconut palms, wooden beach huts, and gentle turquoise waves."
    },
    {
        id: 11,
        name: "Cabo de Rama Fort & Cliff Overlook",
        category: "Ancient Secluded Fort with Azure Waters",
        coords: [15.0906, 73.9217],
        timings: "09:00 AM - 05:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "30 mins scenic drive (22 km) north of Palolem",
        transitMode: "Scooter / Taxi",
        googleRating: 4.6,
        reviewsCount: "28,000+",
        proTip: "A serene, crowd-free cliff where Lord Rama was believed to have stayed during his exile; the turquoise water view below is mesmerizing.",
        busAvailability: "Canacona local shuttles to Cabo village",
        description: "Medieval coastal fortress perched on a dramatic cliff with a small white church and historic Portuguese cannons."
    },
    {
        id: 12,
        name: "Fontainhas Latin Quarter (Panaji)",
        category: "Colorful Portuguese Heritage Mansions",
        coords: [15.4989, 73.8315],
        timings: "Open 24/7 (Heritage Walkway)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "Central Panaji / 10 mins walk from bus stand",
        transitMode: "Walking / E-Rickshaw",
        googleRating: 4.7,
        reviewsCount: "42,000+",
        proTip: "Visit traditional 100-year-old bakeries like Confeitaria 31 De Janeiro for authentic Bebinca cake and Portuguese egg tarts.",
        busAvailability: "Panaji KTC Central Bus Terminal within 800m",
        description: "Asia's only recognized Latin Quarter, famous for pastel-painted Portuguese houses with wrought-iron balconies and tiled street signs."
    },
    {
        id: 13,
        name: "Our Lady of the Immaculate Conception Church",
        category: "Zigzag Baroque Staircase Church",
        coords: [15.4984, 73.8290],
        timings: "09:00 AM - 12:30 PM & 03:30 PM - 07:30 PM",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins walk from Fontainhas Latin Quarter",
        transitMode: "Walking",
        googleRating: 4.7,
        reviewsCount: "52,000+",
        proTip: "Stand at the base of Church Square at sunset when the brilliant white facade is illuminated by glowing street lamps.",
        busAvailability: "Direct stop at Panaji Church Square",
        description: "Colonial-era 1609 Catholic church with an iconic double-crisscross staircase overlooking the municipal square of Panaji."
    },
    {
        id: 14,
        name: "Sahakari Spice Farm & Plantations (Ponda)",
        category: "Organic Spice Trail & Traditional Goan Feast",
        coords: [15.4055, 74.0152],
        timings: "09:00 AM - 04:30 PM (Daily)",
        entryFee: { budget: 400, standard: 500, foreign: 500 },
        travelTimeFromPrev: "35 mins drive (28 km) from Panaji",
        transitMode: "Bus to Ponda / Taxi",
        googleRating: 4.6,
        reviewsCount: "22,000+",
        proTip: "Enjoy the herbal welcoming garland, lemongrass tea, and traditional buffet lunch served on fresh banana leaves.",
        busAvailability: "Ponda state bus station within 5 km",
        description: "130-acre lush spice estate where you can learn about vanilla, cardamom, peri-peri chillies, cinnamon, and elephant bathing."
    },
    {
        id: 15,
        name: "Mandovi River Sunset Luxury Cruise",
        category: "Folk Dance, DJ Music & Scenic Riverfront",
        coords: [15.5015, 73.8295],
        timings: "05:30 PM - 08:30 PM (1-Hour Evening Cruises)",
        entryFee: { budget: 400, standard: 600, foreign: 600 },
        travelTimeFromPrev: "Panaji Santa Monica Jetty / 5 mins walk",
        transitMode: "GTDC Santa Monica Jetty Boats",
        googleRating: 4.5,
        reviewsCount: "38,000+",
        proTip: "Board the 06:00 PM sunset departure to watch traditional Dekhni and Fugdi Goan folk dances while gliding past floating casino ships.",
        busAvailability: "Panaji Jetty is next to the main KTC Bus Terminal",
        description: "Delightful 1-hour cruise along the Mandovi River with live Goan cultural performances, DJ music, and views of Panaji city lights."
    }
];

const manaliMilestones = [
    {
        id: 1,
        name: "Hadimba Devi Temple & Cedar Woods",
        category: "Ancient Pagoda Temple in Pine Forests",
        coords: [32.2483, 77.1804],
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "Start Point / 10 mins from Mall Road",
        transitMode: "Walking / Auto Rickshaw (₹100)",
        googleRating: 4.7,
        reviewsCount: "68,000+",
        proTip: "Try traditional Himachali dress photo shoots outside the temple in the deodar cedar trees and pet Angora rabbits.",
        busAvailability: "Local HRTC town shuttle stops at Dhungri gate",
        description: "Unique 4-tier wooden pagoda temple built in 1553 surrounded by ancient towering Deodar trees."
    },
    {
        id: 2,
        name: "Solang Valley Adventure Hub",
        category: "Paragliding, Zorbing & Cable Car",
        coords: [32.3166, 77.1578],
        timings: "09:00 AM - 06:00 PM (Snow sports in winter)",
        entryFee: { budget: 0, standard: 500, foreign: 500 },
        travelTimeFromPrev: "35 mins drive (14 km) via NH3",
        transitMode: "HRTC Electric City Bus (₹40) or Shared Cab",
        googleRating: 4.6,
        reviewsCount: "95,000+",
        proTip: "Take the Solang ropeway cable car to Mt. Phatru for panoramic snow valley views and tandem paragliding.",
        busAvailability: "HRTC Green Electric Buses run hourly from Manali Bus Stand",
        description: "Side valley at the top of the Kullu Valley offering paragliding, quad biking, and winter ski slopes."
    },
    {
        id: 3,
        name: "Atal Tunnel (Rohtang Gateway)",
        category: "World's Longest High-Altitude Tunnel",
        coords: [32.4496, 77.1644],
        timings: "Open 24/7 (Drive during daylight 08:00 AM - 05:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "45 mins drive (28 km) through 9.02 km tunnel",
        transitMode: "HRTC North Portal Bus / Shared Tata Sumo",
        googleRating: 4.9,
        reviewsCount: "112,000+",
        proTip: "Cross the Atal Tunnel to witness the dramatic transition from lush green Kullu to mystical Lahaul snowfields.",
        busAvailability: "HRTC Keylong / Lahaul buses pass through Atal Tunnel every 45 mins",
        description: "Engineering marvel at 10,040 ft connecting Manali to the breathtaking Trans-Himalayan valleys of Lahaul."
    },
    {
        id: 4,
        name: "Sissu Waterfall & Valley (Lahaul)",
        category: "Glacial Cascades & Trans-Himalayan Plateau",
        coords: [32.4777, 77.1264],
        timings: "08:00 AM - 05:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins drive (6 km) from Atal Tunnel North Portal",
        transitMode: "Shared Cab / HRTC Bus",
        googleRating: 4.8,
        reviewsCount: "42,000+",
        proTip: "Walk down to Sissu Lake or zip-line across the gushing river overlooking the 50-meter roaring waterfall.",
        busAvailability: "Direct bus drop at Sissu village bridge",
        description: "Spectacular glacial waterfall dropping from high Himalayan cliffs into the Chandra River against snow-capped peaks."
    },
    {
        id: 5,
        name: "Rohtang Pass (Snow Point at 13,058 ft)",
        category: "High-Altitude Glaciers & Mountain Pass",
        coords: [32.3716, 77.2466],
        timings: "06:00 AM - 04:00 PM (Closed Tuesdays / Subject to snow permits)",
        entryFee: { budget: 550, standard: 1200, foreign: 1200 },
        travelTimeFromPrev: "1.5 hrs winding mountain drive (51 km)",
        transitMode: "HPTDC Tourist Bus / Pre-permitted Taxi",
        googleRating: 4.7,
        reviewsCount: "78,000+",
        proTip: "Apply for the NGT vehicle permit online early and rent snowsuits and boots at Kothi village.",
        busAvailability: "HPTDC run daily organized sightseeing coaches to Rohtang",
        description: "Legendary high mountain pass offering untouched glaciers, snow sports, and sweeping vistas of the Pir Panjal range."
    },
    {
        id: 6,
        name: "Old Manali Bohemian Village & Cafes",
        category: "Himalayan Cafes, Live Music & Apple Orchards",
        coords: [32.2612, 77.1852],
        timings: "Cafes: 09:00 AM - 11:30 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "15 mins walk across the Manalsu bridge",
        transitMode: "Scenic Footpath / Walking Trail",
        googleRating: 4.8,
        reviewsCount: "48,000+",
        proTip: "Try wood-fired trout pizza and Israeli shakshuka at Cafe 1947 or Dylan's Toasted and Roasted Coffee House.",
        busAvailability: "Pedestrian friendly zone; auto rickshaws drop at bridge",
        description: "Bohemian village with artistic cafes, live acoustic music, apple orchards, and a scenic 45-min hike to Jogini falls."
    },
    {
        id: 7,
        name: "Jogini Waterfalls Nature Trek",
        category: "Scenic Nature Hike & Sacred Waterfalls",
        coords: [32.2687, 77.1950],
        timings: "07:00 AM - 05:00 PM (Daylight Trek)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "45 mins gentle forest hike from Vashisht",
        transitMode: "Nature Walking Trail",
        googleRating: 4.8,
        reviewsCount: "34,000+",
        proTip: "Wear comfortable grip shoes; the trail through pine woods and apple orchards offers stunning views of the Beas River below.",
        busAvailability: "Start point at Vashisht village auto stand",
        description: "Multi-tiered natural waterfall cascading down steep cliffs, considered sacred by local villagers with tranquil meditation spots."
    },
    {
        id: 8,
        name: "Vashisht Hot Springs & Temple",
        category: "Natural Geothermal Sulphur Springs",
        coords: [32.2610, 77.1878],
        timings: "07:00 AM - 01:00 PM & 02:00 PM - 09:00 PM",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "10 mins walk from Old Manali / 3 km from Mall Road",
        transitMode: "Auto Rickshaw / Walking",
        googleRating: 4.5,
        reviewsCount: "44,000+",
        proTip: "Take a dip in the natural warm mineral water springs believed to have medicinal healing properties for joint and skin wellness.",
        busAvailability: "Autos and local town shuttles connect to Vashisht Temple",
        description: "Ancient 4,000-year-old temple dedicated to Sage Vashishta, famed for its enclosed natural hot sulphur spring bathing kunds."
    },
    {
        id: 9,
        name: "Mall Road Manali & Tibetan Market",
        category: "Central Street, Shopping & Himachali Delicacies",
        coords: [32.2396, 77.1887],
        timings: "10:00 AM - 10:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "City Center Hub",
        transitMode: "Pedestrian Only Boulevard",
        googleRating: 4.6,
        reviewsCount: "86,000+",
        proTip: "Sample freshly steamed Tibetan momos, authentic thukpa soup, and shop for Kullu shawls and pure Himalayan honey.",
        busAvailability: "Manali Main HRTC Bus Terminal at the foot of Mall Road",
        description: "The vibrant pedestrian commercial avenue of Manali, lined with woolen craft shops, authentic restaurants, and mountain viewpoints."
    },
    {
        id: 10,
        name: "Manu Temple (Upper Manali)",
        category: "Only Indian Temple Dedicated to Sage Manu",
        coords: [32.2562, 77.1725],
        timings: "06:00 AM - 08:00 PM (Daily)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "12 mins walk uphill through Old Manali",
        transitMode: "Walking / Auto Rickshaw",
        googleRating: 4.6,
        reviewsCount: "26,000+",
        proTip: "Admire the intricate wood-carved tiered roof and panoramic view of the snow-clad Dhauladhar mountains from the courtyard.",
        busAvailability: "Old Manali bridge drop point + short walk",
        description: "Historic stone and wood temple dedicated to Sage Manu, the creator of the human race according to Hindu tradition."
    },
    {
        id: 11,
        name: "Van Vihar National Forest Park",
        category: "Cedar Forest Trails & Boating Pond",
        coords: [32.2382, 77.1895],
        timings: "08:00 AM - 07:00 PM (Daily)",
        entryFee: { budget: 20, standard: 30, foreign: 50 },
        travelTimeFromPrev: "2 mins walk from Mall Road",
        transitMode: "Walking",
        googleRating: 4.5,
        reviewsCount: "29,000+",
        proTip: "Enjoy a peaceful stroll right along the roaring Beas riverbank under 100-year-old cedar trees away from town noise.",
        busAvailability: "Directly behind Manali Bus Stand",
        description: "Serene municipal park densely planted with towering deodar trees, offering children's play areas and paddle boating."
    },
    {
        id: 12,
        name: "Naggar Castle & Nicholas Roerich Art Gallery",
        category: "15th-Century Heritage Wood & Stone Castle",
        coords: [32.1383, 77.1714],
        timings: "09:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 30, standard: 50, foreign: 100 },
        travelTimeFromPrev: "35 mins scenic drive (21 km) along left bank of Beas",
        transitMode: "HRTC Naggar Bus (₹35) / Taxi",
        googleRating: 4.6,
        reviewsCount: "38,000+",
        proTip: "Dine on the castle terrace cafe overlooking the entire Kullu Valley and visit the Roerich estate art gallery up the hill.",
        busAvailability: "Hourly HRTC buses run between Manali and Naggar",
        description: "Historic 1460 AD castle built by Raja Sidh Singh in 'Kathkuni' style using alternating stone slabs and deodar timber logs."
    },
    {
        id: 13,
        name: "Gulaba Snow Point & Alpine Meadows",
        category: "Pristine Snowfields & Pine Meadows",
        coords: [32.3214, 77.2105],
        timings: "06:00 AM - 05:00 PM (Daylight)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "40 mins drive (20 km) on Leh-Manali Highway",
        transitMode: "Cab / Shared Sumo",
        googleRating: 4.7,
        reviewsCount: "31,000+",
        proTip: "Featured in the movie 'Yeh Jawaani Hai Deewani'; pristine untouched snow spot during early winter and spring.",
        busAvailability: "Buses heading toward Rohtang pass through Gulaba checkpost",
        description: "Charming alpine village and checkpoint surrounded by snow-covered peaks, dense pine forests, and flower-filled meadows."
    },
    {
        id: 14,
        name: "Bhrigu Lake Trek Basecamp (Gulaba/Kulang)",
        category: "High-Altitude Sacred Glacial Lake Trail",
        coords: [32.2905, 77.2435],
        timings: "Early Morning Trek Start (Best May - Oct)",
        entryFee: { budget: 1200, standard: 2500, foreign: 2500 },
        travelTimeFromPrev: "Trek route starting from Gulaba alpine meadows",
        transitMode: "Guided Himalayan Trekking Path",
        googleRating: 4.8,
        reviewsCount: "16,000+",
        proTip: "The sacred oval lake at 14,100 ft is said to never freeze completely; offers unmatched 360-degree Himalayan views.",
        busAvailability: "Taxi to Gulaba starting point",
        description: "High-altitude glacial lake situated at 4,300 meters, famous for its color-changing water and mythological significance."
    },
    {
        id: 15,
        name: "Sethan Village & Hampta Pass Foothills",
        category: "Offbeat Buddhist Hamlet, Igloos & Stargazing",
        coords: [32.2215, 77.2344],
        timings: "Open 24/7 (Igloo stays available Jan - Mar)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "45 mins drive (15 km) via 35 hairpin bends from Prini",
        transitMode: "4x4 Gypsy / Private Cab",
        googleRating: 4.8,
        reviewsCount: "21,000+",
        proTip: "Stay overnight in a real thermal igloo during peak snow months or enjoy zero-light-pollution starry night skies.",
        busAvailability: "Private 4x4 vehicles required for steep hill climb",
        description: "Tranquil Buddhist Khampa hamlet perched at 8,900 ft overlooking the Dhauladhar range, gateway to Hampta Pass and winter igloo camping."
    }
];

const baliMilestones = [
    {
        id: 1,
        name: "Ubud Monkey Forest (Sacred Mandala)",
        category: "Sacred Ancient Forest & Sanctuary",
        coords: [-8.5194, 115.2606],
        timings: "08:30 AM - 06:00 PM (Daily)",
        entryFee: { budget: 800, standard: 1200, foreign: 1200 },
        travelTimeFromPrev: "Start Point / Ubud Cultural Hub",
        transitMode: "Scooter (100k IDR / ₹550/day) or Grab/Gojek",
        googleRating: 4.7,
        reviewsCount: "92,000+",
        proTip: "Secure sunglasses, hats, and water bottles in backpacks; do not make direct aggressive eye contact with the macaques.",
        busAvailability: "Kura-Kura Bus connects Kuta/Seminyak to Ubud daily",
        description: "Lush sanctuary with ancient banyan trees, 1,000+ Balinese long-tailed macaque monkeys, and 14th-century mossy temples."
    },
    {
        id: 2,
        name: "Tegallalang Emerald Rice Terraces",
        category: "UNESCO Subak Irrigation & Giant Swings",
        coords: [-8.4343, 115.2787],
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 250, standard: 400, foreign: 400 },
        travelTimeFromPrev: "20 mins drive (9 km) north of Ubud Center",
        transitMode: "Scooter / Day Chauffeur",
        googleRating: 4.6,
        reviewsCount: "84,000+",
        proTip: "Arrive before 08:30 AM to catch golden sunbeams filtering through the palm canopies and ride the thrilling giant jungle swing.",
        busAvailability: "Ubud tourist day tours include Tegallalang stop",
        description: "Iconic terraced green rice paddies carved into valley hillsides, operating on the traditional Balinese communal Subak water system."
    },
    {
        id: 3,
        name: "Tanah Lot Ocean Rock Temple",
        category: "Ancient Offshore Sea Temple Formation",
        coords: [-8.6212, 115.0868],
        timings: "07:00 AM - 07:00 PM (Sunset Peak at 05:45 PM)",
        entryFee: { budget: 400, standard: 450, foreign: 450 },
        travelTimeFromPrev: "45 mins drive (32 km) via Canggu road",
        transitMode: "Scooter / Private Day Driver (500k IDR)",
        googleRating: 4.7,
        reviewsCount: "110,000+",
        proTip: "Watch the crashing ocean waves surround the rock shrine during high tide and enjoy fresh young coconut at cliff cafes.",
        busAvailability: "Tourist shuttle buses run from Kuta and Seminyak",
        description: "16th-century Hindu pilgrimage temple perched dramatically atop an offshore rock battered by crashing ocean waves."
    },
    {
        id: 4,
        name: "Uluwatu Sea Cliff Temple & Kecak Fire Dance",
        category: "70m Sea Cliff & Cultural Sunset Amphitheatre",
        coords: [-8.8291, 115.0849],
        timings: "07:00 AM - 07:00 PM (Kecak dance starts at 6:00 PM)",
        entryFee: { budget: 350, standard: 850, foreign: 850 },
        travelTimeFromPrev: "1 hr 10 mins drive (55 km) through southern peninsula",
        transitMode: "Grab Car / Scooter",
        googleRating: 4.8,
        reviewsCount: "125,000+",
        proTip: "Buy Kecak dance tickets online early as the open-air amphitheater fills up by 5:15 PM; watch the fire circle with sunset ocean backdrop.",
        busAvailability: "Kura-Kura shuttle connects to South Bali resorts",
        description: "Magnificent sea cliff temple 70 meters above the roaring waves, hosting the world-famous Kecak fire dance."
    },
    {
        id: 5,
        name: "Mount Batur Volcanic Sunrise & Geothermal Pools",
        category: "Volcano Summit Trek & Natural Hot Springs",
        coords: [-8.2421, 115.3753],
        timings: "03:30 AM Trek Start (Sunrise at 06:00 AM)",
        entryFee: { budget: 1500, standard: 2800, foreign: 2800 },
        travelTimeFromPrev: "Early morning drive to Toya Bungkah base",
        transitMode: "Guided 4x4 Jeep Safari or Trekking Guide",
        googleRating: 4.8,
        reviewsCount: "64,000+",
        proTip: "Soak in Toya Devasya natural volcanic hot springs right after completing the sunrise summit hike and eat eggs boiled in volcanic steam.",
        busAvailability: "Organized tour minivans include hotel pickup/drop across Bali",
        description: "Active volcano summit offering unforgettable sunrise vistas overlooking Lake Batur and Mount Agung."
    },
    {
        id: 6,
        name: "Tirta Empul Holy Water Spring Temple",
        category: "Sacred Purification Baths (Melukat)",
        coords: [-8.4150, 115.3153],
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 300, standard: 400, foreign: 400 },
        travelTimeFromPrev: "25 mins drive (14 km) north of Ubud",
        transitMode: "Scooter / Grab Car",
        googleRating: 4.7,
        reviewsCount: "58,000+",
        proTip: "Rent a traditional green ceremonial sarong to participate in the spiritual cleansing ritual under the 12 sacred mountain spring spouts.",
        busAvailability: "Included in standard Ubud-Kintamani tour circuits",
        description: "Ancient 10th-century national heritage temple complex famed for its crystal-clear holy spring water feeding purification pools."
    },
    {
        id: 7,
        name: "Campuhan Ridge Walk (Ubud)",
        category: "Lush Hilltop Footpath & River Valley Vistas",
        coords: [-8.5034, 115.2547],
        timings: "06:00 AM - 06:30 PM (Best at Sunrise/Sunset)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "5 mins from Ubud Palace / Warwick Ibah hotel entrance",
        transitMode: "Walking Trail",
        googleRating: 4.6,
        reviewsCount: "46,000+",
        proTip: "Begin early at 06:30 AM to beat the tropical heat, enjoy the rolling elephant grass hills, and end with fresh fruit bowls at Karsa Spa cafe.",
        busAvailability: "Ubud central walking access",
        description: "Paved 2km scenic walking trail on a gentle ridgeline separating two rushing jungle river valleys of Sungai Wos."
    },
    {
        id: 8,
        name: "Tegenungan Waterfall & Jungle River Club",
        category: "Lush Jungle Waterfall & Natural Swimming",
        coords: [-8.5753, 115.2891],
        timings: "06:30 AM - 06:30 PM (Daily)",
        entryFee: { budget: 150, standard: 250, foreign: 250 },
        travelTimeFromPrev: "20 mins drive (10 km) south of Ubud",
        transitMode: "Scooter / Car",
        googleRating: 4.5,
        reviewsCount: "52,000+",
        proTip: "Climb up to the upper wooden viewing decks for great panorama photos or relax with a cocktail at Omma Dayclub overlooking the falls.",
        busAvailability: "Shuttle cabs available from Ubud and Sanur",
        description: "Impressive 15-meter waterfall surrounded by dense tropical foliage, offering cool natural rock swimming pools and bamboo bridges."
    },
    {
        id: 9,
        name: "Seminyak Beach & Petitenget Sunset Beach Clubs",
        category: "World-Class Sunsets, Surfing & Beach Lounges",
        coords: [-8.6882, 115.1558],
        timings: "Open 24/7 (Sunset peak 05:30 PM - 07:00 PM)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "45 mins drive from Ubud / 20 mins from Kuta",
        transitMode: "Scooter / Gojek / Taxi",
        googleRating: 4.7,
        reviewsCount: "88,000+",
        proTip: "Relax on colorful beanbags under neon umbrellas at La Plancha with fresh coconut water and wood-fired pizza during sunset.",
        busAvailability: "Trans Sarbagita / Kura-Kura bus lines connect Seminyak",
        description: "Upscale golden-sand beach celebrated for gentle surf breaks, designer beach clubs (Potato Head, Ku De Ta), and dazzling sunsets."
    },
    {
        id: 10,
        name: "Ulun Danu Bratan Floating Temple (Bedugul)",
        category: "Iconic Lake Water Temple in Misty Highlands",
        coords: [-8.2752, 115.1654],
        timings: "07:00 AM - 07:00 PM (Daily)",
        entryFee: { budget: 400, standard: 500, foreign: 500 },
        travelTimeFromPrev: "1 hr 15 mins scenic mountain drive (45 km) north",
        transitMode: "Private Day Tour Van / Scooter",
        googleRating: 4.8,
        reviewsCount: "68,000+",
        proTip: "Rent a traditional swan boat to photograph the 11-tier meru pagoda appearing to float magically on the smooth crater lake.",
        busAvailability: "North Bali / Bedugul tourist buses connect daily",
        description: "Picturesque 1633 temple dedicated to the goddess of lakes Danu, set on Lake Bratan 1,200m above sea level with cool mountain air."
    },
    {
        id: 11,
        name: "Handara Iconic Bali Gateway (Bedugul)",
        category: "Traditional Candi Bentar Split Gate & Mountains",
        coords: [-8.2536, 115.1578],
        timings: "06:00 AM - 07:00 PM (Daily)",
        entryFee: { budget: 150, standard: 200, foreign: 200 },
        travelTimeFromPrev: "8 mins drive (4 km) north of Lake Bratan",
        transitMode: "Car / Scooter",
        googleRating: 4.5,
        reviewsCount: "28,000+",
        proTip: "Arrive in the early morning before 08:00 AM when misty highland clouds hover behind the ornate dark stone gate.",
        busAvailability: "Bedugul tour route stop",
        description: "Classic towering Balinese split gate against lush green mountains, symbolizing the transition between the outer world and holy ground."
    },
    {
        id: 12,
        name: "Nusa Dua Water Blow & White Sand Beach",
        category: "Dramatic Ocean Blowhole & Calm Reef Lagoons",
        coords: [-8.7997, 115.2342],
        timings: "09:00 AM - 06:00 PM (Best during high tide)",
        entryFee: { budget: 150, standard: 250, foreign: 250 },
        travelTimeFromPrev: "40 mins south via Bali Mandara Toll Bridge",
        transitMode: "Taxi / Toll Express Bus",
        googleRating: 4.6,
        reviewsCount: "38,000+",
        proTip: "Stand on the fortified wooden lookout platform to feel the mist as massive ocean swells crash into the limestone cliff blowhole.",
        busAvailability: "Trans Sarbagita Bus Route drops directly at Nusa Dua BTDC",
        description: "Pristine manicured enclave featuring luxury resorts, calm turquoise swimming beaches, and a natural volcanic rock water blowhole."
    },
    {
        id: 13,
        name: "Kanto Lampo Stepped Rock Waterfall",
        category: "Stepped Cascade for Unique Photography",
        coords: [-8.5323, 115.3315],
        timings: "07:00 AM - 05:30 PM (Daily)",
        entryFee: { budget: 150, standard: 250, foreign: 250 },
        travelTimeFromPrev: "20 mins drive (11 km) east of Ubud",
        transitMode: "Scooter / Car",
        googleRating: 4.6,
        reviewsCount: "32,000+",
        proTip: "Local guides at the base assist you in stepping onto the natural rock ledges to take safe, breathtaking water-spray portrait photos.",
        busAvailability: "Gianyar regional transport",
        description: "Unique cascading stepped rock waterfall where mountain spring water trickles over black volcanic rock formations into a calm river pool."
    },
    {
        id: 14,
        name: "Canggu Echo Beach & Batu Bolong",
        category: "Surfing Mecca, Skate Bowls & Trendy Cafes",
        coords: [-8.6595, 115.1301],
        timings: "Open 24/7 (Vibrant cafe & nightlife vibe)",
        entryFee: { budget: 0, standard: 0, foreign: 0 },
        travelTimeFromPrev: "20 mins drive north of Seminyak",
        transitMode: "Scooter (Recommended) / Gojek",
        googleRating: 4.7,
        reviewsCount: "74,000+",
        proTip: "Rent a surfboard for 50k IDR (₹280) for beginner waves at Batu Bolong and try organic acai bowls at Crate Cafe.",
        busAvailability: "Local shuttles connect to Kuta / Seminyak",
        description: "The hipster surf capital of Bali, renowned for world-class reef breaks, beach shacks, organic plant-based cafes, and lively nightlife."
    },
    {
        id: 15,
        name: "Pura Besakih (Mother Temple of Bali)",
        category: "Grand 23-Temple Complex on Slopes of Mt. Agung",
        coords: [-8.3739, 115.4508],
        timings: "08:00 AM - 06:00 PM (Daily)",
        entryFee: { budget: 450, standard: 600, foreign: 600 },
        travelTimeFromPrev: "1 hr 15 mins drive (42 km) into eastern highlands",
        transitMode: "Private Tour Car / Driver",
        googleRating: 4.7,
        reviewsCount: "44,000+",
        proTip: "Electric golf carts are available to take you up to the majestic main 7-level terrace staircase facing Mount Agung.",
        busAvailability: "Organized East Bali full-day tour coaches",
        description: "The largest, most sacred Hindu temple complex in Bali, comprising 23 separate temples perched 1,000 meters up the slope of sacred Mount Agung."
    }
];

const dynamic15GeneratorCode = `
    const lat = centerCoords[0];
    const lng = centerCoords[1];

    // Generate 15 geographically distributed milestone coordinates around center
    const offsets = [
        [0.0, 0.0],
        [0.0085, 0.0115],
        [-0.0095, 0.0145],
        [0.0165, -0.0125],
        [-0.0140, -0.0160],
        [0.0210, 0.0080],
        [-0.0060, 0.0230],
        [0.0280, -0.0210],
        [-0.0220, 0.0090],
        [0.0120, -0.0260],
        [-0.0180, -0.0080],
        [0.0250, 0.0220],
        [-0.0290, 0.0250],
        [0.0050, 0.0310],
        [-0.0350, -0.0280]
    ];

    const landmarkTemplates = [
        { name: "Historic Landmark & Heritage City Center", cat: "Heritage & Cultural Hub", fee: { budget: 100, standard: 350, foreign: 600 }, time: "09:00 AM - 06:00 PM (Open Daily)", travel: "Starting Hub / Central Access Point", transit: "City Transit Bus / Metro / Cab", rating: 4.8, reviews: "52,000+", tip: "Arrive early before 10:00 AM to beat queues and capture the best photography lighting.", bus: "High - Major Central Bus Stop within 200m", desc: "The cultural and historical centerpiece of " + citySimple + ", featuring magnificent architecture and rich heritage." },
        { name: "Royal Palace & State Citadel", cat: "Royal Architecture & Courtyards", fee: { budget: 150, standard: 400, foreign: 800 }, time: "09:30 AM - 05:30 PM (Daily)", travel: "12 mins transit (2.1 km)", transit: "Public Bus / Eco-Shuttle", rating: 4.7, reviews: "44,000+", tip: "Audio guides provide fascinating stories of royal dynasty and historic state ceremonies.", bus: "Direct stop outside palace gates", desc: "Grand palace complex showcasing historic throne rooms, manicured royal courtyards, and museum galleries." },
        { name: "National Art & History Museum", cat: "Art, Sculpture & Artifacts", fee: { budget: 80, standard: 250, foreign: 500 }, time: "10:00 AM - 05:30 PM (Closed Mondays)", travel: "10 mins walk / transit (1.5 km)", transit: "Metro / Local Transit", rating: 4.7, reviews: "38,000+", tip: "Visit the permanent collection wing first for the most iconic historical masterpieces.", bus: "Museum loop bus connects every 10 mins", desc: "Extensive exhibition galleries showcasing national art, rare sculptures, and historical archaeological treasures." },
        { name: "Grand Cathedral / Sacred Temple Sanctuary", cat: "Sacred Spiritual Architecture", fee: { budget: 0, standard: 0, foreign: 0 }, time: "07:00 AM - 07:00 PM (Daily)", travel: "8 mins transit (1.2 km)", transit: "Walking / Shuttle", rating: 4.8, reviews: "61,000+", tip: "Dress respectfully and admire the soaring stained glass arches and peaceful sanctuary acoustics.", bus: "Direct bus drop on Sanctuary Avenue", desc: "Centuries-old iconic place of worship famous for intricate stone masonry, soaring towers, and spiritual reverence." },
        { name: "Old Town Heritage Bazaars & Market Square", cat: "Street Food, Crafts & Souvenirs", fee: { budget: 0, standard: 0, foreign: 0 }, time: "10:30 AM - 10:00 PM (Best in Evening)", travel: "15 mins transit (2.4 km)", transit: "Walking / Local Rickshaw / Cab", rating: 4.7, reviews: "68,000+", tip: "Bargain politely for handcrafted souvenirs and sample authentic signature street delicacies.", bus: "Central market bus terminal 300m away", desc: "Lively heritage marketplace bustling with artisanal craft stalls, aromatic spices, and traditional food stalls." },
        { name: "Botanical Gardens & Victorian Floral Pavilion", cat: "Botanical Sanctuary & Green Haven", fee: { budget: 50, standard: 150, foreign: 300 }, time: "06:30 AM - 06:30 PM (Daily)", travel: "15 mins drive (3.2 km)", transit: "Public City Bus Route", rating: 4.6, reviews: "34,000+", tip: "Take the shaded orchid garden path in the morning for serene nature walks and exotic birdwatching.", bus: "Botanical Gardens express bus stops hourly", desc: "Lush botanical retreat featuring centuries-old trees, greenhouse pavilions, and tranquil lotus ponds." },
        { name: "Scenic Waterfront / Riverfront Promenade", cat: "Lakeside / Seaside Walkway", fee: { budget: 0, standard: 0, foreign: 0 }, time: "Open 24/7 (Best at Twilight)", travel: "12 mins transit (2.0 km)", transit: "Promenade Walking / Tram", rating: 4.8, reviews: "72,000+", tip: "Rent a bicycle or enjoy an evening boat cruise to watch glowing reflections along the water.", bus: "Waterfront tram & bus line running every 8 mins", desc: "Vibrant pedestrian boardwalk lined with cafes, public art installations, and sweeping waterfront vistas." },
        { name: "Panoramic Summit Viewpoint & Skydeck", cat: "360-Degree City Skyline Overlook", fee: { budget: 100, standard: 300, foreign: 600 }, time: "06:00 AM - 09:30 PM (Sunset Peak)", travel: "20 mins scenic drive / cable car", transit: "Cable Car / Shuttle Cab", rating: 4.9, reviews: "85,000+", tip: "Arrive 45 mins before sunset for breathtaking golden hour views over the entire " + citySimple + " horizon.", bus: "Hilltop shuttle departs every 20 mins", desc: "Elevated high-altitude summit offering magnificent 360-degree vistas of the city and surrounding mountain ridges." },
        { name: "Modern Science, Tech & Interactive Discovery Center", cat: "Innovation & Planetarium Dome", fee: { budget: 120, standard: 300, foreign: 550 }, time: "09:30 AM - 06:00 PM (Daily)", travel: "15 mins transit (3.0 km)", transit: "Metro / Electric Bus", rating: 4.6, reviews: "29,000+", tip: "Book the full-dome 3D planetarium show for an unforgettable journey through space and earth science.", bus: "Innovation park transit station link", desc: "State-of-the-art interactive science museum packed with hands-on robotics, space simulators, and tech exhibits." },
        { name: "Heritage Artisan Quarter & Craft Guilds", cat: "Traditional Weaving, Pottery & Art", fee: { budget: 0, standard: 100, foreign: 200 }, time: "10:00 AM - 07:00 PM (Daily)", travel: "12 mins transit (1.8 km)", transit: "Walking / Local Shuttle", rating: 4.7, reviews: "24,000+", tip: "Watch master craftsmen at work and try a hands-on pottery or block-printing workshop.", bus: "Artisan village shuttle stop", desc: "Charming historic quarter dedicated to preserving traditional local craftsmanship, textiles, and ceramics." },
        { name: "Authentic Street Food Alley & Gourmet Trail", cat: "Culinary Hotspot & Food Stalls", fee: { budget: 150, standard: 400, foreign: 800 }, time: "12:00 PM - 11:30 PM (Vibrant Evenings)", travel: "10 mins transit (1.5 km)", transit: "Walking / Metro", rating: 4.8, reviews: "91,000+", tip: "Look for stalls with long local queues to taste the freshest regional pastries, kebabs, and desserts.", bus: "Direct bus drop on Food Street boulevard", desc: "Famous culinary lane lined with generational family kitchens serving signature dishes and local sweet delicacies." },
        { name: "Triumphal Arch & Memorial Gardens", cat: "Monumental Architecture & Park", fee: { budget: 0, standard: 100, foreign: 200 }, time: "Open 24/7 (Illuminated at Night)", travel: "14 mins transit (2.6 km)", transit: "Metro / City Bus", rating: 4.7, reviews: "46,000+", tip: "Visit after dark when the grand stone arches and fountains are bathed in dramatic architectural lighting.", bus: "Memorial Park bus station connects 6 lines", desc: "Imposing commemorative triumphal monument surrounded by manicured lawns and reflecting fountains." },
        { name: "Tranquil Lake & Ecological Nature Lagoon", cat: "Eco Park, Boating & Bird Sanctuary", fee: { budget: 30, standard: 80, foreign: 200 }, time: "06:00 AM - 07:00 PM (Daily)", travel: "18 mins transit (3.8 km)", transit: "Eco-Bus / Cab", rating: 4.6, reviews: "31,000+", tip: "Rent a pedal boat to explore the water channels and spot native migratory water birds.", bus: "Eco-Park direct bus shuttle", desc: "Scenic freshwater lake surrounded by walking trails, wooden observation decks, and tranquil nature." },
        { name: "Cultural Performing Arts & Night Plaza", cat: "Live Folk Performances & Nightlife", fee: { budget: 200, standard: 600, foreign: 1200 }, time: "05:00 PM - 11:00 PM (Shows at 7 PM)", travel: "15 mins transit (2.5 km)", transit: "City Transit / Cab", rating: 4.8, reviews: "53,000+", tip: "Arrive by 06:30 PM to get premier front-row seating for traditional acoustic music and dance performances.", bus: "Theater Square transit terminal", desc: "Atmospheric cultural venue celebrating regional folk music, dance dramas, and vibrant evening nightlife." },
        { name: "Highland Gateway / Scenic Countryside Overlook", cat: "Nature Reserve & Valley Vista", fee: { budget: 50, standard: 150, foreign: 300 }, time: "07:00 AM - 06:00 PM (Daylight)", travel: "25 mins scenic drive (7.5 km)", transit: "Scenic Coach / Private Cab", rating: 4.8, reviews: "37,000+", tip: "Pack a picnic and enjoy fresh crisp mountain air overlooking the valley meadows below.", bus: "Valley express bus runs hourly", desc: "Gateway to the pristine surrounding countryside, featuring pine forests, nature hiking trails, and panoramic valley views." }
    ];

    const milestones15 = landmarkTemplates.map((t, idx) => {
        const off = offsets[idx] || [0, 0];
        return {
            id: idx + 1,
            name: citySimple + " " + t.name,
            category: t.cat,
            coords: [lat + off[0], lng + off[1]],
            timings: t.time,
            entryFee: t.fee,
            travelTimeFromPrev: t.travel,
            transitMode: t.transit,
            googleRating: t.rating,
            reviewsCount: t.reviews,
            proTip: t.tip,
            busAvailability: t.bus,
            description: t.desc
        };
    });
`;

console.log("Generating full app.js replacement...");

// Now let's read existing app.js and construct the new app.js
const appJsPath = path.join(__dirname, '..', 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Build the destinationDatabase object string
const newDestDb = {
    "Jaipur, Rajasthan, India": {
        name: "Jaipur",
        fullName: "Jaipur, Rajasthan, India",
        countryBadge: "Rajasthan, India 🇮🇳",
        subtitle: "The famed Pink City of royal palaces, majestic hill forts, vibrant bazaars, and legendary Rajasthani hospitality.",
        bestSeason: "Oct - Mar (Cool & Pleasant)",
        safetyScore: "9.4/10 Verified Safe",
        weather: { temp: "28°C", condition: "Pleasant & Sunny", icon: "fa-cloud-sun" },
        coords: [26.9124, 75.7873],
        milestones: jaipurMilestones,
        publicBuses: [
            { line: "Route AC-5", from: "Ajmeri Gate", to: "Amer Fort via Hawa Mahal", freq: "Every 10 mins", fare: "₹25 - ₹40", type: "Low-Floor AC City Bus" },
            { line: "Route 9A", from: "Sindhi Camp Bus Terminus", to: "Badi Chaupar / Johari Bazar", freq: "Every 8 mins", fare: "₹15", type: "Regular Public Bus" },
            { line: "Route 2", from: "Jaipur Junction Railway Station", to: "Ram Niwas Garden & Albert Hall", freq: "Every 12 mins", fare: "₹10 - ₹20", type: "Public Shuttle" }
        ],
        privateBuses: [
            { operator: "Zingbus Luxury AC Seater/Sleeper", route: "Intercity Express (Delhi / Agra / Udaipur)", rating: "4.8 ★", price: "₹650 - ₹1,200", amenities: "WiFi, Charging, Water, Live Tracking" },
            { operator: "RSRTC Goldline Super Luxury Volvo", route: "State Express Intercity", rating: "4.6 ★", price: "₹500 - ₹950", amenities: "Pushback AC, Fast Transit" },
            { operator: "IntrCity SmartBus", route: "Smart Lounge & Sleeper Connect", rating: "4.7 ★", price: "₹750 - ₹1,400", amenities: "Captain Onboard, Rest Stops" }
        ],
        privateBusHub: "Sindhi Camp Central Bus Stand & Narayan Singh Circle",
        budgetPerDay: {
            budget: { hotel: 900, food: 400, transport: 200, activities: 250, misc: 150 },
            moderate: { hotel: 2600, food: 1100, transport: 600, activities: 550, misc: 350 },
            luxury: { hotel: 8500, food: 3200, transport: 1800, activities: 1400, misc: 900 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "185,000+ Reviews",
            pros: [
                "Breathtaking palace architecture and majestic fort views (especially Amer, Nahargarh, and Jaigarh).",
                "Extremely budget-friendly public transport and delicious street delicacies (Pyaaz Kachori, Ghewar).",
                "Warm, hospitable locals and colorful shopping bazaars (Johari & Bapu Bazaar)."
            ],
            warnings: [
                "Bargain firmly when purchasing handicrafts or taking street auto-rickshaws without meter.",
                "Summers (May-June) can be intense with temperatures exceeding 42°C; winters are ideal."
            ],
            sampleReviews: [
                { author: "Aditi Sharma", rating: 5, date: "Visited 2 weeks ago", text: "The composite entry pass saved us so much time at Amer Fort and Hawa Mahal! Public AC bus 5 was super convenient." },
                { author: "Marcus Weber", rating: 5, date: "Visited 1 month ago", text: "Sunset at Nahargarh Fort was unforgettable. The local food trail around MI Road was incredible value." },
                { author: "Priya & Rohan", rating: 4, date: "Visited 3 weeks ago", text: "3 days was the perfect duration to cover the 15 milestones comfortably. Book private Volvo bus from Delhi for smooth travel." }
            ]
        },
        nextHops: [
            { name: "Pushkar & Ajmer", distance: "145 km (2.5 hrs)", cost: "₹450 via Volvo Bus", reason: "Sacred Lake, Brahma Temple & Desert Camel Safari" },
            { name: "Udaipur (City of Lakes)", distance: "390 km (6 hrs)", cost: "₹850 via AC Sleeper Bus", reason: "Romantic Lake Pichola, Jag Mandir & Grand Palaces" },
            { name: "Agra (Taj Mahal Link)", distance: "240 km (4 hrs)", cost: "₹500 via Express Highway Bus", reason: "Complete the Golden Triangle with the Wonder of the World" }
        ]
    },

    "Paris, France": {
        name: "Paris",
        fullName: "Paris, France",
        countryBadge: "France 🇫🇷",
        subtitle: "The City of Light, celebrated for world-class art, culinary mastery, iconic boulevards, and romantic monuments.",
        bestSeason: "Apr - Oct (Spring & Autumn)",
        safetyScore: "9.1/10 High Tourist Police",
        weather: { temp: "19°C", condition: "Breezy & Mild", icon: "fa-cloud-sun" },
        coords: [48.8566, 2.3522],
        milestones: parisMilestones,
        publicBuses: [
            { line: "RATP Bus 72", from: "Eiffel Tower", to: "Louvre Museum (Riverside Scenic Route)", freq: "Every 7 mins", fare: "€2.15 (₹190)", type: "Electric Low-Emission City Bus" },
            { line: "RATP Bus 42", from: "Gare du Nord", to: "Champs-Élysées & Eiffel Tower", freq: "Every 8 mins", fare: "€2.15 (₹190)", type: "Standard Transit" },
            { line: "Noctilien Night Bus", from: "Châtelet Hub", to: "All Paris Suburbs (00:30 - 05:30)", freq: "Every 15 mins", fare: "€2.15 (₹190)", type: "Night Bus" }
        ],
        privateBuses: [
            { operator: "FlixBus Europe Express", route: "Paris (Bercy Seine) to Brussels / Amsterdam / London", rating: "4.5 ★", price: "€15 - €35 (₹1,300 - ₹3,100)", amenities: "Free WiFi, Power Sockets, Luggage Included" },
            { operator: "BlaBlaCar Bus Intercity", route: "Direct Routes across France & Germany", rating: "4.4 ★", price: "€12 - €30 (₹1,100 - ₹2,700)", amenities: "Reclining Seats, Live GPS" },
            { operator: "Big Bus Tours Paris (Hop-On Hop-Off)", route: "Complete Tourist Landmark Circuit", rating: "4.6 ★", price: "€38 / day (₹3,400)", amenities: "Audio Guide in 11 languages, Open Top Roof" }
        ],
        privateBusHub: "Paris Bercy-Seine Bus Station & Gallieni Terminal",
        budgetPerDay: {
            budget: { hotel: 3200, food: 1800, transport: 600, activities: 1200, misc: 600 },
            moderate: { hotel: 9500, food: 4200, transport: 1200, activities: 2800, misc: 1500 },
            luxury: { hotel: 28000, food: 11000, transport: 4500, activities: 6500, misc: 4000 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "420,000+ Reviews",
            pros: [
                "Unmatched walking culture, gorgeous architecture at every corner, and world-class museums.",
                "Extremely fast and interconnected Metro and Bus system (Navigo Easy card makes it seamless).",
                "Incredible bakeries (boulangeries) with fresh croissants under €1.50."
            ],
            warnings: [
                "Watch out for pickpockets around high-density areas (Eiffel Tower, Louvre, Metro line 1).",
                "Pre-booking museum slots is strictly mandatory for the Louvre and Eiffel Tower."
            ],
            sampleReviews: [
                { author: "Emily Jenkins", rating: 5, date: "Visited last month", text: "Using the RATP Bus 72 was better than any expensive river cruise! The views of the Seine are gorgeous." },
                { author: "Carlos Gomez", rating: 5, date: "Visited 3 weeks ago", text: "Montmartre and Sainte-Chapelle at twilight were pure magic. Make sure to download Citymapper for easy transit transfers." },
                { author: "Sophie Chen", rating: 4, date: "Visited 2 months ago", text: "The 15 milestone route covered everything we dreamed of. Buy a carnet of metro tickets to save budget." }
            ]
        },
        nextHops: [
            { name: "Palace of Versailles", distance: "22 km (45 mins)", cost: "€4.15 via RER C Train", reason: "Sun King's Hall of Mirrors & Grand Fountains" },
            { name: "Mont Saint-Michel, Normandy", distance: "360 km (3.5 hrs)", cost: "€25 via FlixBus", reason: "Tidal Island Abbey Rising from the Atlantic Ocean" },
            { name: "Brussels, Belgium", distance: "310 km (1.5 hrs TGV / 4 hrs Bus)", cost: "€19 via BlaBlaCar Bus", reason: "Grand Place, Belgian Chocolates & Historic Architecture" }
        ]
    },

    "Tokyo, Japan": {
        name: "Tokyo",
        fullName: "Tokyo, Japan",
        countryBadge: "Japan 🇯🇵",
        subtitle: "Hyper-futuristic neon megalopolis blending ancient Shinto shrines, culinary perfection, and ultra-punctual transit.",
        bestSeason: "Mar - May (Cherry Blossoms) & Sep - Nov (Autumn)",
        safetyScore: "9.9/10 Safest Global City",
        weather: { temp: "21°C", condition: "Clear & Crisp", icon: "fa-sun" },
        coords: [35.6762, 139.6503],
        milestones: tokyoMilestones,
        publicBuses: [
            { line: "Toei Bus Route To-01", from: "Shibuya Station", to: "Roppongi & Shimbashi", freq: "Every 4 mins", fare: "¥210 (₹115)", type: "Clean Low-Emission City Bus" },
            { line: "Tokyo BRT (Bus Rapid Transit)", from: "Toranomon Hills", to: "Toyosu & Tokyo Waterfront", freq: "Every 6 mins", fare: "¥220 (₹120)", type: "Rapid Dedicated Transit" },
            { line: "Hachiko Community Bus", from: "Shibuya Ward", to: "Harajuku / Omotesando Loop", freq: "Every 12 mins", fare: "¥100 (₹55)", type: "Local Mini Bus" }
        ],
        privateBuses: [
            { operator: "Willer Express Highway Bus", route: "Tokyo to Kyoto / Osaka / Mount Fuji", rating: "4.8 ★", price: "¥3,500 - ¥8,000 (₹1,900 - ₹4,400)", amenities: "Individual canopy seats, USB ports, Quiet sleep zones" },
            { operator: "Airport Limousine Bus", route: "Narita / Haneda Direct to Major Tokyo Hotels", rating: "4.9 ★", price: "¥1,300 - ¥3,200 (₹700 - ₹1,750)", amenities: "Luggage handling, Direct door-to-door drop" },
            { operator: "Keio Highway Bus", route: "Shinjuku Expressway Bus Terminal to Hakone & Kawaguchiko", rating: "4.7 ★", price: "¥2,000 (₹1,100)", amenities: "Panoramic Fuji Views" }
        ],
        privateBusHub: "Busta Shinjuku (Shinjuku Expressway Bus Terminal)",
        budgetPerDay: {
            budget: { hotel: 2800, food: 1400, transport: 500, activities: 800, misc: 400 },
            moderate: { hotel: 7800, food: 3400, transport: 1000, activities: 2200, misc: 1100 },
            luxury: { hotel: 24000, food: 9500, transport: 3500, activities: 5500, misc: 3500 }
        },
        reviewsSummary: {
            aggregate: 4.9,
            totalCount: "510,000+ Reviews",
            pros: [
                "Unbeatable cleanliness, pin-point accurate train and bus schedules, and legendary safety.",
                "Exceptional convenience store food (7-Eleven, Lawson, FamilyMart) offering gourmet meals for under $4.",
                "Incredible contrast between hyper-modern skyscrapers and deeply peaceful ancient gardens."
            ],
            warnings: [
                "Get a digital Suica or Pasmo IC card on Apple Wallet / Google Wallet for instant tap-and-go travel.",
                "Tokyo subway stations are vast; look out for specific exit numbers on Google Maps."
            ],
            sampleReviews: [
                { author: "Kenji Takahashi", rating: 5, date: "Visited 1 week ago", text: "Navigating with Google Maps transit is so easy here. The 15 stops covered all iconic spots across Tokyo seamlessly." },
                { author: "Elena Rostova", rating: 5, date: "Visited 3 weeks ago", text: "Shibuya Sky and TeamLab Planets at night look straight out of Blade Runner. TeamLab was worth every single penny." },
                { author: "David Miller", rating: 5, date: "Visited last month", text: "As a solo traveler, Tokyo is the most comfortable and safest city I have ever experienced. Will return!" }
            ]
        },
        nextHops: [
            { name: "Mount Fuji & Lake Kawaguchiko", distance: "100 km (1.5 hrs)", cost: "¥2,000 via Keio Highway Bus", reason: "Iconic Mount Fuji Views, Hot Spring Onsens & Ropeway" },
            { name: "Hakone Onsen Village", distance: "85 km (1.2 hrs)", cost: "¥2,400 via Odakyu Romancecar", reason: "Traditional Ryokans, Volcanic Lake Ashi & Pirate Ship" },
            { name: "Kyoto (Ancient Capital)", distance: "450 km (2.1 hrs Shinkansen / 7 hrs Bus)", cost: "¥3,800 via Night Bus", reason: "Fushimi Inari 10,000 Torii Gates & Golden Pavilion" }
        ]
    },

    "Dubai, United Arab Emirates": {
        name: "Dubai",
        fullName: "Dubai, United Arab Emirates",
        countryBadge: "UAE 🇦🇪",
        subtitle: "The futuristic desert metropolis of record-breaking architectural marvels, luxury shopping, and golden sand safaris.",
        bestSeason: "Nov - Mar (Pleasant Winter Days)",
        safetyScore: "9.8/10 Ultra Safe",
        weather: { temp: "27°C", condition: "Warm & Sunny", icon: "fa-sun" },
        coords: [25.2048, 55.2708],
        milestones: dubaiMilestones,
        publicBuses: [
            { line: "RTA Bus Route 8", from: "Gold Souk Bus Station", to: "Dubai Marina & Ibn Battuta", freq: "Every 10 mins", fare: "AED 5 - 7.5 (₹110 - ₹170)", type: "Air Conditioned City Bus" },
            { line: "RTA Bus Route 27", from: "Deira Gold Souk", to: "The Dubai Mall", freq: "Every 12 mins", fare: "AED 5 (₹110)", type: "Double Decker Tourist Bus" },
            { line: "RTA Intercity Bus E100", from: "Al Ghubaiba Bus Station", to: "Abu Dhabi Central Bus Station", freq: "Every 15 mins", fare: "AED 25 (₹550)", type: "Express Intercity Coach" }
        ],
        privateBuses: [
            { operator: "Big Bus Tours Dubai", route: "Hop-on Hop-off Red & Blue City Route", rating: "4.7 ★", price: "AED 220 (₹4,900)", amenities: "Open-top views, Multilingual commentary, Dhow cruise included" },
            { operator: "City Sightseeing Dubai", route: "Panoramic 24h & 48h Tours", rating: "4.6 ★", price: "AED 195 (₹4,300)", amenities: "Air-conditioned lower deck, Audio guide" },
            { operator: "Emirates Express Luxury Shuttles", route: "Dubai to Ras Al Khaimah & Fujairah", rating: "4.8 ★", price: "AED 40 (₹900)", amenities: "Comfortable leather seats, Fast transit" }
        ],
        privateBusHub: "Al Ghubaiba Bus Station & Union Metro Bus Hub",
        budgetPerDay: {
            budget: { hotel: 3500, food: 1500, transport: 600, activities: 1400, misc: 800 },
            moderate: { hotel: 8900, food: 3800, transport: 1500, activities: 3500, misc: 1600 },
            luxury: { hotel: 26000, food: 10500, transport: 4000, activities: 8000, misc: 4500 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "390,000+ Reviews",
            pros: [
                "World-class infrastructure, air-conditioned bus stops and stations everywhere.",
                "Jaw-dropping modern architecture and clean golden beaches.",
                "Incredible diversity of international food from street shawarma to Michelin dining."
            ],
            warnings: [
                "Buy a Silver Nol Card at any metro station for 25 AED for instant public bus and metro access.",
                "Alcohol is only served in licensed hotels/restaurants; respect local cultural laws in public places."
            ],
            sampleReviews: [
                { author: "Tariq Mansoor", rating: 5, date: "Visited 2 weeks ago", text: "The RTA metro and bus network is so futuristic. You can reach all 15 attractions for just a few AED with the Nol card." },
                { author: "Sarah O'Connor", rating: 5, date: "Visited last month", text: "The Dubai Fountain and Burj Khalifa at night took our breath away. Desert safari was the highlight of our trip!" },
                { author: "Vikram Mehta", rating: 5, date: "Visited 3 weeks ago", text: "Super safe for families with kids. The 1 AED abra boat in old Dubai was a wonderful authentic touch." }
            ]
        },
        nextHops: [
            { name: "Abu Dhabi & Sheikh Zayed Grand Mosque", distance: "130 km (1.5 hrs)", cost: "AED 25 via RTA E100 Bus", reason: "Grand White Marble Mosque & Louvre Abu Dhabi Museum" },
            { name: "Sharjah Heritage & Art Museums", distance: "25 km (35 mins)", cost: "AED 10 via E303 Bus", reason: "UNESCO Cultural Capital of the Arab World" },
            { name: "Ras Al Khaimah & Jebel Jais Zipline", distance: "110 km (1.2 hrs)", cost: "AED 35 via Shuttle Bus", reason: "World's Longest Mountain Zipline & Desert Mountains" }
        ]
    },

    "Bengaluru, Karnataka, India": {
        name: "Bengaluru",
        fullName: "Bengaluru, Karnataka, India",
        countryBadge: "Karnataka, India 🇮🇳",
        subtitle: "The vibrant Garden City & Silicon Valley of India, famed for royal Tudor palaces, sprawling botanical gardens, craft brew pubs, and pleasant weather year-round.",
        bestSeason: "Sep - Mar (Breezy & Pleasant)",
        safetyScore: "9.5/10 High Tourist Security",
        weather: { temp: "24°C", condition: "Pleasant & Breezy", icon: "fa-cloud-sun" },
        coords: [12.9716, 77.5946],
        milestones: bengaluruMilestones,
        publicBuses: [
            { line: "BMTC Vayu Vajra KIA-8", from: "Kempegowda Int'l Airport (BLR)", to: "Electronic City via Silk Board", freq: "Every 15 mins (24x7)", fare: "₹240 - ₹310", type: "Volvo Low-Floor AC Super Coach" },
            { line: "BMTC Route 500-D", from: "Central Silk Board", to: "Hebbal Bus Stand via Outer Ring Road", freq: "Every 5 mins", fare: "₹20 - ₹45", type: "Vajra AC Express" },
            { line: "BMTC Route 335-E", from: "Kempegowda Bus Station (Majestic)", to: "ITPL / Whitefield", freq: "Every 10 mins", fare: "₹30 - ₹50", type: "Air Conditioned City Transit" }
        ],
        privateBuses: [
            { operator: "KSRTC Airavat Club Class Multi-Axle", route: "Bengaluru to Mysore / Ooty / Coorg / Goa", rating: "4.8 ★", price: "₹450 - ₹1,400", amenities: "Reclining Leather Seats, Live Tracking, Water" },
            { operator: "IntrCity SmartBus Bangalore Connect", route: "Bangalore to Hyderabad / Chennai / Kochi", rating: "4.7 ★", price: "₹850 - ₹1,800", amenities: "Smart Lounge, Captain Onboard, Blankets" },
            { operator: "SRS Travels Super Luxury AC Sleeper", route: "Interstate Express (Mumbai / Pune / Kerala)", rating: "4.6 ★", price: "₹750 - ₹1,600", amenities: "Clean Linens, USB Chargers" }
        ],
        privateBusHub: "Kempegowda Bus Station (Majestic) & Madiwala Private Bus Hub",
        budgetPerDay: {
            budget: { hotel: 1000, food: 500, transport: 250, activities: 300, misc: 150 },
            moderate: { hotel: 3200, food: 1300, transport: 700, activities: 700, misc: 400 },
            luxury: { hotel: 9800, food: 3800, transport: 2000, activities: 2000, misc: 1100 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "320,000+ Reviews",
            pros: [
                "Unbeatable pleasant climate throughout the year, with lush green parks and clean open air.",
                "Incredible microbrewery and culinary culture (world-class dosas at Vidyarthi Bhavan and CTR).",
                "World-class tech infrastructure, high safety index, and hyper-connected Namma Metro & BMTC AC buses."
            ],
            warnings: [
                "Peak traffic on Silk Board and Outer Ring Road can be slow during rush hours; use Namma Metro or Vayu Vajra buses.",
                "Weather can change quickly with breezy evening showers; carry a light windcheater."
            ],
            sampleReviews: [
                { author: "Karthik N.", rating: 5, date: "Visited 1 week ago", text: "The Lalbagh morning walk followed by CTR butter masala dosa was pure perfection! Namma Metro made getting around effortless." },
                { author: "Sarah Jenkins", rating: 5, date: "Visited 3 weeks ago", text: "Bangalore Palace, NGMA, and Cubbon Park were stunning. Loved the microbrewery culture in Indiranagar and Koramangala." },
                { author: "Vikas Reddy", rating: 5, date: "Visited last month", text: "BMTC KIA-8 bus from airport was super smooth, fast, and cost effective. Best city for a complete vacation." }
            ]
        },
        nextHops: [
            { name: "Mysuru (Mysore Palace Link)", distance: "145 km (2 hrs)", cost: "₹185 via KSRTC Non-Stop Flybus", reason: "Grand Mysore Palace, Chamundi Hills & Brindavan Gardens" },
            { name: "Coorg (Scotland of India)", distance: "250 km (5 hrs)", cost: "₹450 via KSRTC Club Class", reason: "Coffee Plantations, Abbey Falls & Raja's Seat Sunset" },
            { name: "Nandi Hills & Fort", distance: "60 km (1.2 hrs)", cost: "₹95 via BMTC / KSRTC Bus", reason: "Spectacular Sunrise Cloud-bed Views & Ancient Tipu Fort" }
        ]
    },

    "Goa, India": {
        name: "Goa",
        fullName: "Goa, India",
        countryBadge: "Goa, India 🇮🇳",
        subtitle: "Tropical coastal paradise of sun-kissed golden beaches, historic Portuguese churches, vibrant flea markets, and coastal seafood.",
        bestSeason: "Nov - Feb (Sun & Beach Season)",
        safetyScore: "9.3/10 Highly Safe",
        weather: { temp: "30°C", condition: "Tropical & Sunny", icon: "fa-sun" },
        coords: [15.2993, 74.1240],
        milestones: goaMilestones,
        publicBuses: [
            { line: "Kadamba AC Airport Shuttle", from: "MOPA / Dabolim Airport", to: "Panaji & Calangute Hub", freq: "Every 30 mins", fare: "₹150 - ₹250", type: "Low-Floor AC Coach" },
            { line: "Panaji - Margao Express", from: "Panaji Central Bus Stand", to: "Margao KTC Hub", freq: "Every 10 mins", fare: "₹45", type: "Intercity State Express" },
            { line: "North Goa Coastal Route", from: "Panaji", to: "Candolim - Calangute - Baga", freq: "Every 15 mins", fare: "₹20 - ₹35", type: "Regular City Bus" }
        ],
        privateBuses: [
            { operator: "Paulo Travels Luxury Volvo", route: "Goa to Mumbai / Pune / Bengaluru", rating: "4.6 ★", price: "₹800 - ₹1,800", amenities: "AC Sleeper, Charging, Blankets" },
            { operator: "IntrCity SmartBus Goa Connect", route: "Margao/Panaji to Bangalore & Hyderabad", rating: "4.7 ★", price: "₹950 - ₹2,100", amenities: "Smart Lounge, Tracking" },
            { operator: "Goa Tourism (GTDC) Hop-on Hop-off", route: "Full North & South Goa Sightseeing", rating: "4.5 ★", price: "₹400 / day", amenities: "Open Roof Sightseeing Bus" }
        ],
        privateBusHub: "Panaji KTC Bus Stand & Margao KTC Bus Terminal",
        budgetPerDay: {
            budget: { hotel: 900, food: 600, transport: 350, activities: 400, misc: 200 },
            moderate: { hotel: 2800, food: 1300, transport: 700, activities: 900, misc: 450 },
            luxury: { hotel: 9200, food: 3600, transport: 2000, activities: 2500, misc: 1200 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "280,000+ Reviews",
            pros: [
                "Unbeatable beach vibe, delicious seafood curries (Goan Fish Curry & Prawn Balchão), and stunning sunsets.",
                "Renting a two-wheeler (scooter) is super affordable and the best way to explore backroads.",
                "Warm local culture and rich Indo-Portuguese heritage."
            ],
            warnings: [
                "Always wear a helmet when driving rented two-wheelers to avoid police fines.",
                "Beach taxis can be expensive; negotiate or use GoaMiles / Kadamba buses."
            ],
            sampleReviews: [
                { author: "Rohan Kapoor", rating: 5, date: "Visited 2 weeks ago", text: "Renting an Activa for ₹350/day gave us total freedom! The 15-stop itinerary covered all top forts and beaches." },
                { author: "Chloe Bennett", rating: 5, date: "Visited 1 month ago", text: "The Old Goa churches and sunset at Chapora Fort felt magical. Amazing fresh seafood everywhere!" },
                { author: "Aman Deep", rating: 4, date: "Visited 3 weeks ago", text: "Clean beaches and great music. Kadamba AC airport shuttle saved us over ₹1500 compared to private taxis." }
            ]
        },
        nextHops: [
            { name: "Gokarna, Karnataka", distance: "140 km (3 hrs)", cost: "₹250 via Bus", reason: "Om Beach, Kudle Beach & Serene Temple Town" },
            { name: "Dandeli Wildlife & River Rafting", distance: "125 km (3 hrs)", cost: "₹300 via State Bus", reason: "Kali River White Water Rafting & Jungle Treehouses" },
            { name: "Hampi UNESCO Ruins", distance: "310 km (6 hrs)", cost: "₹650 via AC Sleeper Bus", reason: "Vijayanagara Ancient Empire, Boulder Landscapes & Lotus Mahal" }
        ]
    },

    "Manali, Himachal Pradesh, India": {
        name: "Manali",
        fullName: "Manali, Himachal Pradesh, India",
        countryBadge: "Himachal, India 🇮🇳",
        subtitle: "Majestic Himalayan resort town crowned by snow-capped peaks, pine forests, hot springs, and adventure sports.",
        bestSeason: "Oct - Feb (Snow) & Mar - Jun (Pleasant Summer)",
        safetyScore: "9.5/10 Very Safe",
        weather: { temp: "14°C", condition: "Crisp Himalayan Air", icon: "fa-snowflake" },
        coords: [32.2396, 77.1887],
        milestones: manaliMilestones,
        publicBuses: [
            { line: "HRTC Electric Bus to Solang", from: "Manali Mall Road Bus Stand", to: "Solang Valley", freq: "Every 30 mins", fare: "₹40", type: "Eco-Friendly Electric Bus" },
            { line: "HRTC Lahaul Express", from: "Manali Bus Stand", to: "Sissu / Keylong via Atal Tunnel", freq: "Every 45 mins", fare: "₹65 - ₹110", type: "Himalayan Express" },
            { line: "Naggar Castle Tourist Bus", from: "Manali Private Bus Stand", to: "Naggar Art Gallery & Castle", freq: "Every 1 hour", fare: "₹35", type: "Local Mountain Shuttle" }
        ],
        privateBuses: [
            { operator: "Zingbus Luxury AC Volvo", route: "Delhi (Majnu Ka Tilla / Kashmiri Gate) to Manali", rating: "4.8 ★", price: "₹900 - ₹1,700", amenities: "Pushback Seats, USB, Water, Live GPS" },
            { operator: "HPTDC Volvo Super Luxury", route: "Delhi / Chandigarh to Manali Direct", rating: "4.7 ★", price: "₹1,200 - ₹1,800", amenities: "Himachal Tourism Official Volvo" },
            { operator: "Laxmi Holidays Multi-Axle", route: "Delhi / Ambala / Manali Overnight", rating: "4.6 ★", price: "₹850 - ₹1,600", amenities: "AC Sleeper, Clean Blankets" }
        ],
        privateBusHub: "Manali Private Bus Stand & Mall Road HRTC Terminal",
        budgetPerDay: {
            budget: { hotel: 800, food: 450, transport: 200, activities: 350, misc: 150 },
            moderate: { hotel: 2400, food: 1000, transport: 600, activities: 800, misc: 350 },
            luxury: { hotel: 7800, food: 2800, transport: 1800, activities: 2000, misc: 800 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "190,000+ Reviews",
            pros: [
                "Breathtaking snow peak panoramas and exhilarating Atal Tunnel drive.",
                "Cozy cafes in Old Manali with incredible trout fish and international cuisines.",
                "HRTC electric buses make local sightseeing very cost-effective."
            ],
            warnings: [
                "Carry warm thermals and gloves even in spring/autumn as temperatures drop sharply at night.",
                "Book Atal Tunnel / Rohtang private cabs in advance during peak snow weekends."
            ],
            sampleReviews: [
                { author: "Kavita S.", rating: 5, date: "Visited 1 week ago", text: "The drive through Atal Tunnel to Sissu was like entering another universe! Sissu waterfall was stunning." },
                { author: "Daniel Wright", rating: 5, date: "Visited 3 weeks ago", text: "Old Manali has such a peaceful mountain vibe. Had the best apple crumble at Cafe 1947." },
                { author: "Abhishek Joshi", rating: 5, date: "Visited last month", text: "Zingbus Volvo from Delhi dropped us right on time. Paragliding at Solang was well managed and safe." }
            ]
        },
        nextHops: [
            { name: "Kasol & Parvati Valley", distance: "75 km (2.5 hrs)", cost: "₹120 via HRTC Bus", reason: "Manikaran Hot Springs, Chalal Pine Trails & Kheerganga Trek" },
            { name: "Dharamshala & McLeodganj", distance: "215 km (6.5 hrs)", cost: "₹450 via Volvo Bus", reason: "Dalai Lama Temple, Tibetan Monasteries & Triund Ridge" },
            { name: "Shimla (Queen of Hills)", distance: "245 km (7 hrs)", cost: "₹480 via AC Bus", reason: "The Ridge, Mall Road, Jakhoo Temple & Kalka Toy Train" }
        ]
    },

    "Bali, Indonesia": {
        name: "Bali",
        fullName: "Bali, Indonesia",
        countryBadge: "Indonesia 🇮🇩",
        subtitle: "The Island of the Gods, celebrated for emerald rice terraces, sacred sea temples, volcanic sunrises, and world-class surfing.",
        bestSeason: "Apr - Oct (Dry & Sunny Season)",
        safetyScore: "9.4/10 High Tourist Security",
        weather: { temp: "29°C", condition: "Tropical & Warm", icon: "fa-sun" },
        coords: [-8.4095, 115.1889],
        milestones: baliMilestones,
        publicBuses: [
            { line: "Trans Sarbagita Bus Route", from: "Denpasar Hub", to: "Nusa Dua / Jimbaran", freq: "Every 15 mins", fare: "3,500 IDR (₹20)", type: "Air Conditioned City Bus" },
            { line: "Kura-Kura Tourist Shuttle", from: "Kuta / Seminyak", to: "Ubud Cultural Center", freq: "Every 1 hour", fare: "50,000 IDR (₹270)", type: "Tourist Coach with WiFi" },
            { line: "Teman Bus Line 2", from: "Ngurah Rai Airport", to: "Terminal Ubung", freq: "Every 20 mins", fare: "4,400 IDR (₹25)", type: "Public Modern Transit" }
        ],
        privateBuses: [
            { operator: "Perama Tour Intercity Minivan", route: "Kuta / Ubud to Padangbai / Lovina / Amed", rating: "4.6 ★", price: "75,000 - 150,000 IDR (₹400 - ₹800)", amenities: "AC, Luggage Storage" },
            { operator: "Bali Fast Boat & Bus Connect", route: "Bali to Nusa Penida & Gili Islands", rating: "4.8 ★", price: "200,000 IDR (₹1,100)", amenities: "Speedboat + Hotel Van Transfer" },
            { operator: "Private Chauffeur Tour Van (All Day)", route: "10-Hour Custom Island Circuit", rating: "4.9 ★", price: "600,000 IDR (₹3,200/day)", amenities: "Private AC MPV, English Guide, Fuel Included" }
        ],
        privateBusHub: "Perama Ubud Bus Office & Terminal Ubung Denpasar",
        budgetPerDay: {
            budget: { hotel: 1100, food: 550, transport: 300, activities: 500, misc: 250 },
            moderate: { hotel: 3400, food: 1400, transport: 800, activities: 1200, misc: 550 },
            luxury: { hotel: 12500, food: 4800, transport: 2200, activities: 3500, misc: 1500 }
        },
        reviewsSummary: {
            aggregate: 4.8,
            totalCount: "340,000+ Reviews",
            pros: [
                "Unbelievable natural beauty, lush rice terraces, and dramatic volcanic landscapes.",
                "Incredible value for money — private pool villas for under $50/night and delicious Nasi Goreng for $2.",
                "Deeply peaceful spiritual culture with daily floral offerings (Canang Sari) and welcoming locals."
            ],
            warnings: [
                "Traffic around Canggu and Seminyak can get congested during rush hours; scooters or Gojek bikes are fastest.",
                "Drink bottled or filtered water (avoid tap water to prevent Bali Belly)."
            ],
            sampleReviews: [
                { author: "Liam Patterson", rating: 5, date: "Visited 2 weeks ago", text: "The Mount Batur 4x4 Jeep sunrise tour was the absolute highlight. Floating breakfast in Ubud was dreamlike!" },
                { author: "Ayu Pratiwi", rating: 5, date: "Visited last month", text: "Kecak fire dance at Uluwatu overlooking the sunset gave me goosebumps. Must-see experience!" },
                { author: "Megan Fox", rating: 5, date: "Visited 3 weeks ago", text: "Renting a scooter gave us complete freedom to explore all 15 milestones around Munduk, Ubud, and Seminyak." }
            ]
        },
        nextHops: [
            { name: "Nusa Penida Island", distance: "35 mins via Fast Boat", cost: "175,000 IDR (₹950)", reason: "Kelingking T-Rex Beach & Angel's Billabong" },
            { name: "Gili Trawangan & Lombok", distance: "1.5 hrs via Speedboat", cost: "350,000 IDR (₹1,900)", reason: "Crystal Clear Snorkeling with Sea Turtles & No Motor Vehicles" },
            { name: "Komodo National Park", distance: "1 hr Flight to Labuan Bajo", cost: "₹4,500 via Flight", reason: "Real Komodo Dragons, Pink Beach & Padar Island" }
        ]
    }
};

// Now replace destinationDatabase definition in appJsContent
const destDbString = "const destinationDatabase = " + JSON.stringify(newDestDb, null, 4) + ";\n";

// Find where destinationDatabase begins and ends
const startIdx = appJsContent.indexOf("const destinationDatabase = {");
const endMarker = "/**\r\n * Built-In Global City & Destination Geocoding Dictionary";
let endIdx = appJsContent.indexOf("/**\n * Built-In Global City & Destination Geocoding Dictionary");
if (endIdx === -1) {
    endIdx = appJsContent.indexOf("/**\r\n * Built-In Global City & Destination Geocoding Dictionary");
}
if (endIdx === -1) {
    endIdx = appJsContent.indexOf("const GLOBAL_COORDINATES = {");
}

console.log("startIdx:", startIdx, "endIdx:", endIdx);

if (startIdx !== -1 && endIdx !== -1) {
    appJsContent = appJsContent.slice(0, startIdx) + destDbString + "\n" + appJsContent.slice(endIdx);
} else {
    console.error("Could not find destinationDatabase boundaries!");
    process.exit(1);
}

// Now replace generateDynamicDestinationData function body
const dynamicGenStartMarker = "function generateDynamicDestinationData(destinationQuery, geoInfo) {";
const dynamicGenStart = appJsContent.indexOf(dynamicGenStartMarker);
const dynamicGenEndMarker = "/**\n * Format currency with selected exchange rate";
let dynamicGenEnd = appJsContent.indexOf(dynamicGenEndMarker);
if (dynamicGenEnd === -1) {
    dynamicGenEnd = appJsContent.indexOf("/**\r\n * Format currency with selected exchange rate");
}
if (dynamicGenEnd === -1) {
    dynamicGenEnd = appJsContent.indexOf("function formatPrice(");
}

console.log("dynamicGenStart:", dynamicGenStart, "dynamicGenEnd:", dynamicGenEnd);

const newDynamicGenFunc = `function generateDynamicDestinationData(destinationQuery, geoInfo) {
    const cleanName = destinationQuery.trim();
    const citySimple = geoInfo?.name || cleanName.split(',')[0].trim();
    const centerCoords = geoInfo?.coords || [28.6139, 77.2090];
    const countryBadge = geoInfo?.country || "Verified Destination 🌍";

    const lat = centerCoords[0];
    const lng = centerCoords[1];

    // Generate 15 geographically distributed milestone coordinates around center
    const offsets = [
        [0.0, 0.0],
        [0.0085, 0.0115],
        [-0.0095, 0.0145],
        [0.0165, -0.0125],
        [-0.0140, -0.0160],
        [0.0210, 0.0080],
        [-0.0060, 0.0230],
        [0.0280, -0.0210],
        [-0.0220, 0.0090],
        [0.0120, -0.0260],
        [-0.0180, -0.0080],
        [0.0250, 0.0220],
        [-0.0290, 0.0250],
        [0.0050, 0.0310],
        [-0.0350, -0.0280]
    ];

    const landmarkTemplates = [
        { name: "Historic Landmark & Heritage City Center", cat: "Heritage & Cultural Hub", fee: { budget: 100, standard: 350, foreign: 600 }, time: "09:00 AM - 06:00 PM (Open Daily)", travel: "Starting Hub / Central Access Point", transit: "City Transit Bus / Metro / Cab", rating: 4.8, reviews: "52,000+", tip: "Arrive early before 10:00 AM to beat queues and capture the best photography lighting.", bus: "High - Major Central Bus Stop within 200m", desc: "The cultural and historical centerpiece of " + citySimple + ", featuring magnificent architecture and rich heritage." },
        { name: "Royal Palace & State Citadel", cat: "Royal Architecture & Courtyards", fee: { budget: 150, standard: 400, foreign: 800 }, time: "09:30 AM - 05:30 PM (Daily)", travel: "12 mins transit (2.1 km)", transit: "Public Bus / Eco-Shuttle", rating: 4.7, reviews: "44,000+", tip: "Audio guides provide fascinating stories of royal dynasty and historic state ceremonies.", bus: "Direct stop outside palace gates", desc: "Grand palace complex showcasing historic throne rooms, manicured royal courtyards, and museum galleries." },
        { name: "National Art & History Museum", cat: "Art, Sculpture & Artifacts", fee: { budget: 80, standard: 250, foreign: 500 }, time: "10:00 AM - 05:30 PM (Closed Mondays)", travel: "10 mins walk / transit (1.5 km)", transit: "Metro / Local Transit", rating: 4.7, reviews: "38,000+", tip: "Visit the permanent collection wing first for the most iconic historical masterpieces.", bus: "Museum loop bus connects every 10 mins", desc: "Extensive exhibition galleries showcasing national art, rare sculptures, and historical archaeological treasures." },
        { name: "Grand Cathedral / Sacred Temple Sanctuary", cat: "Sacred Spiritual Architecture", fee: { budget: 0, standard: 0, foreign: 0 }, time: "07:00 AM - 07:00 PM (Daily)", travel: "8 mins transit (1.2 km)", transit: "Walking / Shuttle", rating: 4.8, reviews: "61,000+", tip: "Dress respectfully and admire the soaring stained glass arches and peaceful sanctuary acoustics.", bus: "Direct bus drop on Sanctuary Avenue", desc: "Centuries-old iconic place of worship famous for intricate stone masonry, soaring towers, and spiritual reverence." },
        { name: "Old Town Heritage Bazaars & Market Square", cat: "Street Food, Crafts & Souvenirs", fee: { budget: 0, standard: 0, foreign: 0 }, time: "10:30 AM - 10:00 PM (Best in Evening)", travel: "15 mins transit (2.4 km)", transit: "Walking / Local Rickshaw / Cab", rating: 4.7, reviews: "68,000+", tip: "Bargain politely for handcrafted souvenirs and sample authentic signature street delicacies.", bus: "Central market bus terminal 300m away", desc: "Lively heritage marketplace bustling with artisanal craft stalls, aromatic spices, and traditional food stalls." },
        { name: "Botanical Gardens & Victorian Floral Pavilion", cat: "Botanical Sanctuary & Green Haven", fee: { budget: 50, standard: 150, foreign: 300 }, time: "06:30 AM - 06:30 PM (Daily)", travel: "15 mins drive (3.2 km)", transit: "Public City Bus Route", rating: 4.6, reviews: "34,000+", tip: "Take the shaded orchid garden path in the morning for serene nature walks and exotic birdwatching.", bus: "Botanical Gardens express bus stops hourly", desc: "Lush botanical retreat featuring centuries-old trees, greenhouse pavilions, and tranquil lotus ponds." },
        { name: "Scenic Waterfront / Riverfront Promenade", cat: "Lakeside / Seaside Walkway", fee: { budget: 0, standard: 0, foreign: 0 }, time: "Open 24/7 (Best at Twilight)", travel: "12 mins transit (2.0 km)", transit: "Promenade Walking / Tram", rating: 4.8, reviews: "72,000+", tip: "Rent a bicycle or enjoy an evening boat cruise to watch glowing reflections along the water.", bus: "Waterfront tram & bus line running every 8 mins", desc: "Vibrant pedestrian boardwalk lined with cafes, public art installations, and sweeping waterfront vistas." },
        { name: "Panoramic Summit Viewpoint & Skydeck", cat: "360-Degree City Skyline Overlook", fee: { budget: 100, standard: 300, foreign: 600 }, time: "06:00 AM - 09:30 PM (Sunset Peak)", travel: "20 mins scenic drive / cable car", transit: "Cable Car / Shuttle Cab", rating: 4.9, reviews: "85,000+", tip: "Arrive 45 mins before sunset for breathtaking golden hour views over the entire " + citySimple + " horizon.", bus: "Hilltop shuttle departs every 20 mins", desc: "Elevated high-altitude summit offering magnificent 360-degree vistas of the city and surrounding mountain ridges." },
        { name: "Modern Science, Tech & Interactive Discovery Center", cat: "Innovation & Planetarium Dome", fee: { budget: 120, standard: 300, foreign: 550 }, time: "09:30 AM - 06:00 PM (Daily)", travel: "15 mins transit (3.0 km)", transit: "Metro / Electric Bus", rating: 4.6, reviews: "29,000+", tip: "Book the full-dome 3D planetarium show for an unforgettable journey through space and earth science.", bus: "Innovation park transit station link", desc: "State-of-the-art interactive science museum packed with hands-on robotics, space simulators, and tech exhibits." },
        { name: "Heritage Artisan Quarter & Craft Guilds", cat: "Traditional Weaving, Pottery & Art", fee: { budget: 0, standard: 100, foreign: 200 }, time: "10:00 AM - 07:00 PM (Daily)", travel: "12 mins transit (1.8 km)", transit: "Walking / Local Shuttle", rating: 4.7, reviews: "24,000+", tip: "Watch master craftsmen at work and try a hands-on pottery or block-printing workshop.", bus: "Artisan village shuttle stop", desc: "Charming historic quarter dedicated to preserving traditional local craftsmanship, textiles, and ceramics." },
        { name: "Authentic Street Food Alley & Gourmet Trail", cat: "Culinary Hotspot & Food Stalls", fee: { budget: 150, standard: 400, foreign: 800 }, time: "12:00 PM - 11:30 PM (Vibrant Evenings)", travel: "10 mins transit (1.5 km)", transit: "Walking / Metro", rating: 4.8, reviews: "91,000+", tip: "Look for stalls with long local queues to taste the freshest regional pastries, kebabs, and desserts.", bus: "Direct bus drop on Food Street boulevard", desc: "Famous culinary lane lined with generational family kitchens serving signature dishes and local sweet delicacies." },
        { name: "Triumphal Arch & Memorial Gardens", cat: "Monumental Architecture & Park", fee: { budget: 0, standard: 100, foreign: 200 }, time: "Open 24/7 (Illuminated at Night)", travel: "14 mins transit (2.6 km)", transit: "Metro / City Bus", rating: 4.7, reviews: "46,000+", tip: "Visit after dark when the grand stone arches and fountains are bathed in dramatic architectural lighting.", bus: "Memorial Park bus station connects 6 lines", desc: "Imposing commemorative triumphal monument surrounded by manicured lawns and reflecting fountains." },
        { name: "Tranquil Lake & Ecological Nature Lagoon", cat: "Eco Park, Boating & Bird Sanctuary", fee: { budget: 30, standard: 80, foreign: 200 }, time: "06:00 AM - 07:00 PM (Daily)", travel: "18 mins transit (3.8 km)", transit: "Eco-Bus / Cab", rating: 4.6, reviews: "31,000+", tip: "Rent a pedal boat to explore the water channels and spot native migratory water birds.", bus: "Eco-Park direct bus shuttle", desc: "Scenic freshwater lake surrounded by walking trails, wooden observation decks, and tranquil nature." },
        { name: "Cultural Performing Arts & Night Plaza", cat: "Live Folk Performances & Nightlife", fee: { budget: 200, standard: 600, foreign: 1200 }, time: "05:00 PM - 11:00 PM (Shows at 7 PM)", travel: "15 mins transit (2.5 km)", transit: "City Transit / Cab", rating: 4.8, reviews: "53,000+", tip: "Arrive by 06:30 PM to get premier front-row seating for traditional acoustic music and dance performances.", bus: "Theater Square transit terminal", desc: "Atmospheric cultural venue celebrating regional folk music, dance dramas, and vibrant evening nightlife." },
        { name: "Highland Gateway / Scenic Countryside Overlook", cat: "Nature Reserve & Valley Vista", fee: { budget: 50, standard: 150, foreign: 300 }, time: "07:00 AM - 06:00 PM (Daylight)", travel: "25 mins scenic drive (7.5 km)", transit: "Scenic Coach / Private Cab", rating: 4.8, reviews: "37,000+", tip: "Pack a picnic and enjoy fresh crisp mountain air overlooking the valley meadows below.", bus: "Valley express bus runs hourly", desc: "Gateway to the pristine surrounding countryside, featuring pine forests, nature hiking trails, and panoramic valley views." }
    ];

    const milestones15 = landmarkTemplates.map((t, idx) => {
        const off = offsets[idx] || [0, 0];
        return {
            id: idx + 1,
            name: citySimple + " " + t.name,
            category: t.cat,
            coords: [lat + off[0], lng + off[1]],
            timings: t.time,
            entryFee: t.fee,
            travelTimeFromPrev: t.travel,
            transitMode: t.transit,
            googleRating: t.rating,
            reviewsCount: t.reviews,
            proTip: t.tip,
            busAvailability: t.bus,
            description: t.desc
        };
    });

    return {
        name: citySimple,
        fullName: cleanName,
        countryBadge: countryBadge,
        subtitle: \`Explore \${citySimple}'s premier 15 historic milestones, scenic viewpoints, authentic local markets, and seamless bus connections.\`,
        bestSeason: "Spring & Autumn Months (Pleasant Weather)",
        safetyScore: "9.2/10 Tourist Approved",
        weather: { temp: "24°C", condition: "Clear & Pleasant", icon: "fa-cloud-sun" },
        coords: centerCoords,
        milestones: milestones15,
        publicBuses: [
            { line: \`City Mainline Bus 101\`, from: "Central Railway / Air Terminal", to: \`\${citySimple} Heritage Core\`, freq: "Every 10 mins", fare: "₹20 - ₹50 ($0.50)", type: "Standard Transit Bus" },
            { line: "Metro / Tourist Line", from: "City Plaza", to: "All Major Attractions", freq: "Every 8 mins", fare: "₹30 - ₹60", type: "Air-Conditioned Express" },
            { line: "Night Express Shuttle", from: "City Center", to: "Outer Suburbs", freq: "Every 20 mins", fare: "₹40", type: "Night Service" }
        ],
        privateBuses: [
            { operator: "Intercity Premier Coach", route: \`Direct Express connecting \${citySimple} to neighbor cities\`, rating: "4.7 ★", price: "₹600 - ₹1,500 ($10 - $25)", amenities: "Reclining Seats, AC, Luggage Compartment" },
            { operator: "Regional Volvo SmartBus", route: "State Highways & Express Routes", rating: "4.6 ★", price: "₹500 - ₹1,100", amenities: "USB Chargers, Pushback, Water" },
            { operator: "Hop-On Hop-Off City Tour Bus", route: "Full Sightseeing Circuit", rating: "4.8 ★", price: "₹800 / Day ($12)", amenities: "Audio Guide & Panoramic Windows" }
        ],
        privateBusHub: \`\${citySimple} Central Intercity Bus Terminal & Railway Link\`,
        budgetPerDay: {
            budget: { hotel: 1200, food: 600, transport: 300, activities: 400, misc: 200 },
            moderate: { hotel: 3200, food: 1400, transport: 800, activities: 900, misc: 500 },
            luxury: { hotel: 9800, food: 4000, transport: 2200, activities: 2500, misc: 1200 }
        },
        reviewsSummary: {
            aggregate: 4.7,
            totalCount: "64,000+ Google Reviews",
            pros: [
                \`Rich authentic cultural heritage with warm, welcoming local hospitality in \${citySimple}.\`,
                "Well-connected public transit routes and affordable city bus coverage.",
                "Delicious regional cuisine and vibrant evening markets."
            ],
            warnings: [
                "Book popular museum entries online in advance during holiday seasons.",
                "Keep local currency small change ready for street transport and bus tickets."
            ],
            sampleReviews: [
                { author: "Michael B.", rating: 5, date: "Visited 3 weeks ago", text: \`Visiting \${citySimple} was one of the best decisions! The 15 milestone route was smooth and cost-effective.\` },
                { author: "Ananya Gupta", rating: 5, date: "Visited last month", text: "The city bus and metro made getting around effortlessly easy. The food in old town was divine!" },
                { author: "Lucas Santos", rating: 4, date: "Visited 2 months ago", text: "Great atmosphere and friendly people. The evening sunset viewpoint is an absolute must-see." }
            ]
        },
        nextHops: [
            { name: \`Scenic Mountain / Valley near \${citySimple}\`, distance: "85 km (1.5 hrs)", cost: "₹350 via Bus", reason: "Nature Escapes, Waterfall Hikes & Fresh Mountain Air" },
            { name: \`Historic Neighboring Capital\`, distance: "180 km (3 hrs)", cost: "₹550 via AC Coach", reason: "Complementary Heritage Sites & Ancient Fortresses" },
            { name: \`Culinary & Wine Countryside\`, distance: "120 km (2 hrs)", cost: "₹420 via Express Transit", reason: "Organic Farms, Vineyard Tasting & Village Stays" }
        ]
    };
}
`;

if (dynamicGenStart !== -1 && dynamicGenEnd !== -1) {
    appJsContent = appJsContent.slice(0, dynamicGenStart) + newDynamicGenFunc + "\n" + appJsContent.slice(dynamicGenEnd);
} else {
    console.error("Could not find dynamic generator boundaries!");
    process.exit(1);
}

fs.writeFileSync(appJsPath, appJsContent, 'utf8');
console.log("Successfully updated app.js!");
