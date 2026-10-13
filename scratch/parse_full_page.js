const fs = require('fs');

const path = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8f4fea56-81ee-448f-8d33-c78f24118fdd\\.system_generated\\steps\\105\\content.md';
const html = fs.readFileSync(path, 'utf8');

// Helper to strip tags
function stripHtml(str) {
    if (!str) return '';
    return str
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/li>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

console.log('--- 1. META INFORMATION ---');
const metaTitle = html.match(/<meta name="title" content="([^"]+)"/)?.[1];
const metaDesc = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
const titleTag = html.match(/<title>([^<]+)<\/title>/)?.[1];
const favicon = html.match(/<link rel="icon" href="([^"]+)"/)?.[1];
console.log({ titleTag, metaTitle, metaDesc, favicon });

console.log('\n--- 2. LOGO & NAVBAR ---');
const logos = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*class="([^"]*logo[^"]*)"/gi)].map(m => ({ src: m[1], alt: m[2], class: m[3] }));
console.log('Logos:', logos);

const navLinks = [...html.matchAll(/<a class="nav-link[^"]*" href="([^"]+)">([^<]+)<\/a>/g)].map(m => ({ href: m[1], text: m[2].trim() }));
console.log('Nav links:', navLinks);

console.log('\n--- 3. TRUSTED BY CLIENT LOGOS ---');
const trustedLogos = [...html.matchAll(/<div class="logo-item">\s*<img src="([^"]+)" alt="([^"]+)">\s*<\/div>/g)].map(m => ({ alt: m[2], src: m[1] }));
console.log(`Found ${trustedLogos.length} trusted brand logos.`);
trustedLogos.forEach((l, i) => console.log(`${i+1}. ${l.alt} (${l.src})`));

console.log('\n--- 4. SERVICES (PRACTICAL PROJECTS / EMPOWERING YOU WITH) ---');
const serviceRegex = /<div class="PracticalProjects row [^"]*" onclick="toggleContent\(this\)">[\s\S]*?<h2>([^<]+)<\/h2>[\s\S]*?<div class="content[^"]*">([\s\S]*?)<\/div>\s*<div class="Whiline">/g;
let sMatch;
const services = [];
while ((sMatch = serviceRegex.exec(html)) !== null) {
    const title = sMatch[1].trim();
    const contentHtml = sMatch[2];
    const desc = stripHtml(contentHtml.match(/<ul class="PracVidsList">([\s\S]*?)<\/ul>/)?.[1] || '');
    const img = contentHtml.match(/<img src="([^"]+)"/)?.[1];
    const link = contentHtml.match(/<a href="([^"]+)" class="ViAllProjBtn/)?.[1];
    services.push({ title, desc, img, link });
}
console.log(`Found ${services.length} services:`);
services.forEach((s, i) => console.log(`${i+1}. [${s.title}]\nDesc: ${s.desc}\nImage: ${s.img}\nLink: ${s.link}\n`));

console.log('\n--- 5. TESTIMONIALS (EVOLVING WITH GRATITUDE) ---');
const reviewRegex = /<div class="review">[\s\S]*?<p>“?([^”<]+)”?[^<]*<\/p>[\s\S]*?<h4>([^<]+)<\/h4>[\s\S]*?<\/div>/g;
let rMatch;
const reviews = [];
while ((rMatch = reviewRegex.exec(html)) !== null) {
    reviews.push({ quote: rMatch[1].trim(), author: rMatch[2].trim() });
}
console.log(`Found ${reviews.length} reviews:`);
reviews.forEach((r, i) => console.log(`${i+1}. Quote: "${r.quote}"\nAuthor: ${r.author}\n`));

console.log('\n--- 6. FAQS ---');
const faqRegex = /<div class="FaqBox flex-space-between" onclick="toggleFaq\(this\)">[\s\S]*?<h3 class="inter">([^<]+)<\/h3>[\s\S]*?<div class="inter answer">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="Expand">/g;
let fMatch;
const faqs = [];
while ((fMatch = faqRegex.exec(html)) !== null) {
    faqs.push({ q: fMatch[1].trim(), a: stripHtml(fMatch[2]) });
}
console.log(`Found ${faqs.length} FAQs:`);
faqs.forEach((f, i) => console.log(`Q${i+1}: ${f.q}\nA:\n${f.a}\n------------------\n`));
