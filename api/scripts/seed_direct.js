const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import Models
const Wing = require('../models/Wing');
const Player = require('../models/Player');
const Coach = require('../models/Coach');
const User = require('../models/User');
const News = require('../models/News');
const Event = require('../models/Event');
const Fixture = require('../models/Fixture');
const Gallery = require('../models/Gallery');
const Registration = require('../models/Registration');

// Explicit shards resolved via nslookup to bypass SRV node issues
const MONGODB_URI = "mongodb://Vercel-Admin-kkfa-db:qOyIpVMABGK5GDdL@ac-elbmhk6-shard-00-00.1k483ex.mongodb.net:27017,ac-elbmhk6-shard-00-01.1k483ex.mongodb.net:27017,ac-elbmhk6-shard-00-02.1k483ex.mongodb.net:27017/kkfa_db?ssl=true&authSource=admin&retryWrites=true&w=majority";

const seedData = async () => {
    try {
        console.log('🔗 Connecting to Atlas via Direct Shard Link...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ Connected.');

        // 1. Clear Existing Data
        console.log('🧹 Clearing existing collections...');
        await Wing.deleteMany({});
        await Player.deleteMany({});
        await Coach.deleteMany({});
        await User.deleteMany({});
        await News.deleteMany({});
        await Event.deleteMany({});
        await Fixture.deleteMany({});
        await Gallery.deleteMany({});
        await Registration.deleteMany({});
        console.log('✅ Collections cleared.');

        // 2. Seed Wings
        console.log('🌱 Seeding Wings...');
        const wings = await Wing.insertMany([
            {
                name: 'Kawoosa Senior Wing',
                ground: 'Kawoosa Sports Ground',
                founded: 2018,
                description: 'The senior division for players aged 18 and above.',
                color_accent: '#00FF87'
            },
            {
                name: 'Khalisa Junior Wing',
                ground: 'Khalisa Ground',
                founded: 2020,
                description: 'Development wing for young talents aged 12-17.',
                color_accent: '#FFD700'
            },
            {
                name: 'Narbal Sub-Junior Wing',
                ground: 'Narbal Stadium',
                founded: 2022,
                description: 'Grassroots program for children under 12.',
                color_accent: '#00D1FF'
            }
        ]);
        console.log(`✅ Seeded ${wings.length} wings.`);

        // 3. Seed Users (Admin)
        console.log('🌱 Seeding Admin User...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'KKFA Admin',
            email: 'admin@kkfa.com',
            password: hashedPassword,
            role: 'Super Admin',
            avatar: 'https://ui-avatars.com/api/?name=KKFA+Admin&background=00FF87&color=000'
        });
        console.log('✅ Seeded Admin User (Email: admin@kkfa.com, Password: admin123).');

        // 4. Seed Coaches
        console.log('🌱 Seeding Coaches...');
        await Coach.insertMany([
            {
                name: 'Ishfaq Ahmad',
                role: 'Head Coach',
                wing_id: wings[0]._id,
                bio: 'Former professional player with 15 years of experience.',
                qualifications: 'AFC A License',
                experience_yrs: 10,
                photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishfaq'
            },
            {
                name: 'Zameer Uddin',
                role: 'Junior Coach',
                wing_id: wings[1]._id,
                bio: 'Passionate about developing young grassroots talent.',
                qualifications: 'AFC C License',
                experience_yrs: 5,
                photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zameer'
            }
        ]);

        // 5. Seed Players
        console.log('🌱 Seeding Players...');
        await Player.insertMany([
            {
                name: 'Sameer Dar',
                dob: new Date('2005-05-15'),
                gender: 'Male',
                wing_id: wings[0]._id,
                position: 'Forward',
                jersey_no: 10,
                school: 'Kawoosa Higher Secondary',
                parent_contact: '9906XXXXXX',
                photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player1'
            },
            {
                name: 'Abrar Bhat',
                dob: new Date('2008-08-20'),
                gender: 'Male',
                wing_id: wings[1]._id,
                position: 'Midfielder',
                jersey_no: 8,
                school: 'Khalisa Public School',
                parent_contact: '7006XXXXXX',
                photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player2'
            }
        ]);

        // 6. Seed News & Events
        console.log('🌱 Seeding News and Events...');
        await News.create({
            title: 'KKFA Wins Regional Championship',
            excerpt: 'Our senior wing secures a historic victory.',
            content: 'Full story about the historic win...',
            image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
            status: 'Published'
        });

        await Event.create({
            title: 'Annual Trials 2024',
            description: 'Scouting new talents.',
            event_date: new Date('2024-06-15T10:00:00'),
            location: 'Kawoosa Main Ground',
            type: 'Trial'
        });

        // 7. Seed Registrations
        console.log('🌱 Seeding Registrations...');
        await Registration.create({
            player_name: 'Imran Khan',
            dob: new Date('2010-01-01'),
            gender: 'Male',
            wing_id: wings[1]._id,
            position: 'Goalkeeper',
            parent_name: 'Nazir Ahmed',
            phone: '889XXXXXXX',
            address: 'Main Town Kawoosa',
            terms_accepted: true,
            status: 'Pending'
        });

        console.log('\n🌟 DATABASE SEEDED SUCCESSFULLY! 🌟');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
