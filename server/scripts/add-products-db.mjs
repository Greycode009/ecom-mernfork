import mongoose from 'mongoose';
import Product from '../src/models/Product.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read products data
const productsData = readFileSync(join(__dirname, 'products-data.js'), 'utf-8');
const productsMatch = productsData.match(/const products = (\[[\s\S]*?\]);/);
const products = eval(productsMatch[1]);

async function addProductsToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');
        console.log(`\n🚀 Adding ${products.length} products directly to database...\n`);

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < products.length; i++) {
            const productData = products[i];

            try {
                // Check if product already exists
                const existing = await Product.findOne({ slug: productData.slug });

                if (existing) {
                    console.log(`⚠️  [${i + 1}/${products.length}] Already exists: ${productData.title}`);
                    continue;
                }

                await Product.create(productData);
                successCount++;
                console.log(`✅ [${i + 1}/${products.length}] ${productData.title}`);
            } catch (error) {
                errorCount++;
                console.log(`❌ [${i + 1}/${products.length}] ${productData.title}`);
                console.log(`   ${error.message}`);
            }
        }

        console.log('\n📊 Summary:');
        console.log(`   ✅ Success: ${successCount}`);
        console.log(`   ❌ Failed: ${errorCount}`);
        console.log(`   📦 Total: ${products.length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

addProductsToDatabase();
