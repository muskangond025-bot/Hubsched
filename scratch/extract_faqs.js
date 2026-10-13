const fs = require('fs');
const path = 'C:\\Users\\User\\.gemini\\antigravity-ide\\brain\\8f4fea56-81ee-448f-8d33-c78f24118fdd\\.system_generated\\steps\\105\\content.md';
const html = fs.readFileSync(path, 'utf8');

const faqRegex = /<div class="FaqBox flex-space-between" onclick="toggleFaq\(this\)">[\s\S]*?<h3 class="inter">([^<]+)<\/h3>[\s\S]*?<div class="inter answer">([\s\S]*?)<\/div>\s*<\/div>\s*<div class="Expand">/g;

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

let match;
let list = [];
while ((match = faqRegex.exec(html)) !== null) {
    list.push({
        num: list.length + 1,
        question: match[1].trim(),
        answer: stripHtml(match[2])
    });
}

console.log('Total FAQs found:', list.length);
fs.writeFileSync('scratch/all_faqs.json', JSON.stringify(list, null, 2));
list.forEach(item => {
    console.log(`${item.num}. ${item.question}`);
});
