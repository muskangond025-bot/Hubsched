const fs = require('fs');

const path = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8f4fea56-81ee-448f-8d33-c78f24118fdd\\.system_generated\\steps\\105\\content.md';
const html = fs.readFileSync(path, 'utf8');

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

// 1. Meta
const meta = {
    title: "Make My Vid | Homepage",
    description: "MakeMyVid – Professional video editing services for creators & businesses. From multi-camera edits to motion graphics, we bring your vision to life!",
    favicon: "https://storage.googleapis.com/mkv_imagesbackend/favicon/67500cbb6555f_favicon.png",
    ogImage: "https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png",
    ogUrl: "https://rohanjoshi.in/"
};

// 2. Navigation
const navigation = {
    logoDesktop: "https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png",
    logoMobile: "https://storage.googleapis.com/mkv_imagesbackend/navbar_logo_mobile/67a602210b145_makemyvide-logo-mob.png",
    links: [
        { label: "Home", url: "https://rohanjoshi.in/" },
        { label: "About", url: "https://rohanjoshi.in/about-us" },
        { label: "Join Us", url: "https://rohanjoshi.in/join-us" },
        { label: "Blogs", url: "https://rohanjoshi.in/all-blogs" },
        { label: "Projects", url: "https://rohanjoshi.in/all-projects" },
        { label: "Services", url: "https://rohanjoshi.in/service" },
        { label: "Support", url: "https://rohanjoshi.in/support" }
    ],
    searchPlaceholder: "SEARCH_"
};

// 3. Hero
const hero = {
    preloaderText: "Make My Vid",
    mainHeading: "ELEVATING BRAND",
    subHeadingPrefix: "THROUGH",
    animatedCyclingWords: ["FILMS", "CREATIVE DIRECTION", "SOCIAL MEDIA", "SCRIPTING"],
    ctaButton: { text: "Get Quote", link: "https://rohanjoshi.in/support" },
    bannerVideo: {
        youtubeUrl: "https://www.youtube.com/watch?v=yo-VmdTOEUk",
        youtubeId: "yo-VmdTOEUk"
    }
};

// 4. Trusted By Logos
const trustedLogos = [...html.matchAll(/<div class="logo-item">\s*<img src="([^"]+)" alt="([^"]+)">\s*<\/div>/g)].map(m => ({
    name: m[2].trim(),
    logoUrl: m[1]
}));

// 5. Services
const serviceRegex = /<div class="PracticalProjects row [^"]*" onclick="toggleContent\(this\)">[\s\S]*?<h2>([^<]+)<\/h2>[\s\S]*?<div class="content[^"]*">([\s\S]*?)<\/div>\s*<div class="Whiline">/g;
let sMatch;
const services = [];
while ((sMatch = serviceRegex.exec(html)) !== null) {
    const title = sMatch[1].trim();
    const contentHtml = sMatch[2];
    const desc = stripHtml(contentHtml.match(/<ul class="PracVidsList">([\s\S]*?)<\/ul>/)?.[1] || '');
    const img = contentHtml.match(/<img src="([^"]+)"/)?.[1];
    const link = contentHtml.match(/<a href="([^"]+)" class="ViAllProjBtn/)?.[1];
    services.push({
        title,
        description: desc,
        ctaText: "Get in Touch",
        ctaLink: "https://rohanjoshi.in/support",
        knowMoreLink: link,
        imageUrl: img
    });
}

// 6. Testimonials
const reviewRegex = /<div class="review">[\s\S]*?<p>“?([^”<]+)”?[^<]*<\/p>[\s\S]*?<h4>([^<]+)<\/h4>[\s\S]*?<\/div>/g;
let rMatch;
const testimonials = [];
while ((rMatch = reviewRegex.exec(html)) !== null) {
    testimonials.push({
        quote: rMatch[1].trim(),
        author: rMatch[2].trim()
    });
}

// 7. FAQs
const faqs = JSON.parse(fs.readFileSync('scratch/all_faqs.json', 'utf8'));

// 8. CTA Section
const ctaSection = {
    titleTop: "LET'S",
    titleBottom: "CONNECT",
    buttonText: "Get in Touch",
    buttonLink: "https://rohanjoshi.in/support"
};

// 9. Cookie Policy
const cookiePolicy = {
    text: "We use cookies to ensure that we give you the best experience on our website.",
    learnMoreLink: "https://rohanjoshi.in/pages/cookie-policy",
    buttons: ["Accept", "Deny"]
};

// 10. Footer
const footer = {
    logo: "https://storage.googleapis.com/mkv_imagesbackend/footer_logo/67514789098f6_navbarlogo.png",
    tagline: "ELEVATING/ EMPOWERING/ EVOLVING Brands through videos.",
    newsletter: {
        label: "Subscribe to Newsletter",
        placeholder: "Enter your Email",
        buttonIcon: "bi bi-arrow-right-circle-fill"
    },
    copyright: "© 2024 Make My Vid. All rights reserved.",
    linksCol1: [
        { label: "Home", url: "https://rohanjoshi.in/" },
        { label: "About", url: "https://rohanjoshi.in/about-us" },
        { label: "Join Us", url: "https://rohanjoshi.in/join-us" },
        { label: "Blogs", url: "https://rohanjoshi.in/all-blogs" }
    ],
    linksCol2: [
        { label: "Projects", url: "https://rohanjoshi.in/all-projects" },
        { label: "Services", url: "https://rohanjoshi.in/service" },
        { label: "Support", url: "https://rohanjoshi.in/support" }
    ],
    legalLinks: [
        { label: "Cookie policy", url: "https://rohanjoshi.in/pages/cookie-policy" },
        { label: "Privacy Policy", url: "https://rohanjoshi.in/pages/privacy-policy" }
    ]
};

const fullData = {
    meta,
    navigation,
    hero,
    trustedLogos,
    services,
    testimonials,
    faqs,
    ctaSection,
    cookiePolicy,
    footer
};

fs.writeFileSync('scratch/rohanjoshi_homepage_data.json', JSON.stringify(fullData, null, 2));
console.log('Successfully saved scratch/rohanjoshi_homepage_data.json');
console.log('Summary:');
console.log(`- Trusted Logos: ${trustedLogos.length}`);
console.log(`- Services: ${services.length}`);
console.log(`- Testimonials: ${testimonials.length}`);
console.log(`- FAQs: ${faqs.length}`);
