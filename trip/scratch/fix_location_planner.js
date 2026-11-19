const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Replace requestUserLocationAndOpenPlanner, onLocationAcquired, and openCustomRoutePlannerModal with bulletproof implementation
const oldFuncMarker = "window.requestUserLocationAndOpenPlanner = function() {";
const endFuncMarker = "/**\n * Render Selectable Place Checkboxes";
let endFuncIdx = appJs.indexOf(endFuncMarker);
if (endFuncIdx === -1) {
    endFuncIdx = appJs.indexOf("/**\r\n * Render Selectable Place Checkboxes");
}

const startFuncIdx = appJs.indexOf(oldFuncMarker);

console.log("startFuncIdx:", startFuncIdx, "endFuncIdx:", endFuncIdx);

const improvedLocationAndPlannerCode = `window.requestUserLocationAndOpenPlanner = function() {
    // 1. Ensure current trip data is initialized
    if (!appState.currentTripData) {
        if (destinationDatabase["Jaipur, Rajasthan, India"]) {
            appState.currentTripData = destinationDatabase["Jaipur, Rajasthan, India"];
            appState.currentDestination = appState.currentTripData.fullName;
        }
    }

    // 2. Set default starting point instantly to avoid any lag
    const defaultCoords = (appState.currentTripData && appState.currentTripData.coords) ? 
        [appState.currentTripData.coords[0] - 0.004, appState.currentTripData.coords[1] - 0.004] : [26.9124, 75.7873];
    
    if (!userTourState.userCoords) {
        userTourState.userCoords = defaultCoords;
        userTourState.locationName = "Detected Location / City Hub";
    }

    // 3. Open modal immediately for instant UI feedback (0ms)
    openCustomRoutePlannerModal();

    // 4. Update marker on map
    updateUserLocationMapMarker();

    // 5. Try fetching high-precision browser GPS in background
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                userTourState.userCoords = [pos.coords.latitude, pos.coords.longitude];
                userTourState.locationName = "Live GPS: " + pos.coords.latitude.toFixed(4) + ", " + pos.coords.longitude.toFixed(4);
                updateUserLocationMapMarker();
                updateLocationBadgeInModal();
                renderPlaceCheckboxes();
                recalculateDayPlanOptions();
                showToast("📍 High-precision GPS detected!");
            },
            (err) => {
                console.info("Geolocation fallback active:", err.message || "Permission not granted");
                updateLocationBadgeInModal();
            },
            { timeout: 4000, enableHighAccuracy: true }
        );
    }
};

function updateUserLocationMapMarker() {
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
            .bindPopup(\`<strong>📍 Starting Point</strong><br>\${userTourState.locationName}\`)
            .addTo(appState.mapInstance);
    }
}

function updateLocationBadgeInModal() {
    const badge = document.getElementById("plannerStartLocationBadge");
    if (badge) {
        badge.innerHTML = \`<i class="fa-solid fa-location-dot text-emerald-500"></i> Starting: <strong>\${userTourState.locationName}</strong>\`;
    }
}

/**
 * Open Custom Route Planner Modal
 */
window.openCustomRoutePlannerModal = function() {
    const modal = document.getElementById("customRoutePlannerModal");
    if (!modal) {
        console.error("customRoutePlannerModal element not found!");
        return;
    }

    if (!appState.currentTripData) {
        if (destinationDatabase["Jaipur, Rajasthan, India"]) {
            appState.currentTripData = destinationDatabase["Jaipur, Rajasthan, India"];
            appState.currentDestination = appState.currentTripData.fullName;
        }
    }

    // Default select first 6 milestones if none selected
    if (appState.currentTripData && userTourState.selectedMilestoneIds.length === 0) {
        userTourState.selectedMilestoneIds = appState.currentTripData.milestones.slice(0, 6).map(m => m.id);
    }

    updateLocationBadgeInModal();
    renderPlaceCheckboxes();
    recalculateDayPlanOptions();
    modal.classList.remove("hidden");
};

window.closeCustomRoutePlannerModal = function() {
    const modal = document.getElementById("customRoutePlannerModal");
    if (modal) modal.classList.add("hidden");
};
`;

if (startFuncIdx !== -1 && endFuncIdx !== -1) {
    appJs = appJs.slice(0, startFuncIdx) + improvedLocationAndPlannerCode + "\n\n" + appJs.slice(endFuncIdx);
    fs.writeFileSync(appJsPath, appJs, 'utf8');
    console.log("Successfully updated location and planner logic in app.js!");
} else {
    console.error("Could not find function markers in app.js!");
}
