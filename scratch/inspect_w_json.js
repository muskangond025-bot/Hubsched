const fs = require('fs');

const html = fs.readFileSync('scratch/live_about.html', 'utf8');

// Find w-json block or script tags that might contain interactions
const jsonRegex = /<script\s+type="application\/json"\s+class="w-json">([\s\S]*?)<\/script>/gi;
let match;
let found = false;
while ((match = jsonRegex.exec(html)) !== null) {
  const data = JSON.parse(match[1]);
  if (data.interactions) {
    found = true;
    console.log('Found Webflow interactions JSON!');
    // Let's search for the target IDs
    const targets = [
      'f7deef62-eb5f-e310-20ab-93bee9403e65',
      'f3c3040b-01dc-bc6b-626a-7130e50797b2',
      '9f62d37d-9780-a893-d205-0f89fec1991e'
    ];
    // Find triggers or actions referencing these targets
    console.log('Searching for actions targeting:', targets);
    const interactions = data.interactions;
    console.log('Interactions Keys:', Object.keys(interactions));
    // Let's print interactions related to our targets
    const str = JSON.stringify(interactions);
    targets.forEach(target => {
      const idx = str.indexOf(target);
      if (idx !== -1) {
        console.log(`Target ${target} referenced in interactions!`);
        console.log(str.substring(idx - 200, idx + 1000));
        console.log('------------------------------------');
      }
    });
  }
}
if (!found) {
  console.log('No Webflow interactions JSON found.');
}
