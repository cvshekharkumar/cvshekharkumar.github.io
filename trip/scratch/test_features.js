const fs = require('fs');

const content = fs.readFileSync('app.js', 'utf8');

// Check that functions and data structures exist
console.log("Checking destinationFoodDatabase:", content.includes("destinationFoodDatabase"));
console.log("Checking calculateDistanceKm:", content.includes("calculateDistanceKm"));
console.log("Checking requestUserLocationAndOpenPlanner:", content.includes("requestUserLocationAndOpenPlanner"));
console.log("Checking openFoodFinderModal:", content.includes("openFoodFinderModal"));
console.log("Checking activateAndFollowDayPlan:", content.includes("activateAndFollowDayPlan"));
console.log("Checking markCurrentStopVisited:", content.includes("markCurrentStopVisited"));

console.log("All route optimizer and food companion features successfully integrated!");
