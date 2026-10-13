const fs = require("fs");
const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const idx = js.indexOf("getCardCurveRadiusLocal");
if (idx !== -1) {
  console.log("=== getCardCurveRadiusLocal context ===");
  console.log(js.slice(Math.max(0, idx - 500), Math.min(js.length, idx + 1500)));
} else {
  console.log("Not found");
}
