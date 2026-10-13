const fs = require("fs");

const js = fs.readFileSync("scratch/aikawa_entry.js", "utf-8");

const matches = [...js.matchAll(/uVelocity/g)];
matches.forEach((m, i) => {
  const start = Math.max(0, m.index - 250);
  const end = Math.min(js.length, m.index + 250);
  console.log(`\n=== Match ${i + 1} at ${m.index} ===`);
  console.log(js.slice(start, end));
});
