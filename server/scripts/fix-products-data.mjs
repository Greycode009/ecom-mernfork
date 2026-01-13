// This script fixes the products-data.js to match the Product schema

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'products-data.js');
let content = readFileSync(filePath, 'utf-8');

// Fix all instances: image -> images (as array), stock -> countInStock, add category
const fixes = [
    // Fix image to images
    [/image: "([^"]+)"/g, 'images: ["$1"]'],
    // Fix stock to countInStock
    [/stock: true/g, 'countInStock: 100'],
    [/stock: false/g, 'countInStock: 0'],
];

for (const [pattern, replacement] of fixes) {
    content = content.replace(pattern, replacement);
}

// Add category based on tags - more complex replacement
content = content.replace(/(\{[^}]*tags: \[([^\]]+)\][^}]*)\}/g, (match, p1, tags) => {
    // Extract first tag as category
    const firstTag = tags.split(',')[0].trim().replace(/['"]/g, '');

    // Check if already has category
    if (match.includes('category:')) {
        return match;
    }

    // Insert category before tags
    return p1.replace(/tags:/, `category: "${firstTag}",\n    tags:`).replace(/\}$/, '') + '\n  }';
});

writeFileSync(filePath, content, 'utf-8');
console.log('✅ Fixed products-data.js!');
console.log('   - Converted image → images (array)');
console.log('   - Converted stock → countInStock');
console.log('   - Added category from first tag');
