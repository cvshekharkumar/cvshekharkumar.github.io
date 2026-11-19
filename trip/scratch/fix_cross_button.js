const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
const indexHtmlPath = path.join(__dirname, '..', 'index.html');

let appJs = fs.readFileSync(appJsPath, 'utf8');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Update close button markup in index.html for mealBreakPopupNotification
const oldCrossBtn = `<button onclick="window.dismissMealPopup()" class="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>`;

const newCrossBtn = `<button type="button" onclick="window.dismissMealPopup(event)" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0" title="Close" aria-label="Close">
                    <i class="fa-solid fa-xmark text-sm pointer-events-none"></i>
                </button>`;

if (indexHtml.includes(oldCrossBtn)) {
    indexHtml = indexHtml.replace(oldCrossBtn, newCrossBtn);
    console.log("Replaced mealBreakPopup cross button with enhanced button in index.html!");
} else {
    // Try regex replace
    indexHtml = indexHtml.replace(/<button\s+onclick="window\.dismissMealPopup\(\)"[^>]*>[\s\S]*?<\/button>/, newCrossBtn);
    console.log("Regex replaced mealBreakPopup cross button in index.html!");
}

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// 2. Update dismissMealPopup, openFoodFinderModal, closeFoodFinderModal, openCustomRoutePlannerModal, closeCustomRoutePlannerModal in app.js
const modalHandlersCode = `
window.dismissMealPopup = function(e) {
    if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const floatingPrompt = document.getElementById("mealBreakPopupNotification");
    if (floatingPrompt) {
        floatingPrompt.classList.add("hidden");
        floatingPrompt.style.setProperty("display", "none", "important");
    }
    mealPromptShown = true;
};

window.openFoodFinderModal = function(filter = "all") {
    userTourState.foodFilter = filter;
    const modal = document.getElementById("foodFinderModal");
    if (!modal) return;

    modal.style.setProperty("display", "flex", "important");
    modal.classList.remove("hidden");
    renderFoodItemsList();
};

window.closeFoodFinderModal = function() {
    const modal = document.getElementById("foodFinderModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.setProperty("display", "none", "important");
    }
};

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
    modal.style.setProperty("display", "flex", "important");
    modal.classList.remove("hidden");
};

window.closeCustomRoutePlannerModal = function() {
    const modal = document.getElementById("customRoutePlannerModal");
    if (modal) {
        modal.classList.add("hidden");
        modal.style.setProperty("display", "none", "important");
    }
};
`;

// Replace in app.js
const dStart = appJs.indexOf("window.dismissMealPopup = function");
if (dStart !== -1) {
    const dEnd = appJs.indexOf("function showToast(", dStart);
    appJs = appJs.slice(0, dStart) + modalHandlersCode + "\n\n" + appJs.slice(dEnd);
    fs.writeFileSync(appJsPath, appJs, 'utf8');
    console.log("Updated modal handlers in app.js!");
}
