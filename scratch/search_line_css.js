const fs = require('fs');

const css = fs.readFileSync('src/app/dumemearts.css', 'utf8');

const regex = /\.line-wrap[^{]*\{([^}]*)\}/g;
let match;
while ((match = regex.exec(css)) !== null) {
  console.log('Match selector:', match[0]);
}
