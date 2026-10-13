const fs = require("fs");
const path = require("path");

const imgPath = "C:/Users/User/.gemini/antigravity-ide/brain/d69aa68d-b12f-4425-8c7e-00fd642bdda0/.user_uploaded/media_1791892528527.png";
console.log("Exists:", fs.existsSync(imgPath));
console.log("Size:", fs.statSync(imgPath).size);

// Copy it to public/cylinder-fashion-ref.png so it can be directly used or referenced!
fs.copyFileSync(imgPath, "public/cylinder-fashion-ref.png");
console.log("Copied to public/cylinder-fashion-ref.png");
