const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let appJs = fs.readFileSync(appJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Fix modal & button HTML in index.html
// Replace floating action buttons & meal popup in index.html
const oldFloatingHtmlMarker = '<!-- Floating Action Buttons: Quick Location Optimizer & Food Finder -->';
const endFloatingHtmlMarker = '<!-- Custom Multi-Place Day Route Planner Modal -->';

const newFloatingHtml = `<!-- Floating Action Buttons: Quick Location Optimizer & Food Finder -->
    <div class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        <!-- Floating Food & Restaurant Finder Button -->
        <button onclick="window.openFoodFinderModal('all')"
                class="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-2 border-white/20 cursor-pointer">
            <span class="text-base">🍽️</span>
            <span>Find Food (Veg / Non-Veg)</span>
        </button>

        <!-- Floating Live Location Route Optimizer Button -->
        <button onclick="window.requestUserLocationAndOpenPlanner()"
                class="px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-2 border-white/20 cursor-pointer">
            <i class="fa-solid fa-location-crosshairs text-base"></i>
            <span>Share GPS & Create Day Plan</span>
        </button>
    </div>

    <!-- Periodic Meal Break Suggestion Pop-up (Positioned Bottom-Left to Avoid ANY Button Overlap) -->
    <div id="mealBreakPopupNotification" class="fixed bottom-6 left-6 z-40 hidden max-w-sm">
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
    
    `;

const fStart = indexHtml.indexOf(oldFloatingHtmlMarker);
const fEnd = indexHtml.indexOf(endFloatingHtmlMarker);
if (fStart !== -1 && fEnd !== -1) {
    indexHtml = indexHtml.slice(0, fStart) + newFloatingHtml + indexHtml.slice(fEnd);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log("Successfully fixed floating buttons in index.html!");
} else {
    console.error("Could not find floating buttons markers in index.html!");
}

// 2. Update Hero search bar with a prominent "Detect My Live GPS & Location" button
const heroSearchOld = `<label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                                    <i class="fa-solid fa-location-dot text-blue-500 mr-1"></i> Destination City or Country
                                </label>`;

const heroSearchNew = `<div class="flex items-center justify-between mb-1.5">
                                    <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        <i class="fa-solid fa-location-dot text-blue-500 mr-1"></i> Destination City or Country
                                    </label>
                                    <button type="button" onclick="window.detectUserLocationAndLoadCity()" class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                                        <i class="fa-solid fa-location-crosshairs"></i> Use My Live Location
                                    </button>
                                </div>`;

if (indexHtml.includes(heroSearchOld)) {
    indexHtml = indexHtml.replace(heroSearchOld, heroSearchNew);
    fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
    console.log("Successfully added 'Use My Live Location' to Hero search!");
}

// 3. Update app.js to add detectUserLocationAndLoadCity, improve periodic meal popup dismiss/show, and smooth GPS handling
const detectLocationCode = `
/**
 * Detect User's Live City via Geolocation & Reverse Geocode
 */
window.detectUserLocationAndLoadCity = function() {
    showToast("📍 Detecting your current live location...", true);
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                userTourState.userCoords = [lat, lon];
                userTourState.locationName = "Your Live Location";

                // Reverse geocode via OpenStreetMap Nominatim
                try {
                    const res = await fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${lat},\${lon}&limit=1\`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data && data.length > 0) {
                            const name = data[0].display_name.split(',')[0].trim();
                            const destInput = document.getElementById("destinationInput");
                            if (destInput) destInput.value = name;
                            await loadDestination(name);
                            showToast(\`📍 Detected location: \${name}!\`);
                            return;
                        }
                    }
                } catch (e) {
                    console.warn("Reverse geocode failed:", e);
                }

                // Fallback: match closest database city or generate dynamic
                let closestCity = "Jaipur, Rajasthan, India";
                let minDistance = 999999;
                for (const key in destinationDatabase) {
                    const dCoords = destinationDatabase[key].coords;
                    const dist = calculateDistanceKm(lat, lon, dCoords[0], dCoords[1]);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestCity = key;
                    }
                }

                if (minDistance < 150) {
                    const destInput = document.getElementById("destinationInput");
                    if (destInput) destInput.value = closestCity;
                    await loadDestination(closestCity);
                    showToast(\`📍 Detected nearest city: \${destinationDatabase[closestCity].name}!\`);
                } else {
                    const dynamicData = generateDynamicDestinationData("Current Location", {
                        name: "Your City",
                        coords: [lat, lon],
                        country: "Live GPS Location 📍"
                    });
                    appState.currentTripData = dynamicData;
                    appState.currentDestination = dynamicData.fullName;
                    await loadDestination("Current Location");
                    showToast("📍 Loaded 15 best places around your live GPS coordinates!");
                }
            },
            (err) => {
                console.warn("Geolocation permission error:", err);
                showToast("⚠️ Could not access GPS. Please type your city in the search bar above.", false);
            },
            { timeout: 6000, enableHighAccuracy: true }
        );
    } else {
        showToast("⚠️ Geolocation is not supported by your browser.", false);
    }
};

window.useCurrentLocation = function() {
    window.detectUserLocationAndLoadCity();
};
`;

// Insert detectLocationCode into app.js
if (!appJs.includes("window.detectUserLocationAndLoadCity")) {
    const insertIdx = appJs.indexOf("window.requestUserLocationAndOpenPlanner = function() {");
    if (insertIdx !== -1) {
        appJs = appJs.slice(0, insertIdx) + detectLocationCode + "\n\n" + appJs.slice(insertIdx);
        fs.writeFileSync(appJsPath, appJs, 'utf8');
        console.log("Successfully added detectUserLocationAndLoadCity to app.js!");
    }
}

// Update dismissMealPopup and meal popup timer in app.js
appJs = fs.readFileSync(appJsPath, 'utf8');
const oldMealTimer = `let mealPromptShown = false;
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
};`;

const newMealTimer = `let mealPromptShown = false;
setInterval(() => {
    if (!mealPromptShown) {
        const modal = document.getElementById("foodFinderModal");
        const floatingPrompt = document.getElementById("mealBreakPopupNotification");
        if (modal && modal.classList.contains("hidden") && floatingPrompt) {
            floatingPrompt.classList.remove("hidden");
        }
    }
}, 90000);

window.dismissMealPopup = function() {
    const floatingPrompt = document.getElementById("mealBreakPopupNotification");
    if (floatingPrompt) {
        floatingPrompt.classList.add("hidden");
    }
    mealPromptShown = true;
};`;

if (appJs.includes("let mealPromptShown = false;")) {
    const mStart = appJs.indexOf("let mealPromptShown = false;");
    const mEnd = appJs.indexOf("window.dismissMealPopup = function() {");
    const mEndFunc = appJs.indexOf("};", mEnd) + 2;
    appJs = appJs.slice(0, mStart) + newMealTimer + appJs.slice(mEndFunc);
    fs.writeFileSync(appJsPath, appJs, 'utf8');
    console.log("Successfully updated meal prompt handlers in app.js!");
}
