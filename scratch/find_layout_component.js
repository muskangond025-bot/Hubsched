const fs = require('fs');
const css = fs.readFileSync('c:\\Users\\User\\Downloads\\templete for new project\\src\\app\\dumemearts.css', 'utf8');

const regex = /\.layout-component[^{]*\{[^}]*\}/g;
let match;
while ((match = regex.exec(css)) !== null) {
  console.log(match[0]);
}

const regex2 = /\.layout-container[^{]*\{[^}]*\}/g;
while ((match = regex2.exec(css)) !== null) {
  console.log(match[0]);
}
