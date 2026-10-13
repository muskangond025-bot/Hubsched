const https = require("https");
const fs = require("fs");

https.get("https://aikawakenichi.com/", (res) => {
  let data = "";
  res.on("data", (chunk) => data += chunk);
  res.on("end", () => {
    console.log("Status:", res.statusCode);
    console.log("Length:", data.length);
    fs.writeFileSync("scratch/aikawa_full.html", data);

    const scripts = [...data.matchAll(/<script[^>]*src="([^"]+)"[^>]*>/g)].map(m => m[1]);
    console.log("External Scripts:", scripts);

    const css = [...data.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
    console.log("CSS Links:", css);

    const meta = [...data.matchAll(/<meta[^>]*>/g)].map(m => m[0]);
    console.log("Meta count:", meta.length);

    console.log("HTML saved to scratch/aikawa_full.html");
  });
}).on("error", (err) => {
  console.error("Error:", err.message);
});
