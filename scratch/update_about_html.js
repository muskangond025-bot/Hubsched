const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/extracted_about_sections.json', 'utf8'));

const output = `export const HERO_ABOUT_HTML = ${JSON.stringify(data.heroAbout)};

export const ABOUT_HEADER_HTML = ${JSON.stringify(data.aboutHeader)};

export const STACK_HTML = ${JSON.stringify(data.stack)};

export const CERTIFIED_HTML = ${JSON.stringify(data.certified)};

export const PROCESS_HTML = ${JSON.stringify(data.process)};
`;

fs.writeFileSync('src/app/about/aboutHtml.ts', output);
console.log('Successfully updated src/app/about/aboutHtml.ts with all 5 sections!');
