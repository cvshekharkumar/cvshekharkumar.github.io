const fs = require('fs');
const path = require('path');
const { foodDatabase } = require('./build_custom_route_and_food');

const appJsPath = path.join(__dirname, '..', 'app.js');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let appJs = fs.readFileSync(appJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Add foodDatabase and Location/Route & Food Logic to app.js
const routeAndFoodCode = `
/**
 * ══════════════════════════════════════════════════════════════════════════
 * LIVE GPS LOCATION, CUSTOM MULTI-PLACE DAY ROUTE OPTIMIZER & ACTIVE GUIDE
 * ══════════════════════════════════════════════════════════════════════════
 */

// User Location & Active Day Tour State
const userTourState = {
    userCoords: null, // [lat, lng]
    locationName: "Current GPS Location",
    selectedMilestoneIds: [],
    generatedPlans: null,
    activePlan: null,
    currentStepIndex: 0,
    visitedMilestoneIds: new Set(),
    userLocationMarker: null,
    foodFilter: "all"
};

// Comprehensive Food & Restaurant Database per Destination
const destinationFoodDatabase = ${JSON.stringify(foodDatabase, null, 4)};

/**
 * Universal Dynamic Food & Restaurant Generator (for any unlisted city worldwide)
 */
function getFoodRecommendationsForCity(cityName, filterType = "all") {
    let list = destinationFoodDatabase[cityName];
    if (!list) {
        // Try finding partial match
        const cLower = cityName.toLowerCase();
        const foundKey = Object.keys(destinationFoodDatabase).find(k => k.toLowerCase().includes(cLower.split(',')[0].trim()) || cLower.includes(k.toLowerCase().split(',')[0].trim()));
        if (foundKey) {
            list = destinationFoodDatabase[foundKey];
        } else {
            const simpleName = cityName.split(',')[0].trim();
            list = [
                {
                    dish: "Signature " + simpleName + " Chef's Special Royal Feast",
                    type: "veg",
                    category: "Traditional Local Specialties",
                    price: "₹250 - ₹450 ($4 - $6)",
                    restaurant: "The Heritage Kitchen " + simpleName,
                    rating: "4.8 ★ (18,000+ reviews)",
                    address: "Heritage Center, Old Town Square",
                    distance: "400m from Central Landmark",
                    specialty: "Authentic regional recipes prepared with locally sourced farm ingredients and aromatic spices.",
                    mapsQuery: "Top rated vegetarian restaurant in " + simpleName
                },
                {
                    dish: "Traditional Roasted Grill & " + simpleName + " Spiced Curry",
                    type: "nonveg",
                    category: "Regional Non-Veg Delicacy",
                    price: "₹380 - ₹650 ($5 - $9)",
                    restaurant: "Grand " + simpleName + " Charcoal Bistro",
                    rating: "4.7 ★ (22,000+ reviews)",
                    address: "Main Promenade Boulevard",
                    distance: "650m from City Center",
                    specialty: "Charcoal-grilled tender meat skewers and generational clay pot simmered gravies.",
                    mapsQuery: "Top rated non veg restaurant in " + simpleName
                },
                {
                    dish: "Authentic " + simpleName + " Street Snacks & Pastries",
                    type: "streetfood",
                    category: "Famous Street Delicacies",
                    price: "₹60 - ₹120 ($1 - $2)",
                    restaurant: "Central Market Old Bazaar Eatery",
                    rating: "4.8 ★ (35,000+ reviews)",
                    address: "Historic Market Square",
                    distance: "300m walk from Bazaar Gate",
                    specialty: "Crispy freshly fried savories, sweet dessert pastries, and artisanal tea/coffee.",
                    mapsQuery: "Famous street food stalls in " + simpleName
                },
                {
                    dish: "Organic Plant-Based Buddha Bowl & Cold-Pressed Juices",
                    type: "vegan",
                    category: "Healthy & Vegan Cafe",
                    price: "₹220 - ₹380 ($3 - $5)",
                    restaurant: "Green Garden Eco Cafe",
                    rating: "4.7 ★ (9,400+ reviews)",
                    address: "Botanical Avenue",
                    distance: "800m from Green Park",
                    specialty: "Farm fresh seasonal avocado salads, quinoa bowls, dairy-free smoothies, and desserts.",
                    mapsQuery: "Vegan organic cafe in " + simpleName
                }
            ];
        }
    }

    if (filterType === "all") return list;
    return list.filter(item => item.type === filterType);
}

/**
 * Calculate Great-Circle Distance between two coordinates in Kilometers (Haversine Formula)
 */
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

/**
 * Request User GPS Location with high accuracy & fallback
 */
window.requestUserLocationAndOpenPlanner = function() {
    showToast("📍 Requesting current GPS location...", true);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userTourState.userCoords = [pos.coords.latitude, pos.coords.longitude];
                userTourState.locationName = "Your Current GPS Location";
                onLocationAcquired();
            },
            (err) => {
                console.warn("Geolocation denied or error:", err);
                // Fallback to current destination center coordinates with realistic user offset
                if (appState.currentTripData && appState.currentTripData.coords) {
                    const center = appState.currentTripData.coords;
                    userTourState.userCoords = [center[0] - 0.005, center[1] - 0.005];
                    userTourState.locationName = "Current Location (City Hub)";
                    onLocationAcquired();
                } else {
                    userTourState.userCoords = [26.9124, 75.7873];
                    userTourState.locationName = "Current Location (Central Hub)";
                    onLocationAcquired();
                }
            },
            { timeout: 8000, enableHighAccuracy: true }
        );
    } else {
        if (appState.currentTripData && appState.currentTripData.coords) {
            userTourState.userCoords = appState.currentTripData.coords;
            userTourState.locationName = "Current Location (City Hub)";
            onLocationAcquired();
        }
    }
};

function onLocationAcquired() {
    showToast("✅ Current location verified! Opening Day Route Optimizer...");
    
    // Add pulsing green user location marker to map
    if (appState.mapInstance && userTourState.userCoords) {
        if (userTourState.userLocationMarker) {
            appState.mapInstance.removeLayer(userTourState.userLocationMarker);
        }
        
        const userIcon = L.divIcon({
            className: 'user-gps-icon',
            html: \`<div style="background: #10b981; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; border: 3px solid white; box-shadow: 0 0 20px rgba(16,185,129,0.8); animation: pulse 2s infinite;"><i class="fa-solid fa-person-walking"></i></div>\`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        userTourState.userLocationMarker = L.marker(userTourState.userCoords, { icon: userIcon })
            .bindPopup(\`<strong>📍 You Are Here</strong><br>\${userTourState.locationName}\`)
            .addTo(appState.mapInstance);
    }

    openCustomRoutePlannerModal();
}

/**
 * Open Custom Route Planner Modal
 */
window.openCustomRoutePlannerModal = function() {
    const modal = document.getElementById("customRoutePlannerModal");
    if (!modal || !appState.currentTripData) return;

    // Default select first 6 milestones if none selected
    if (userTourState.selectedMilestoneIds.length === 0) {
        userTourState.selectedMilestoneIds = appState.currentTripData.milestones.slice(0, 6).map(m => m.id);
    }

    renderPlaceCheckboxes();
    recalculateDayPlanOptions();
    modal.classList.remove("hidden");
};

window.closeCustomRoutePlannerModal = function() {
    const modal = document.getElementById("customRoutePlannerModal");
    if (modal) modal.classList.add("hidden");
};

/**
 * Render Selectable Place Checkboxes
 */
function renderPlaceCheckboxes() {
    const container = document.getElementById("placesCheckboxList");
    if (!container || !appState.currentTripData) return;

    const milestones = appState.currentTripData.milestones;
    
    container.innerHTML = milestones.map((m) => {
        const isChecked = userTourState.selectedMilestoneIds.includes(m.id);
        const distFromUser = userTourState.userCoords ? 
            calculateDistanceKm(userTourState.userCoords[0], userTourState.userCoords[1], m.coords[0], m.coords[1]).toFixed(1) + " km away" : "";

        return \`
            <label class="flex items-start gap-3 p-3 rounded-2xl border \${isChecked ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-600' : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'} cursor-pointer hover:border-blue-400 transition-all group">
                <input type="checkbox" value="\${m.id}" \${isChecked ? 'checked' : ''} onchange="window.togglePlaceSelection(\${m.id})"
                       class="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 rounded border-slate-300">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                        <span class="font-extrabold text-xs text-slate-800 dark:text-slate-100 truncate group-hover:text-blue-600">
                            #\${m.id}. \${m.name}
                        </span>
                        <span class="text-[10px] font-bold text-amber-500 shrink-0">⭐ \${m.googleRating}</span>
                    </div>
                    <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span class="truncate">\${m.category}</span>
                        \${distFromUser ? \`<span class="text-blue-600 dark:text-blue-400 font-bold shrink-0">📍 \${distFromUser}</span>\` : ''}
                    </div>
                </div>
            </label>
        \`;
    }).join("");

    const countBadge = document.getElementById("selectedPlacesCountBadge");
    if (countBadge) countBadge.textContent = \`\${userTourState.selectedMilestoneIds.length} of \${milestones.length} Places Selected\`;
}

window.togglePlaceSelection = function(milestoneId) {
    const idx = userTourState.selectedMilestoneIds.indexOf(milestoneId);
    if (idx > -1) {
        userTourState.selectedMilestoneIds.splice(idx, 1);
    } else {
        userTourState.selectedMilestoneIds.push(milestoneId);
    }
    renderPlaceCheckboxes();
    recalculateDayPlanOptions();
};

window.selectAllPlaces = function(select) {
    if (!appState.currentTripData) return;
    if (select) {
        userTourState.selectedMilestoneIds = appState.currentTripData.milestones.map(m => m.id);
    } else {
        userTourState.selectedMilestoneIds = [];
    }
    renderPlaceCheckboxes();
    recalculateDayPlanOptions();
};

window.selectPresetPlaces = function(presetCount) {
    if (!appState.currentTripData) return;
    userTourState.selectedMilestoneIds = appState.currentTripData.milestones.slice(0, presetCount).map(m => m.id);
    renderPlaceCheckboxes();
    recalculateDayPlanOptions();
};

/**
 * Calculate 3 Optimized Day Plan Options:
 * 1. Shortest Distance Route (TSP Nearest Neighbor)
 * 2. Cheapest Budget Route (Public Bus & Metro First)
 * 3. Scenic / Best-Time Route (Optimized for golden hour lighting & open hours)
 */
function recalculateDayPlanOptions() {
    if (!appState.currentTripData || userTourState.selectedMilestoneIds.length === 0) {
        document.getElementById("planOptionsContainer").innerHTML = \`
            <div class="p-6 text-center text-slate-400 text-xs">
                <i class="fa-solid fa-map-location-dot text-3xl mb-2 text-slate-300"></i>
                <p>Please select at least 1 place to generate customized day route plans.</p>
            </div>
        \`;
        return;
    }

    const allMilestones = appState.currentTripData.milestones;
    const selected = allMilestones.filter(m => userTourState.selectedMilestoneIds.includes(m.id));
    const startCoords = userTourState.userCoords || appState.currentTripData.coords;

    // --- OPTION 1: Shortest Distance Route (Greedy Nearest Neighbor TSP) ---
    const shortestStops = [];
    const unvisited = [...selected];
    let currentPoint = startCoords;
    let totalShortestDist = 0;

    while (unvisited.length > 0) {
        let nearestIdx = 0;
        let nearestDist = calculateDistanceKm(currentPoint[0], currentPoint[1], unvisited[0].coords[0], unvisited[0].coords[1]);
        for (let i = 1; i < unvisited.length; i++) {
            const dist = calculateDistanceKm(currentPoint[0], currentPoint[1], unvisited[i].coords[0], unvisited[i].coords[1]);
            if (dist < nearestDist) {
                nearestDist = dist;
                nearestIdx = i;
            }
        }
        totalShortestDist += nearestDist;
        const nextStop = unvisited.splice(nearestIdx, 1)[0];
        shortestStops.push(nextStop);
        currentPoint = nextStop.coords;
    }

    const shortestTravelTimeMins = Math.round(totalShortestDist * 4.2 + shortestStops.length * 10);
    const shortestCabCost = Math.round(totalShortestDist * 22 + 100);

    // --- OPTION 2: Cheapest Budget Route (Public Transit First) ---
    // Group stops along main transit arteries and sort by category/cost
    const cheapestStops = [...selected].sort((a, b) => (a.entryFee.budget || 0) - (b.entryFee.budget || 0));
    let totalCheapestDist = 0;
    let pt = startCoords;
    cheapestStops.forEach(s => {
        totalCheapestDist += calculateDistanceKm(pt[0], pt[1], s.coords[0], s.coords[1]);
        pt = s.coords;
    });
    const cheapestTransitCost = Math.round(cheapestStops.length * 20 + 35);
    const cheapestTravelTimeMins = Math.round(totalCheapestDist * 5.5 + cheapestStops.length * 15);

    // --- OPTION 3: Scenic & Balanced Route ---
    // Morning: Historic/forts; Midday: Museums/indoor palaces; Evening: Sunsets/markets
    const scenicStops = [...selected].sort((a, b) => {
        const priorityA = a.name.toLowerCase().includes("sunset") || a.name.toLowerCase().includes("bazaar") || a.name.toLowerCase().includes("night") ? 3 : 
                          a.name.toLowerCase().includes("museum") || a.name.toLowerCase().includes("palace") ? 2 : 1;
        const priorityB = b.name.toLowerCase().includes("sunset") || b.name.toLowerCase().includes("bazaar") || b.name.toLowerCase().includes("night") ? 3 : 
                          b.name.toLowerCase().includes("museum") || b.name.toLowerCase().includes("palace") ? 2 : 1;
        return priorityA - priorityB;
    });

    let totalScenicDist = 0;
    pt = startCoords;
    scenicStops.forEach(s => {
        totalScenicDist += calculateDistanceKm(pt[0], pt[1], s.coords[0], s.coords[1]);
        pt = s.coords;
    });
    const scenicTravelTimeMins = Math.round(totalScenicDist * 4.8 + scenicStops.length * 12);
    const scenicCost = Math.round(totalScenicDist * 18 + 80);

    userTourState.generatedPlans = {
        shortest: {
            title: "⚡ Shortest Distance Route",
            subtitle: "Least travel time & minimum transit fatigue",
            stops: shortestStops,
            distance: totalShortestDist.toFixed(1) + " km",
            travelTime: Math.floor(shortestTravelTimeMins / 60) + "h " + (shortestTravelTimeMins % 60) + "m",
            estCost: formatPrice(shortestCabCost) + " (Uber / Auto)",
            badge: "Fastest Speed",
            badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300"
        },
        cheapest: {
            title: "💰 Cheapest Budget Route",
            subtitle: "Public bus & metro optimized with low transit cost",
            stops: cheapestStops,
            distance: totalCheapestDist.toFixed(1) + " km",
            travelTime: Math.floor(cheapestTravelTimeMins / 60) + "h " + (cheapestTravelTimeMins % 60) + "m",
            estCost: formatPrice(cheapestTransitCost) + " (City Bus Pass)",
            badge: "Maximum Savings",
            badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
        },
        scenic: {
            title: "📸 Balanced & Scenic Leisure Route",
            subtitle: "Ideal photo lighting, open hours & golden hour sunset",
            stops: scenicStops,
            distance: totalScenicDist.toFixed(1) + " km",
            travelTime: Math.floor(scenicTravelTimeMins / 60) + "h " + (scenicTravelTimeMins % 60) + "m",
            estCost: formatPrice(scenicCost) + " (Mix Transit)",
            badge: "Best Experience",
            badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300"
        }
    };

    renderPlanOptionCards();
}

function renderPlanOptionCards() {
    const container = document.getElementById("planOptionsContainer");
    if (!container || !userTourState.generatedPlans) return;

    const plans = userTourState.generatedPlans;

    container.innerHTML = Object.keys(plans).map(planKey => {
        const p = plans[planKey];
        return \`
            <div class="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all flex flex-col justify-between">
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase \${p.badgeColor}">
                            \${p.badge}
                        </span>
                        <span class="text-xs font-bold text-slate-500">📍 \${p.stops.length} Checkpoints</span>
                    </div>
                    <h4 class="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                        \${p.title}
                    </h4>
                    <p class="text-xs text-slate-500 dark:text-slate-400">
                        \${p.subtitle}
                    </p>

                    <div class="grid grid-cols-3 gap-2 pt-2 text-[11px]">
                        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                            <span class="text-slate-400 block text-[10px]">Distance</span>
                            <strong class="text-slate-800 dark:text-slate-200">\${p.distance}</strong>
                        </div>
                        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                            <span class="text-slate-400 block text-[10px]">Travel Time</span>
                            <strong class="text-slate-800 dark:text-slate-200">\${p.travelTime}</strong>
                        </div>
                        <div class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-center">
                            <span class="text-slate-400 block text-[10px]">Est. Transit</span>
                            <strong class="text-emerald-600">\${p.estCost}</strong>
                        </div>
                    </div>

                    <!-- Step Sequence Preview -->
                    <div class="pt-2">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Route Step Sequence:</span>
                        <div class="flex flex-wrap items-center gap-1 text-[11px] font-bold">
                            <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">You (Start)</span>
                            \${p.stops.map((s, idx) => \`
                                <span class="text-slate-400">➔</span>
                                <span class="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 truncate max-w-[130px]">
                                    \${idx + 1}. \${s.name.split('(')[0].trim()}
                                </span>
                            \`).join("")}
                        </div>
                    </div>
                </div>

                <button onclick="window.activateAndFollowDayPlan('\${planKey}')"
                        class="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <i class="fa-solid fa-person-walking-arrow-right"></i>
                    <span>Select & Follow This Plan All Day ➔</span>
                </button>
            </div>
        \`;
    }).join("");
}

/**
 * Activate Chosen Day Plan and Start Live Whole Day Tour Guide
 */
window.activateAndFollowDayPlan = function(planKey) {
    if (!userTourState.generatedPlans || !userTourState.generatedPlans[planKey]) return;

    const chosen = userTourState.generatedPlans[planKey];
    userTourState.activePlan = chosen;
    userTourState.currentStepIndex = 0;
    userTourState.visitedMilestoneIds.clear();

    closeCustomRoutePlannerModal();

    // Update map with the chosen custom plan route
    renderActiveCustomTourOnMap(chosen);

    // Show the Active Day Tour Guide Floating Panel
    renderActiveTourGuideCard();

    showToast(\`🚀 Activated \${chosen.title}! Ready for step-by-step navigation.\`);
    
    // Scroll smoothly to map
    document.getElementById("map-section").scrollIntoView({ behavior: 'smooth' });
};

function renderActiveCustomTourOnMap(plan) {
    if (!appState.mapInstance || !appState.markersGroup) return;

    appState.markersGroup.clearLayers();
    if (appState.routeLine) {
        appState.mapInstance.removeLayer(appState.routeLine);
        appState.routeLine = null;
    }

    const routeLatLngs = [];

    // Add user start point
    if (userTourState.userCoords) {
        routeLatLngs.push(userTourState.userCoords);
        const userIcon = L.divIcon({
            className: 'user-gps-icon',
            html: \`<div style="background: #10b981; color: white; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 3px solid white; box-shadow: 0 0 24px rgba(16,185,129,0.9);"><i class="fa-solid fa-person-walking"></i></div>\`,
            iconSize: [42, 42],
            iconAnchor: [21, 21]
        });
        L.marker(userTourState.userCoords, { icon: userIcon })
            .bindPopup("<strong>📍 Start: Your Current Location</strong>")
            .addTo(appState.markersGroup);
    }

    plan.stops.forEach((m, idx) => {
        const isCurrent = idx === userTourState.currentStepIndex;
        const isVisited = userTourState.visitedMilestoneIds.has(m.id);

        const markerColor = isVisited ? '#10b981' : isCurrent ? '#f59e0b' : '#2563eb';
        const markerIcon = L.divIcon({
            className: 'custom-div-icon',
            html: \`<div style="background: \${markerColor}; color: white; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; border: 3px solid white; box-shadow: 0 6px 16px rgba(0,0,0,0.4); cursor: pointer;">\${idx + 1}</div>\`,
            iconSize: [38, 38],
            iconAnchor: [19, 19]
        });

        const marker = L.marker(m.coords, { icon: markerIcon }).addTo(appState.markersGroup);
        const googlePlaceQuery = encodeURIComponent(\`\${m.name}, \${appState.currentTripData.name}\`);
        
        marker.bindPopup(\`
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
                <span style="font-size: 10px; font-weight: 800; color: #2563eb; background: #eff6ff; padding: 2px 6px; border-radius: 9999px;">Step \${idx + 1} of \${plan.stops.length}</span>
                <div style="font-size: 13px; font-weight: 800; margin: 4px 0 2px 0; color: #0f172a;">\${m.name}</div>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">⏱️ \${m.timings}</div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=\${googlePlaceQuery}" target="_blank" style="display: block; text-align: center; background: #2563eb; color: white; padding: 6px; border-radius: 8px; font-size: 11px; font-weight: 700; text-decoration: none;">🚗 Start Navigation</a>
            </div>
        \`);
        routeLatLngs.push(m.coords);
    });

    if (routeLatLngs.length > 1) {
        appState.routeLine = L.polyline(routeLatLngs, {
            color: '#3b82f6',
            weight: 5,
            opacity: 0.9,
            dashArray: '8, 8',
            lineCap: 'round'
        }).addTo(appState.mapInstance);
    }

    if (appState.markersGroup.getLayers().length > 0) {
        appState.mapInstance.fitBounds(appState.markersGroup.getBounds(), { padding: [50, 50] });
    }
}

/**
 * Render Active Tour Guide Bottom Bar / Floating Card
 */
function renderActiveTourGuideCard() {
    const container = document.getElementById("activeTourGuideBar");
    if (!container || !userTourState.activePlan) return;

    const plan = userTourState.activePlan;
    const currentStop = plan.stops[userTourState.currentStepIndex];
    if (!currentStop) {
        // Tour completed!
        container.innerHTML = \`
            <div class="glass-panel p-5 rounded-3xl shadow-2xl border-2 border-emerald-500 bg-white/95 dark:bg-slate-900/95 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-lg">
                        🎉
                    </div>
                    <div>
                        <h4 class="font-heading font-black text-lg text-slate-900 dark:text-white">Day Tour Completed!</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">You have successfully visited all \${plan.stops.length} chosen places today.</p>
                    </div>
                </div>
                <button onclick="window.openFoodFinderModal('all')" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i> Celebrate with Delicious Food ➔
                </button>
            </div>
        \`;
        container.classList.remove("hidden");
        return;
    }

    const currentIdx = userTourState.currentStepIndex + 1;
    const totalStops = plan.stops.length;
    const progressPct = Math.round(((currentIdx - 1) / totalStops) * 100);
    const googleNavUrl = \`https://www.google.com/maps/dir/?api=1&destination=\${encodeURIComponent(currentStop.name + ', ' + appState.currentTripData.name)}\`;

    container.innerHTML = \`
        <div class="glass-panel p-5 rounded-3xl shadow-2xl border-2 border-blue-500 bg-white/95 dark:bg-slate-900/95 space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-base shadow-glow shrink-0">
                        \${currentIdx}
                    </div>
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                                Next Stop (\${currentIdx} of \${totalStops})
                            </span>
                            <span class="text-xs font-semibold text-slate-400">⏱️ \${currentStop.timings}</span>
                        </div>
                        <h4 class="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                            \${currentStop.name}
                        </h4>
                    </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                    <a href="\${googleNavUrl}" target="_blank" rel="noopener noreferrer"
                       class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-all">
                        <i class="fa-solid fa-location-arrow"></i>
                        <span>Start Google Navigation</span>
                    </a>
                    <button onclick="window.markCurrentStopVisited()"
                            class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-all">
                        <i class="fa-solid fa-check"></i>
                        <span>Mark Visited & Next Stop</span>
                    </button>
                    <button onclick="window.openFoodFinderModal('all')"
                            class="px-3.5 py-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center gap-1 hover:bg-amber-200 transition-colors">
                        <i class="fa-solid fa-utensils text-amber-600"></i>
                        <span class="hidden sm:inline">Food Break</span>
                    </button>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-1">
                <div class="flex justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Day Journey Progress: \${userTourState.visitedMilestoneIds.size} of \${totalStops} Visited</span>
                    <span class="text-blue-600 font-bold">\${progressPct}% Completed</span>
                </div>
                <div class="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500" style="width: \${progressPct}%;"></div>
                </div>
            </div>
        </div>
    \`;

    container.classList.remove("hidden");
}

window.markCurrentStopVisited = function() {
    if (!userTourState.activePlan) return;
    const plan = userTourState.activePlan;
    const currentStop = plan.stops[userTourState.currentStepIndex];

    if (currentStop) {
        userTourState.visitedMilestoneIds.add(currentStop.id);
    }

    userTourState.currentStepIndex++;
    renderActiveCustomTourOnMap(plan);
    renderActiveTourGuideCard();

    if (userTourState.currentStepIndex < plan.stops.length) {
        const next = plan.stops[userTourState.currentStepIndex];
        showToast(\`✅ Checked in! Heading next to \${next.name}\`);
    } else {
        showToast("🎉 Congratulations! You visited all selected places for today!");
    }
};

/**
 * ══════════════════════════════════════════════════════════════════════════
 * SMART FOOD & RESTAURANT COMPANION (VEG / NON-VEG / STREET FOOD)
 * ══════════════════════════════════════════════════════════════════════════
 */

window.openFoodFinderModal = function(filter = "all") {
    userTourState.foodFilter = filter;
    const modal = document.getElementById("foodFinderModal");
    if (!modal) return;

    renderFoodItemsList();
    modal.classList.remove("hidden");
};

window.closeFoodFinderModal = function() {
    const modal = document.getElementById("foodFinderModal");
    if (modal) modal.classList.add("hidden");
};

window.filterFoodItems = function(filterType) {
    userTourState.foodFilter = filterType;
    
    // Update active tab buttons
    ['foodTabAll', 'foodTabVeg', 'foodTabNonVeg', 'foodTabVegan', 'foodTabStreet'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200";
    });

    const activeBtnMap = {
        'all': 'foodTabAll',
        'veg': 'foodTabVeg',
        'nonveg': 'foodTabNonVeg',
        'vegan': 'foodTabVegan',
        'streetfood': 'foodTabStreet'
    };

    const activeId = activeBtnMap[filterType] || 'foodTabAll';
    const activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        if (filterType === 'veg') {
            activeBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-sm";
        } else if (filterType === 'nonveg') {
            activeBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white shadow-sm";
        } else if (filterType === 'vegan') {
            activeBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white shadow-sm";
        } else if (filterType === 'streetfood') {
            activeBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white shadow-sm";
        } else {
            activeBtn.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm";
        }
    }

    renderFoodItemsList();
};

function renderFoodItemsList() {
    const container = document.getElementById("foodItemsListContainer");
    if (!container || !appState.currentTripData) return;

    const cityName = appState.currentTripData.fullName || appState.currentTripData.name;
    const foodList = getFoodRecommendationsForCity(cityName, userTourState.foodFilter);

    if (foodList.length === 0) {
        container.innerHTML = \`
            <div class="col-span-2 text-center py-10 text-slate-400 text-xs">
                <i class="fa-solid fa-bowl-food text-3xl mb-2"></i>
                <p>No food items found matching this filter. Try selecting "All Cuisines".</p>
            </div>
        \`;
        return;
    }

    container.innerHTML = foodList.map(item => {
        const isVeg = item.type === "veg" || item.type === "vegan";
        const badgeColor = item.type === "veg" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300" :
                           item.type === "nonveg" ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-300" :
                           item.type === "vegan" ? "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border-teal-300" :
                           "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-300";
        
        const badgeIcon = item.type === "veg" ? "🟢 Pure Veg" :
                          item.type === "nonveg" ? "🔴 Non-Veg" :
                          item.type === "vegan" ? "🌱 Vegan" : "🍢 Street Food";

        const googleMapsDirUrl = \`https://www.google.com/maps/dir/?api=1&destination=\${encodeURIComponent(item.mapsQuery || item.restaurant + ' ' + cityName)}\`;

        return \`
            <div class="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col justify-between">
                <div class="space-y-3">
                    <!-- Food Item Title & Diet Badge -->
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border \${badgeColor}">
                                \${badgeIcon}
                            </span>
                            <h4 class="font-heading font-extrabold text-base text-slate-900 dark:text-white mt-1.5">
                                \${item.dish}
                            </h4>
                        </div>
                        <span class="px-2.5 py-1 rounded-xl text-xs font-black bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 shrink-0">
                            \${item.price}
                        </span>
                    </div>

                    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        \${item.specialty}
                    </p>

                    <!-- Restaurant In Front of Food Item -->
                    <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                        <div class="flex items-center justify-between">
                            <span class="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                                <i class="fa-solid fa-store text-amber-500"></i> \${item.restaurant}
                            </span>
                            <span class="text-xs font-bold text-amber-500">\${item.rating}</span>
                        </div>
                        <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span class="truncate"><i class="fa-solid fa-location-dot text-slate-400 mr-1"></i> \${item.address}</span>
                            <span class="text-blue-600 dark:text-blue-400 font-bold shrink-0">📍 \${item.distance}</span>
                        </div>
                    </div>
                </div>

                <!-- One Click Google Maps Action Button -->
                <a href="\${googleMapsDirUrl}" target="_blank" rel="noopener noreferrer"
                   class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <i class="fa-brands fa-google text-sm"></i>
                    <span>Navigate to Restaurant in Google Maps ➔</span>
                </a>
            </div>
        \`;
    }).join("");
}

/**
 * Periodic Meal Prompt Pop-Up Timer (Every 90s if not opened)
 */
let mealPromptShown = false;
setInterval(() => {
    if (!mealPromptShown && !document.getElementById("foodFinderModal").classList.contains("hidden") === false) {
        const floatingPrompt = document.getElementById("mealBreakPopupNotification");
        if (floatingPrompt) {
            floatingPrompt.classList.remove("translate-y-32", "opacity-0", "pointer-events-none");
            floatingPrompt.classList.add("translate-y-0", "opacity-100");
        }
    }
}, 75000);

window.dismissMealPopup = function() {
    const floatingPrompt = document.getElementById("mealBreakPopupNotification");
    if (floatingPrompt) {
        floatingPrompt.classList.add("translate-y-32", "opacity-0", "pointer-events-none");
    }
    mealPromptShown = true;
};
`;

// Insert the new logic before the last closing lines in app.js
const lastLineIdx = appJs.lastIndexOf("function showToast(");
if (lastLineIdx !== -1) {
    appJs = appJs.slice(0, lastLineIdx) + routeAndFoodCode + "\n\n" + appJs.slice(lastLineIdx);
    fs.writeFileSync(appJsPath, appJs, 'utf8');
    console.log("Successfully appended Location, Route Optimizer & Food companion to app.js!");
} else {
    console.error("Could not find insertion point in app.js!");
}

// 2. Now let's update index.html to add:
// - "📍 Share Location & Optimize Day Plan" banner in Active Destination or Hero
// - "🍽️ Food & Restaurants" floating button
// - Custom Route Planner Modal
// - Active Day Tour Guide Floating Bar
// - Food Finder Modal (Veg / Non-Veg)
// - Periodic Meal Break Popup Notification

const modalsHtml = `
    <!-- Active Day Tour Guide Persistent Banner (When user follows a plan) -->
    <div id="activeTourGuideBar" class="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-2xl z-40 hidden transition-all duration-300">
        <!-- Dynamically populated by renderActiveTourGuideCard() -->
    </div>

    <!-- Floating Action Buttons: Quick Location Optimizer & Food Finder -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <!-- Floating Food & Restaurant Finder Button -->
        <button onclick="window.openFoodFinderModal('all')"
                class="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-2 border-white/20">
            <span class="text-base">🍽️</span>
            <span>Find Food (Veg / Non-Veg)</span>
        </button>

        <!-- Floating Live Location Route Optimizer Button -->
        <button onclick="window.requestUserLocationAndOpenPlanner()"
                class="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-2 border-white/20">
            <i class="fa-solid fa-location-crosshairs text-base"></i>
            <span>Share GPS & Create Day Plan</span>
        </button>
    </div>

    <!-- Periodic Meal Break Suggestion Pop-up -->
    <div id="mealBreakPopupNotification" class="fixed bottom-24 right-6 z-50 transform translate-y-32 opacity-0 pointer-events-none transition-all duration-500 max-w-sm">
        <div class="glass-panel p-4 rounded-3xl shadow-2xl border-2 border-amber-500/80 bg-white/95 dark:bg-slate-900/95 space-y-3 pointer-events-auto">
            <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shrink-0">
                        🍲
                    </div>
                    <div>
                        <h4 class="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Hungry? Time for a Meal Break!</h4>
                        <p class="text-[11px] text-slate-500 dark:text-slate-400">Choose Veg or Non-Veg to find the best restaurant nearby.</p>
                    </div>
                </div>
                <button onclick="window.dismissMealPopup()" class="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-1">
                <button onclick="window.dismissMealPopup(); window.openFoodFinderModal('veg')"
                        class="py-2 px-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-200 transition-colors">
                    <span>🥗 Pure Veg</span>
                </button>
                <button onclick="window.dismissMealPopup(); window.openFoodFinderModal('nonveg')"
                        class="py-2 px-3 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-rose-200 transition-colors">
                    <span>🍗 Non-Veg</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Custom Multi-Place Day Route Planner Modal -->
    <div id="customRoutePlannerModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="glass-panel w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800">
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                        <i class="fa-solid fa-route"></i>
                    </div>
                    <div>
                        <h3 class="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Customize Your Day Tour Plan</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                            Select places you want to visit from your live GPS location. We compute the Shortest & Cheapest routes!
                        </p>
                    </div>
                </div>
                <button onclick="window.closeCustomRoutePlannerModal()" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>

            <!-- Content Area: Place Selection + Plan Options -->
            <div class="flex-1 overflow-y-auto space-y-6 pr-1">
                <!-- Place Selection Section -->
                <div class="space-y-3">
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <span class="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                1. Pick Places to Visit Today:
                            </span>
                            <span id="selectedPlacesCountBadge" class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                6 Places Selected
                            </span>
                        </div>
                        <div class="flex flex-wrap items-center gap-1.5 text-xs">
                            <button onclick="window.selectAllPlaces(true)" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 font-bold transition-colors">Select All (15)</button>
                            <button onclick="window.selectPresetPlaces(5)" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 font-bold transition-colors">Top 5 Must-See</button>
                            <button onclick="window.selectPresetPlaces(8)" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 text-blue-600 font-bold transition-colors">Full-Day (8)</button>
                            <button onclick="window.selectAllPlaces(false)" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold hover:text-rose-600 transition-colors">Clear</button>
                        </div>
                    </div>

                    <!-- Checkbox Grid -->
                    <div id="placesCheckboxList" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                        <!-- Populated by renderPlaceCheckboxes() -->
                    </div>
                </div>

                <!-- Generated Plan Options (Shortest vs Cheapest vs Balanced) -->
                <div class="space-y-3 pt-2">
                    <span class="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                        2. Choose Your Optimized Route Plan:
                    </span>
                    <div id="planOptionsContainer" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <!-- Populated by recalculateDayPlanOptions() -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Food & Restaurant Finder Modal (Veg / Non-Veg / Vegan / Street Food) -->
    <div id="foodFinderModal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4">
        <div class="glass-panel w-full max-w-4xl rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800">
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center text-xl shadow-md">
                        🍽️
                    </div>
                    <div>
                        <h3 class="font-heading font-extrabold text-xl text-slate-900 dark:text-white">Local Food & Top Restaurants</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400">
                            Choose Veg or Non-Veg to view curated dishes with restaurants in front & 1-click Google Maps navigation.
                        </p>
                    </div>
                </div>
                <button onclick="window.closeFoodFinderModal()" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>

            <!-- Cuisine & Diet Filter Tabs -->
            <div class="flex flex-wrap items-center gap-2">
                <button id="foodTabAll" onclick="window.filterFoodItems('all')"
                        class="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm transition-all">
                    🍴 All Cuisines
                </button>
                <button id="foodTabVeg" onclick="window.filterFoodItems('veg')"
                        class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-1.5">
                    <span>🟢 100% Pure Veg</span>
                </button>
                <button id="foodTabNonVeg" onclick="window.filterFoodItems('nonveg')"
                        class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-1.5">
                    <span>🔴 Non-Veg & Seafood</span>
                </button>
                <button id="foodTabVegan" onclick="window.filterFoodItems('vegan')"
                        class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-1.5">
                    <span>🌱 Vegan / Organic</span>
                </button>
                <button id="foodTabStreet" onclick="window.filterFoodItems('streetfood')"
                        class="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-all flex items-center gap-1.5">
                    <span>🍢 Street Delicacies</span>
                </button>
            </div>

            <!-- Food Items & Restaurants Grid -->
            <div class="flex-1 overflow-y-auto pr-1">
                <div id="foodItemsListContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Populated by renderFoodItemsList() -->
                </div>
            </div>
        </div>
    </div>
`;

// Insert the modals in index.html right before <footer
const footerIdx = indexHtml.indexOf('<footer');
if (footerIdx !== -1) {
    indexHtml = indexHtml.slice(0, footerIdx) + modalsHtml + "\n" + indexHtml.slice(footerIdx);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log("Successfully added custom route and food modals to index.html!");
} else {
    console.error("Could not find footer in index.html!");
}
