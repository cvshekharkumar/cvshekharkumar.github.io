const fs = require('fs');
const path = require('path');

// Food Database per Destination
const foodDatabase = {
    "Jaipur, Rajasthan, India": [
        {
            dish: "Dal Baati Churma (Pure Ghee Royal Thali)",
            type: "veg",
            category: "Traditional Rajasthani Thali",
            price: "₹280 - ₹450",
            restaurant: "Laxmi Mishthan Bhandar (LMB)",
            rating: "4.7 ★ (36,000+ reviews)",
            address: "Johari Bazaar, Walled Pink City",
            distance: "350m from Hawa Mahal",
            specialty: "Legendary 1727 royal recipe with 5 types of churma and unlimited ghee dal.",
            mapsQuery: "Laxmi Mishthan Bhandar Johari Bazaar Jaipur"
        },
        {
            dish: "Crispy Pyaaz Kachori & Mawa Kachori",
            type: "veg",
            category: "Iconic Street Snack & Sweets",
            price: "₹45 - ₹80",
            restaurant: "Rawat Mishtan Bhandar",
            rating: "4.8 ★ (58,000+ reviews)",
            address: "Station Road, Sindhi Camp",
            distance: "800m from Central Bus Stand",
            specialty: "World-famous giant onion kachoris fried fresh every 5 minutes in pure desi ghee.",
            mapsQuery: "Rawat Mishtan Bhandar Station Road Jaipur"
        },
        {
            dish: "Traditional Rajasthani Laal Maas (Spicy Mutton Curry)",
            type: "nonveg",
            category: "Royal Heritage Non-Veg",
            price: "₹550 - ₹850",
            restaurant: "Handi Restaurant",
            rating: "4.7 ★ (28,000+ reviews)",
            address: "MI Road, Opposite GPO",
            distance: "1.2 km from Albert Hall Museum",
            specialty: "Slow-cooked tender mutton in Mathania red chillies and smoked mustard oil.",
            mapsQuery: "Handi Restaurant MI Road Jaipur"
        },
        {
            dish: "Junglee Maas & Royal Kebabs",
            type: "nonveg",
            category: "Hunting Royal Cuisine",
            price: "₹650 - ₹1,100",
            restaurant: "1135 AD Amer",
            rating: "4.8 ★ (14,000+ reviews)",
            address: "Amer Fort, Amer",
            distance: "Inside Amer Fort Complex",
            specialty: "Dine like a Maharaja inside fort ramparts with silver cutlery and live sitar music.",
            mapsQuery: "1135 AD Amer Fort Jaipur"
        },
        {
            dish: "Keema Baati & Chicken Korma",
            type: "nonveg",
            category: "Mughlai & Rajput Non-Veg",
            price: "₹380 - ₹620",
            restaurant: "Spice Court",
            rating: "4.6 ★ (19,000+ reviews)",
            address: "Jacob Road, Civil Lines",
            distance: "3 km from City Palace",
            specialty: "Spicy minced mutton-stuffed baatis served with rich spicy gravy in courtyard dining.",
            mapsQuery: "Spice Court Civil Lines Jaipur"
        },
        {
            dish: "Ghewar & Malpua with Rabri",
            type: "veg",
            category: "Signature Rajasthani Dessert",
            price: "₹120 - ₹250",
            restaurant: "Kanha Sweets & Restaurant",
            rating: "4.7 ★ (42,000+ reviews)",
            address: "Tonk Road & C-Scheme",
            distance: "1.5 km from Birla Mandir",
            specialty: "Crisp honeycomb disc soaked in saffron syrup topped with thick pistachio rabri.",
            mapsQuery: "Kanha Sweets Tonk Road Jaipur"
        },
        {
            dish: "Organic Vegan Thali & Fresh Smoothie Bowls",
            type: "vegan",
            category: "Plant-Based & Healthy Cafe",
            price: "₹250 - ₹450",
            restaurant: "Anokhi Cafe & Boutique",
            rating: "4.7 ★ (8,500+ reviews)",
            address: "KK Square, C-Scheme",
            distance: "2.5 km from City Center",
            specialty: "Farm-to-table organic salads, sourdough sandwiches, and dairy-free juices.",
            mapsQuery: "Anokhi Cafe C Scheme Jaipur"
        },
        {
            dish: "Gulab Ji Masala Chai & Maska Bun",
            type: "streetfood",
            category: "Famous Street Breakfast",
            price: "₹30 - ₹70",
            restaurant: "Gulab Ji Chai Wale",
            rating: "4.8 ★ (22,000+ reviews)",
            address: "Ganpati Plaza, MI Road",
            distance: "900m from Albert Hall",
            specialty: "Brewed for over 70 years with special secret spices and bun maska.",
            mapsQuery: "Gulab Ji Chai Wale MI Road Jaipur"
        }
    ],

    "Paris, France": [
        {
            dish: "Steak Frites with Famous Secret Herb Sauce",
            type: "nonveg",
            category: "Classic French Bistro",
            price: "€28 - €35 (₹2,500 - ₹3,100)",
            restaurant: "Le Relais de l'Entrecôte",
            rating: "4.6 ★ (24,000+ reviews)",
            address: "Boulevard du Montparnasse / Saint-Germain",
            distance: "600m from Jardin du Luxembourg",
            specialty: "Legendary unlimited French fries and tender sirloin steak in butter herb sauce.",
            mapsQuery: "Le Relais de l'Entrecôte Paris"
        },
        {
            dish: "Fresh Butter Croissant & Pain au Chocolat",
            type: "veg",
            category: "Artisanal French Bakery",
            price: "€1.60 - €3.50 (₹145 - ₹310)",
            restaurant: "Du Pain et des Idées",
            rating: "4.8 ★ (18,000+ reviews)",
            address: "34 Rue Yves Toudic, Canal Saint-Martin",
            distance: "1.1 km from Centre Pompidou",
            specialty: "Ranked Paris's best boulangerie for flaky Escargot pistachio pastries and sourdough.",
            mapsQuery: "Du Pain et des Idées Paris"
        },
        {
            dish: "Duck Confit (Confit de Canard) & Truffle Mash",
            type: "nonveg",
            category: "Traditional French Gourmet",
            price: "€22 - €32 (₹1,950 - ₹2,850)",
            restaurant: "Chez Janou (Le Marais)",
            rating: "4.7 ★ (16,000+ reviews)",
            address: "2 Rue Roger Verlomme, Le Marais",
            distance: "800m from Place des Vosges",
            specialty: "Crispy duck leg slow-cooked in duck fat served with giant bowl of chocolate mousse.",
            mapsQuery: "Chez Janou Paris"
        },
        {
            dish: "French Onion Soup (Soupe à l'Oignon Gratinée)",
            type: "veg",
            category: "Warm Classic Bistro Comfort",
            price: "€12 - €16 (₹1,050 - ₹1,400)",
            restaurant: "Au Pied de Cochon",
            rating: "4.6 ★ (22,000+ reviews)",
            address: "6 Rue Coquillière, Les Halles",
            distance: "500m from Louvre Museum",
            specialty: "Caramelized onions baked under a rich golden crust of Gruyère cheese.",
            mapsQuery: "Au Pied de Cochon Paris"
        },
        {
            dish: "Falafel Pita Sandwich with Tahini & Fried Eggplant",
            type: "vegan",
            category: "Middle Eastern Street Food",
            price: "€8.50 - €12 (₹750 - ₹1,050)",
            restaurant: "L'As du Fallafel",
            rating: "4.7 ★ (34,000+ reviews)",
            address: "34 Rue des Rosiers, Le Marais",
            distance: "650m from Saint-Paul Metro",
            specialty: "World-famous crispy chickpea falafel loaded with red cabbage, grilled eggplant, and spicy harissa.",
            mapsQuery: "L'As du Fallafel Paris"
        },
        {
            dish: "French Sweet & Savoury Crepes (Galettes)",
            type: "streetfood",
            category: "Breton Creperie",
            price: "€6 - €12 (₹530 - ₹1,050)",
            restaurant: "Breizh Café",
            rating: "4.7 ★ (19,000+ reviews)",
            address: "109 Rue Vieille-du-Temple, Marais",
            distance: "700m from Picasso Museum",
            specialty: "Crisp organic buckwheat galettes with melted Emmental, mushrooms, and salted butter caramel.",
            mapsQuery: "Breizh Café Marais Paris"
        }
    ],

    "Tokyo, Japan": [
        {
            dish: "Tonkotsu Ramen with Chashu & Soft Boiled Egg",
            type: "nonveg",
            category: "World-Famous Japanese Ramen",
            price: "¥980 - ¥1,450 (₹540 - ₹800)",
            restaurant: "Ichiran Ramen Shibuya",
            rating: "4.8 ★ (46,000+ reviews)",
            address: "Shibuya City, Jinnan 1-22-7",
            distance: "250m from Shibuya Crossing",
            specialty: "Rich 100% pork bone broth with custom richness levels in private solo dining booths.",
            mapsQuery: "Ichiran Ramen Shibuya Tokyo"
        },
        {
            dish: "Tenzaru Soba & Vegetable Tempura (Vegetarian)",
            type: "veg",
            category: "Artisanal Hand-Rolled Soba",
            price: "¥1,100 - ¥1,800 (₹600 - ₹990)",
            restaurant: "Kanda Matsuya Soba",
            rating: "4.7 ★ (14,000+ reviews)",
            address: "1-13 Kanda Sudacho, Chiyoda",
            distance: "700m from Akihabara Station",
            specialty: "Century-old heritage restaurant serving chilled buckwheat noodles with dipping dashi and vegetable tempura.",
            mapsQuery: "Kanda Matsuya Soba Tokyo"
        },
        {
            dish: "Premium A5 Wagyu Beef Teppanyaki",
            type: "nonveg",
            category: "Luxury Japanese Wagyu",
            price: "¥4,500 - ¥9,500 (₹2,500 - ₹5,200)",
            restaurant: "Ginza Steak",
            rating: "4.8 ★ (18,000+ reviews)",
            address: "5-9-1 Ginza, Chuo City",
            distance: "800m from Tsukiji Outer Market",
            specialty: "All-you-can-eat certified A5 Black Wagyu steak grilled right in front of you on iron teppan.",
            mapsQuery: "Ginza Steak Tokyo"
        },
        {
            dish: "Fresh Tuna O-Toro & Salmon Nigiri Sushi",
            type: "nonveg",
            category: "Market-Fresh Sushi",
            price: "¥1,800 - ¥3,500 (₹990 - ₹1,900)",
            restaurant: "Sushi Zanmai Main Branch",
            rating: "4.7 ★ (31,000+ reviews)",
            address: "4-11-9 Tsukiji, Chuo City",
            distance: "Inside Tsukiji Outer Market",
            specialty: "Run by the famous 'Tuna King', serving melt-in-the-mouth bluefin fatty tuna sushi 24/7.",
            mapsQuery: "Sushi Zanmai Tsukiji Tokyo"
        },
        {
            dish: "Japanese Vegan Shojin Ryori Bento (Temple Cuisine)",
            type: "vegan",
            category: "Zen Buddhist Plant-Based",
            price: "¥1,500 - ¥2,800 (₹820 - ₹1,540)",
            restaurant: "Ain Soph. Journey Shinjuku",
            rating: "4.7 ★ (11,000+ reviews)",
            address: "3-8-9 Shinjuku, Shinjuku City",
            distance: "400m from Shinjuku Gyoen Garden",
            specialty: "Fluffy vegan matcha pancakes, seasonal mushroom bowls, and plant-based katsu curries.",
            mapsQuery: "Ain Soph Journey Shinjuku Tokyo"
        },
        {
            dish: "Charcoal Yakitori Skewers & Gyoza",
            type: "streetfood",
            category: "Alleyway Izakaya Comfort",
            price: "¥180 - ¥350 per skewer",
            restaurant: "Torikizoku Omoide Yokocho",
            rating: "4.6 ★ (26,000+ reviews)",
            address: "1-2-7 Nishishinjuku, Shinjuku",
            distance: "Inside Memory Lane (Omoide Yokocho)",
            specialty: "Tare sauce glazed grilled chicken skewers, crispy gyoza dumplings, and cold draft beer.",
            mapsQuery: "Omoide Yokocho Shinjuku Tokyo"
        }
    ],

    "Dubai, United Arab Emirates": [
        {
            dish: "Emirati Lamb Ouzi & Fragrant Spiced Rice",
            type: "nonveg",
            category: "Traditional Emirati Heritage",
            price: "AED 65 - AED 110 (₹1,450 - ₹2,450)",
            restaurant: "Al Fanar Restaurant & Cafe",
            rating: "4.8 ★ (21,000+ reviews)",
            address: "Al Seef Heritage District, Dubai Creek",
            distance: "400m from Al Fahidi Bastakiya",
            specialty: "Authentic 1960s Emirati heritage dining serving slow-cooked tender spiced lamb over pine-nut rice.",
            mapsQuery: "Al Fanar Restaurant Al Seef Dubai"
        },
        {
            dish: "Crispy Falafel Platter, Fresh Hummus & Warm Pita",
            type: "veg",
            category: "Middle Eastern Vegetarian",
            price: "AED 25 - AED 45 (₹550 - ₹990)",
            restaurant: "Operation: Falafel (JBR)",
            rating: "4.7 ★ (28,000+ reviews)",
            address: "The Beach, JBR Walk",
            distance: "150m from JBR Beach",
            specialty: "Fresh golden chickpea falafels, smoked baba ganoush, and stuffed halloumi saj flatbreads.",
            mapsQuery: "Operation Falafel JBR Dubai"
        },
        {
            dish: "Authentic Chicken Shawarma in Saj Bread",
            type: "streetfood",
            category: "Iconic Arabian Street Food",
            price: "AED 12 - AED 22 (₹260 - ₹480)",
            restaurant: "Al Mallah Restaurant",
            rating: "4.7 ★ (35,000+ reviews)",
            address: "2nd December Street, Al Hudaiba",
            distance: "1.5 km from Dubai Frame",
            specialty: "Garlic toum sauce loaded rotisserie chicken shawarma grilled over hot charcoal.",
            mapsQuery: "Al Mallah 2nd December Street Dubai"
        },
        {
            dish: "Shish Tawook & Grilled Mixed Meat Kebab Platter",
            type: "nonveg",
            category: "Lebanese Charcoal Grill",
            price: "AED 75 - AED 140 (₹1,650 - ₹3,100)",
            restaurant: "Al Safadi Restaurant",
            rating: "4.8 ★ (29,000+ reviews)",
            address: "Sheikh Zayed Road / Dubai Marina",
            distance: "700m from Museum of the Future",
            specialty: "Tender marinated chicken skewers, lamb kofta, and freshly baked Arabic zaatar manakeesh.",
            mapsQuery: "Al Safadi Sheikh Zayed Road Dubai"
        },
        {
            dish: "Vegan Buddha Bowl, Avocado Toast & Matcha Latte",
            type: "vegan",
            category: "Plant-Based Organic Cafe",
            price: "AED 45 - AED 75 (₹990 - ₹1,650)",
            restaurant: "Comptoir 102",
            rating: "4.7 ★ (9,200+ reviews)",
            address: "102 Beach Road, Jumeirah 1",
            distance: "2 km from Burj Al Arab",
            specialty: "Award-winning organic raw vegan bowls, gluten-free desserts, and fresh cold-pressed tonics.",
            mapsQuery: "Comptoir 102 Jumeirah Dubai"
        }
    ],

    "Bengaluru, Karnataka, India": [
        {
            dish: "Butter Masala Dosa & Hot Filter Coffee",
            type: "veg",
            category: "Legendary South Indian Tiffin",
            price: "₹65 - ₹110",
            restaurant: "CTR (Central Tiffin Room / Shri Sagar)",
            rating: "4.8 ★ (48,000+ reviews)",
            address: "7th Cross, Margosa Road, Malleshwaram",
            distance: "2.5 km from Bangalore Palace",
            specialty: "Thick golden-crisp benne dosa with fluffy interior, spiced potato stuffing, and mint chutney.",
            mapsQuery: "CTR Shri Sagar Malleshwaram Bangalore"
        },
        {
            dish: "Crispy Masala Dosa, Vada & Kesari Bath",
            type: "veg",
            category: "Heritage Brahmin Tiffin",
            price: "₹60 - ₹100",
            restaurant: "Vidyarthi Bhavan",
            rating: "4.7 ★ (62,000+ reviews)",
            address: "Gandhi Bazaar, Basavanagudi",
            distance: "600m from Bull Temple",
            specialty: "Serving since 1943; famous for waiters balancing stacks of 20 crispy dosas at once.",
            mapsQuery: "Vidyarthi Bhavan Gandhi Bazaar Bangalore"
        },
        {
            dish: "Donne Biryani (Mutton & Chicken)",
            type: "nonveg",
            category: "Authentic Military Hotel Non-Veg",
            price: "₹180 - ₹280",
            restaurant: "Shivaji Military Hotel",
            rating: "4.6 ★ (34,000+ reviews)",
            address: "8th Block, Jayanagar",
            distance: "2 km from Lalbagh South Gate",
            specialty: "Fragrant short-grain seeraga samba rice cooked with country spices and served in eco-friendly areca nut palm leaf bowls.",
            mapsQuery: "Shivaji Military Hotel Jayanagar Bangalore"
        },
        {
            dish: "Mangalorean Ghee Roast Chicken & Neer Dosa",
            type: "nonveg",
            category: "Coastal Karnataka Non-Veg",
            price: "₹340 - ₹520",
            restaurant: "Kudla Coastal Seafood",
            rating: "4.7 ★ (16,000+ reviews)",
            address: "Ramanashree Hotel, Richmond Circle",
            distance: "1 km from UB City",
            specialty: "Fiery red Byadagi chilli ghee roast paired with paper-thin lace neer dosas.",
            mapsQuery: "Kudla Richmond Circle Bangalore"
        },
        {
            dish: "Craft Mango Cider, Wood-Fired Pizza & Barbecue Wings",
            type: "nonveg",
            category: "Microbrewery Capital Experience",
            price: "₹350 - ₹750",
            restaurant: "Toit Brewpub",
            rating: "4.8 ★ (54,000+ reviews)",
            address: "100 Feet Road, Indiranagar",
            distance: "Central Indiranagar Hub",
            specialty: "Bengaluru's most iconic craft brewery featuring Tint-In-Wit Belgian ale and spicy BBQ platters.",
            mapsQuery: "Toit Indiranagar Bangalore"
        },
        {
            dish: "Pure Vegan Thali, Millet Dosa & Jackfruit Biryani",
            type: "vegan",
            category: "Organic Farm-to-Table",
            price: "₹220 - ₹380",
            restaurant: "The Higher Taste",
            rating: "4.8 ★ (24,000+ reviews)",
            address: "ISKCON Temple Complex, Rajajinagar",
            distance: "Inside ISKCON Temple Grounds",
            specialty: "Gourmet sattvic vegan and vegetarian dining based on ancient Ayurvedic nutrition.",
            mapsQuery: "The Higher Taste ISKCON Bangalore"
        }
    ],

    "Goa, India": [
        {
            dish: "Authentic Goan Fish Thali (Kingfish / Surmai Rava Fry & Curry)",
            type: "nonveg",
            category: "Traditional Coastal Seafood Thali",
            price: "₹250 - ₹450",
            restaurant: "Fisherman's Wharf",
            rating: "4.8 ★ (38,000+ reviews)",
            address: "Panaji / Mobor Beach",
            distance: "800m from Panaji Jetty",
            specialty: "Fresh morning catch Kingfish coated in spiced semolina, kokum coconut curry, and unpolished Goan red rice.",
            mapsQuery: "The Fisherman's Wharf Panaji Goa"
        },
        {
            dish: "Prawn Balchão, Pork Vindaloo & Crab Xec Xec",
            type: "nonveg",
            category: "Indo-Portuguese Heritage",
            price: "₹380 - ₹680",
            restaurant: "Mum's Kitchen",
            rating: "4.7 ★ (22,000+ reviews)",
            address: "Martin's Corner / Panaji Miramar",
            distance: "1.5 km from Immaculate Conception Church",
            specialty: "Preserving home-cooked ancestral Christian & Hindu Goan recipes cooked in earthen pots.",
            mapsQuery: "Mums Kitchen Miramar Panaji Goa"
        },
        {
            dish: "Goan Vegetable Caldine, Mushroom Xacuti & Poi Bread",
            type: "veg",
            category: "Traditional Goan Vegetarian",
            price: "₹180 - ₹320",
            restaurant: "Vinayak Family Restaurant",
            rating: "4.7 ★ (26,000+ reviews)",
            address: "Assagao, North Goa",
            distance: "3 km from Anjuna Beach",
            specialty: "Coconut milk turmeric Caldine stew with local vegetables and crusty freshly baked poi bread.",
            mapsQuery: "Vinayak Family Restaurant Assagao Goa"
        },
        {
            dish: "Wood-Fired Pizza, Craft Cocktails & Sunset Tapas",
            type: "nonveg",
            category: "Cliffside Sunset Dining",
            price: "₹450 - ₹950",
            restaurant: "Thalassa Greek Restaurant",
            rating: "4.7 ★ (41,000+ reviews)",
            address: "Vagator / Siolim Waterfront",
            distance: "2 km from Chapora Fort",
            specialty: "Breathtaking ocean sunset views with live fire shows, Greek souvlaki, and seafood pasta.",
            mapsQuery: "Thalassa Siolim Goa"
        },
        {
            dish: "Organic Vegan Smoothie Bowls & Gluten-Free Waffles",
            type: "vegan",
            category: "Bohemian Health Cafe",
            price: "₹280 - ₹450",
            restaurant: "Artjuna Garden Cafe",
            rating: "4.8 ★ (18,000+ reviews)",
            address: "Monteiro Vaddo, Anjuna",
            distance: "800m from Anjuna Flea Market",
            specialty: "Shaded mango tree garden cafe serving avocado tartine, matcha bowls, and Mediterranean hummus.",
            mapsQuery: "Artjuna Garden Cafe Anjuna Goa"
        }
    ],

    "Manali, Himachal Pradesh, India": [
        {
            dish: "Fresh Himalayan Rainbow Trout (Butter Garlic Pan Fried)",
            type: "nonveg",
            category: "Fresh River Trout Fish",
            price: "₹550 - ₹850",
            restaurant: "Cafe 1947",
            rating: "4.8 ★ (26,000+ reviews)",
            address: "Old Manali, near Bridge",
            distance: "Inside Old Manali Village",
            specialty: "Fresh trout caught from the Beas river cooked in lemon-butter herbs overlooking the rushing mountain stream.",
            mapsQuery: "Cafe 1947 Old Manali"
        },
        {
            dish: "Traditional Himachali Siddu with Pure Ghee & Dal",
            type: "veg",
            category: "Authentic Mountain Bread & Ghee",
            price: "₹120 - ₹180",
            restaurant: "The Johnson's Cafe & Bar",
            rating: "4.7 ★ (21,000+ reviews)",
            address: "Circuit House Road, Siyal",
            distance: "600m from Hadimba Temple",
            specialty: "Steamed wheat yeast bread stuffed with spiced walnuts and poppy seeds soaked in pure mountain cow ghee.",
            mapsQuery: "The Johnsons Cafe Manali"
        },
        {
            dish: "Tibetan Steamed Chicken/Mutton Momos & Thukpa Noodle Soup",
            type: "nonveg",
            category: "Tibetan & Himalayan Street Food",
            price: "₹140 - ₹220",
            restaurant: "Chopsticks Restaurant",
            rating: "4.7 ★ (32,000+ reviews)",
            address: "The Mall Road, Manali",
            distance: "Central Mall Road",
            specialty: "Steaming hot handmade momos with fiery red chili dipping chutney and hearty herbal noodle soup.",
            mapsQuery: "Chopsticks Restaurant Mall Road Manali"
        },
        {
            dish: "Wood-Fired Truffle Pizza & Hot Apple Crumble Pie",
            type: "veg",
            category: "Rustic Mountain Bakery & Cafe",
            price: "₹320 - ₹620",
            restaurant: "Dylan's Toasted and Roasted Coffee House",
            rating: "4.8 ★ (15,000+ reviews)",
            address: "Old Manali Market",
            distance: "400m from Manu Temple",
            specialty: "Fresh baked warm apple pie made with locally harvested Kullu apples and hand-dripped espresso.",
            mapsQuery: "Dylans Coffee House Old Manali"
        }
    ],

    "Bali, Indonesia": [
        {
            dish: "Nasi Goreng Special with Chicken Satay & Fried Egg",
            type: "nonveg",
            category: "National Indonesian Dish",
            price: "50,000 - 85,000 IDR (₹270 - ₹460)",
            restaurant: "Warung Babi Guling Ibu Oka 3",
            rating: "4.7 ★ (28,000+ reviews)",
            address: "Jl. Tegal Sari, Ubud",
            distance: "400m from Ubud Palace",
            specialty: "Spicy wok-fried rice with sweet soy kecap manis, peanut-sauce chicken satay skewers, and crispy prawn crackers.",
            mapsQuery: "Warung Babi Guling Ibu Oka Ubud Bali"
        },
        {
            dish: "Bebek Betutu & Crispy Duck (Bebek Bengil)",
            type: "nonveg",
            category: "Traditional Balinese Crispy Duck",
            price: "120,000 - 180,000 IDR (₹650 - ₹980)",
            restaurant: "Bebek Bengil (Dirty Duck Diner)",
            rating: "4.8 ★ (34,000+ reviews)",
            address: "Jl. Hanoman, Padang Tegal, Ubud",
            distance: "500m from Ubud Monkey Forest",
            specialty: "Steamed with 16 Balinese spices for 12 hours and deep-fried to shatteringly crispy perfection over rice fields.",
            mapsQuery: "Bebek Bengil Dirty Duck Diner Ubud Bali"
        },
        {
            dish: "Gado-Gado & Tahu Tempe (Indonesian Salad with Peanut Sauce)",
            type: "vegan",
            category: "Plant-Based Indonesian Classic",
            price: "35,000 - 60,000 IDR (₹190 - ₹320)",
            restaurant: "Alchemy Bali (Ubud)",
            rating: "4.8 ★ (16,000+ reviews)",
            address: "Jl. Penestanan Kelod, Ubud",
            distance: "1.2 km from Campuhan Ridge",
            specialty: "Bali's premier 100% raw vegan restaurant featuring gourmet salad bar, coconut milk yogurts, and smoothie bowls.",
            mapsQuery: "Alchemy Bali Ubud"
        },
        {
            dish: "Seafood Barbecue Platter on the Beach (Jimbaran Bay)",
            type: "nonveg",
            category: "Candlelit Sunset Beach Seafood",
            price: "150,000 - 300,000 IDR (₹800 - ₹1,600)",
            restaurant: "Menega Cafe Jimbaran",
            rating: "4.7 ★ (42,000+ reviews)",
            address: "Jl. Four Seasons, Muaya Beach, Jimbaran",
            distance: "15 mins from Ngurah Rai Airport",
            specialty: "Grilled red snapper, jumbo king prawns, and lobster grilled over coconut husk embers right on the sand.",
            mapsQuery: "Menega Cafe Jimbaran Bali"
        }
    ]
};

console.log("Food database prepared with", Object.keys(foodDatabase).length, "destinations.");

module.exports = { foodDatabase };
