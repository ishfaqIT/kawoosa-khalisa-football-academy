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

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGO_URI_ATLAS;

if (!MONGODB_URI) {
    console.error('❌ Error: MONGODB_URI is not defined in your .env file.');
    process.exit(1);
}

const seedData = async () => {
    try {
        console.log('🔗 Connecting to Vercel/Atlas Database...');
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4 // Force IPv4
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
        const coaches = await Coach.insertMany([
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
        console.log(`✅ Seeded ${coaches.length} coaches.`);

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
            },
            {
                name: 'Umar Rashid',
                dob: new Date('2006-11-10'),
                gender: 'Male',
                wing_id: wings[0]._id,
                position: 'Defender',
                jersey_no: 4,
                school: 'Govt Boys School',
                parent_contact: '9149XXXXXX',
                photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Player3'
            }
        ]);
        console.log('✅ Seeded initial players.');

        // 6. Seed News
        console.log('🌱 Seeding News...');
        await News.insertMany([
            {
                title: 'KKFA Wins Regional Championship',
                excerpt: 'Our senior wing secures a historic victory in the district league.',
                content: 'Full story about the historic win...',
                image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
                status: 'Published'
            },
            {
                title: 'Traing Camp Starts Next Week',
                excerpt: 'Annual football training camp registration is now open.',
                content: 'Details about the training camp and schedule...',
                image_url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80',
                status: 'Published'
            }
        ]);
        console.log('✅ Seeded news items.');

        // 7. Seed Events
        console.log('🌱 Seeding Events...');
        await Event.insertMany([
            {
                title: 'Annual Trials 2024',
                description: 'Scouting new talents for the upcoming season.',
                event_date: new Date('2024-06-15T10:00:00'),
                location: 'Kawoosa Main Ground',
                type: 'Trial'
            },
            {
                title: 'Friendly Match: KKFA vs Budgam FC',
                description: 'A pre-season friendly match.',
                event_date: new Date('2024-05-20T16:00:00'),
                location: 'Khalisa Ground',
                type: 'Match'
            }
        ]);
        console.log('✅ Seeded events.');

        // 8. Seed Fixtures
        console.log('🌱 Seeding Fixtures...');
        await Fixture.insertMany([
            {
                home_team: 'KKFA Seniors',
                away_team: 'Srinagar United',
                match_date: new Date('2024-05-10T15:30:00'),
                location: 'Srinagar Stadium',
                competition: 'District League',
                status: 'Upcoming'
            },
            {
                home_team: 'Baramulla Warriors',
                away_team: 'KKFA Seniors',
                match_date: new Date('2024-04-15T16:00:00'),
                location: 'Baramulla Ground',
                competition: 'Friendly Cup',
                status: 'Completed',
                home_score: 1,
                away_score: 2
            }
        ]);
        console.log('✅ Seeded fixtures.');

        // 9. Seed Gallery
        console.log('🌱 Seeding Gallery...');
        await Gallery.insertMany([
            {
                title: 'Training Session',
                image_url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=80',
                category: 'Training',
                description: 'Daily training routine'
            },
            {
                title: 'Match Day Vibes',
                image_url: 'https://images.unsplash.com/photo-1560272564-c8340df0ed10?w=800&q=80',
                category: 'Matches',
                description: 'Fans and players'
            }
        ]);
        console.log('✅ Seeded gallery items.');

        // 10. Seed Registrations
        console.log('🌱 Seeding Registrations...');
        await Registration.insertMany([
            {
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
            }
        ]);
        console.log('✅ Seeded registrations.');

        console.log('\n🌟 DATABASE SEEDED SUCCESSFULLY! 🌟');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
