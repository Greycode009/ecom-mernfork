#!/usr/bin/env node

// Simple script to add all products
// Usage: node add-all-products.js YOUR_TOKEN_HERE

const http = require('http');

const token = process.argv[2];

if (!token) {
    console.log('❌ Please provide your admin token');
    console.log('Usage: node add-all-products.js YOUR_TOKEN');
    console.log('\nTo get your token:');
    console.log('1. Open browser DevTools (F12)');
    console.log('2. Go to Application > Local Storage');
    console.log('3. Copy the value of "token"');
    process.exit(1);
}

const products = require('./products-data');

async function addProduct(product) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(product);

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/products',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 201 || res.statusCode === 200) {
                    resolve(true);
                } else {
                    reject(new Error(`Status ${res.statusCode}: ${responseData}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function addAllProducts() {
    console.log(`🚀 Adding ${products.length} products...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        try {
            await addProduct(product);
            successCount++;
            console.log(`✅ [${i + 1}/${products.length}] ${product.title}`);
        } catch (error) {
            errorCount++;
            console.log(`❌ [${i + 1}/${products.length}] ${product.title}`);
            console.log(`   ${error.message}`);
        }

        // Small delay
        await new Promise(r => setTimeout(r, 100));
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📦 Total: ${products.length}`);
}

addAllProducts().catch(console.error);
