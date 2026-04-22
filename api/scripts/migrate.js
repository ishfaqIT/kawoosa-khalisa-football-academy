const mongoose = require('mongoose');
require('dotenv').config();

// Migration config
const SOURCE_URI = 'mongodb://localhost:27017/kkfa_db';
// Replace this with your Atlas URI if it's not in .env as MONGO_URI_ATLAS
let DEST_URI = process.env.MONGO_URI_ATLAS; 

if (!DEST_URI) {
    console.error('❌ Error: MONGO_URI_ATLAS is not defined in your .env file.');
    process.exit(1);
}

// Ensure we target kkfa_db if no DB is specified
if (!DEST_URI.includes('.net/') || DEST_URI.includes('.net/?')) {
    DEST_URI = DEST_URI.replace('.net/', '.net/kkfa_db');
}
// Clean quotes if any
DEST_URI = DEST_URI.replace(/"/g, '');

async function migrate() {
    let sourceConn, destConn;

    try {
        console.log('🔗 Connecting to Source (Local)...');
        sourceConn = await mongoose.createConnection(SOURCE_URI).asPromise();
        console.log('✅ Connected to Source.');

        const maskedDest = DEST_URI.replace(/:([^@]+)@/, ':****@');
        console.log(`🔗 Connecting to Destination: ${maskedDest}`);
        
        // Increased timeout and explicit settings for Atlas
        destConn = await mongoose.createConnection(DEST_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4 to avoid some Atlas DNS issues
        }).asPromise();
        console.log('✅ Connected to Destination (Atlas).');

        const collections = await sourceConn.db.listCollections().toArray();
        console.log(`📦 Found ${collections.length} collections to migrate.`);

        for (const collInfo of collections) {
            const name = collInfo.name;
            if (name.startsWith('system.')) continue;

            console.log(`  🚀 Migrating collection: ${name}...`);
            
            const sourceColl = sourceConn.db.collection(name);
            const destColl = destConn.db.collection(name);

            // Fetch all data from source
            const data = await sourceColl.find({}).toArray();

            if (data.length > 0) {
                // Clear destination first (optional but safer for clean migration)
                await destColl.deleteMany({});
                // Insert into destination
                await destColl.insertMany(data);
                console.log(`    ✅ Migrated ${data.length} documents.`);
            } else {
                console.log(`    ⚠️ Collection is empty, skipping.`);
            }
        }

        console.log('\n🌟 MIGRATION COMPLETED SUCCESSFULLY! 🌟');
    } catch (error) {
        console.error('❌ Migration failed:', error);
    } finally {
        if (sourceConn) await sourceConn.close();
        if (destConn) await destConn.close();
        process.exit(0);
    }
}

migrate();
