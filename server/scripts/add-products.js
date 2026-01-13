const axios = require('axios');
const products = require('./products-data');

const API_URL = 'http://localhost:5000/api';

// You'll need to get an admin token first
// Login as admin and copy the token
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'YOUR_ADMIN_TOKEN_HERE';

const addProducts = async () => {
    console.log(`🚀 Starting to add ${products.length} products...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        try {
            const response = await axios.post(
                `${API_URL}/products`,
                product,
                {
                    headers: {
                        'Authorization': `Bearer ${ADMIN_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            successCount++;
            console.log(`✅ [${i + 1}/${products.length}] Added: ${product.title}`);

        } catch (error) {
            errorCount++;
            console.log(`❌ [${i + 1}/${products.length}] Failed: ${product.title}`);
            console.log(`   Error: ${error.response?.data?.message || error.message}`);
        }

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n📊 Summary:');
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📦 Total: ${products.length}`);
};

// Instructions for running this script
console.log('📝 Instructions:');
console.log('1. Make sure your server is running on http://localhost:5000');
console.log('2. Login as admin and get your token');
console.log('3. Set ADMIN_TOKEN environment variable or update the script');
console.log('4. Run: node scripts/add-products.js\n');

// Uncomment to run:
// addProducts().catch(console.error);

module.exports = { addProducts, products };
