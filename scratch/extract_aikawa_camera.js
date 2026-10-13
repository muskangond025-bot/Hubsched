const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

// Search for camera setup in aikawa_entry.js
// Look for camera distance, fov, position.z, radius
const cameraMatches = [...js.matchAll(/camera[a-zA-Z0-9_.]*\s*=\s*new\s+(?:THREE\.)?PerspectiveCamera\s*\(([^)]+)\)/g)].map(m => m[0]);
console.log("Camera constructor matches:", cameraMatches);

// Search for camera.position
const camPosMatches = [...js.matchAll(/camera\.position\.(?:set|z)\s*\(([^)]+)\)|camera\.position\.z\s*=\s*([0-9.]+)/g)].map(m => m[0]);
console.log("Camera position matches (sample):", camPosMatches.slice(0, 15));

// Search for uCurveRadius, uRadius, radius default values
const radiusMatches = [...js.matchAll(/uCurveRadius[^;,\n]{0,80}/g)].map(m => m[0]);
console.log("uCurveRadius matches:", radiusMatches);

// Search for arch / bend / curve / cylinder parameters
const curveParams = [...js.matchAll(/(?:uCurve[a-zA-Z0-9_]+|uRollTop[a-zA-Z0-9_]+|uEffects[a-zA-Z0-9_]+)\s*[:=]\s*([0-9.]+)/g)].map(m => m[0]);
console.log("Curve parameter values (sample):", curveParams.slice(0, 20));
