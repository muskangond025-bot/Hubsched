const fs = require('fs');
const css = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\src\\app\\dumemearts.css', 'utf8');

const regex = /\.layout-card[^}]*\}/g;
let match;
while ((match = regex.exec(css)) !== null) {
  console.log(match[0]);
}

const regex2 = /\.card-[0-9][^}]*\}/g;
while ((match = regex2.exec(css)) !== null) {
  console.log(match[0]);
}
