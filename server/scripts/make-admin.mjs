import mongoose from 'mongoose';
import User from '../src/models/User.js';
import 'dotenv/config';

async function makeUserAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get the user ID from the token (695ea88b46261d373088a02a)
        const userId = '695ea88b46261d373088a02a';

        const user = await User.findById(userId);

        if (!user) {
            console.log('❌ User not found');
            process.exit(1);
        }

        console.log(`\nCurrent user: ${user.name} (${user.email})`);
        console.log(`Current role: ${user.role}`);

        if (user.role === 'admin') {
            console.log('✅ User is already an admin!');
        } else {
            user.role = 'admin';
            await user.save();
            console.log('✅ User role updated to admin!');
        }

        console.log('\nYou can now use the admin features. Please refresh your browser.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

makeUserAdmin();
