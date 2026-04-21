const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Wing = require('../models/Wing');
const User = require('../models/User');
const Player = require('../models/Player');
const Coach = require('../models/Coach');
const News = require('../models/News');
const Event = require('../models/Event');
const Fixture = require('../models/Fixture');
const Gallery = require('../models/Gallery');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/kkfa_db';

async function seedData() {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB for seeding.');

    // Clear existing data
    await Wing.deleteMany({});
    await User.deleteMany({});
    await Player.deleteMany({});
    await Coach.deleteMany({});
    await News.deleteMany({});
    await Event.deleteMany({});
    await Fixture.deleteMany({});
    await Gallery.deleteMany({});
    console.log('🗑️ Cleared existing data.');

    // Seed Wings
    const kawoosa = await Wing.create({
      name: 'Kawoosa Khalisa Wing',
      ground: 'Kawoosa Main Stadium',
      founded: 2020,
      description: 'The central hub of KKFA operations.',
      color_accent: '#00FF87'
    });

    const kunzer = await Wing.create({
      name: 'Kunzer Wing',
      ground: 'Kunzer Sports Ground',
      founded: 2022,
      description: 'Our high-altitude training facility.',
      color_accent: '#FF3E3E'
    });
    console.log('✅ Wings seeded.');

    // Seed Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'KKFA Admin',
      email: 'admin@kkfa.com',
      password: hashedPassword,
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    });
    console.log('✅ Admin user seeded (admin@kkfa.com / admin123).');

    // Seed Coaches
    const coaches = await Coach.insertMany([
      {
        name: 'Ishfaq Ahmad',
        role: 'Head Coach',
        wing_id: kawoosa._id,
        photo_url: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400',
        bio: 'Pro licensed coach with 10 years of experience.',
        qualifications: 'AFC A License',
        experience_yrs: 10,
        is_active: true
      },
      {
        name: 'Suhail Mir',
        role: 'Technical Director',
        wing_id: kawoosa._id,
        photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        bio: 'Expert in youth development and scouting.',
        qualifications: 'AFC B License',
        experience_yrs: 7,
        is_active: true
      }
    ]);
    console.log('✅ Coaches seeded.');

    // Seed Players
    await Player.insertMany([
      {
        name: 'Adil Ahmad',
        dob: '2008-05-12',
        wing_id: kawoosa._id,
        position: 'Forward',
        jersey_no: 10,
        photo_url: 'https://images.unsplash.com/photo-1543326173-0761358997a0?auto=format&fit=crop&q=80&w=400',
        bio: 'Fast and technical striker.',
        status: 'Active',
        school: 'Kawoosa Higher Secondary',
        parent_contact: '9876543210'
      },
      {
        name: 'Sahil Mir',
        dob: '2009-08-20',
        wing_id: kunzer._id,
        position: 'Midfielder',
        jersey_no: 8,
        photo_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400',
        bio: 'Creative playmaker with great vision.',
        status: 'Active',
        school: 'Kunzer Public School',
        parent_contact: '9123456789'
      }
    ]);
    console.log('✅ Players seeded.');

    // Seed News
    await News.insertMany([
      {
        title: 'U-17 Team Wins District Championship',
        excerpt: 'A stellar performance by the Kawoosa Wing earns the prestigious cup.',
        content: 'In a thrilling final match against Valley United, the KKFA Kawoosa Wing secured a 3-1 victory. Head Coach praised the discipline and tactical execution of the players.',
        image_url: 'https://images.unsplash.com/photo-1518605368461-1ee7e16120e2?auto=format&fit=crop&q=80&w=600',
        author: 'Admin',
        status: 'Published'
      },
      {
        title: 'Saying No to Drugs through Sports',
        excerpt: 'KKFA launches a new community initiative.',
        content: 'True to our theme "Young Kashmir, Healthy Kashmir", KKFA has conducted seminars and free trial sessions aiming to empower local youth.',
        image_url: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&q=80&w=600',
        author: 'Admin',
        status: 'Published'
      }
    ]);
    console.log('✅ News seeded.');

    // Seed Events
    await Event.insertMany([
      {
        title: 'Kunzer High-Altitude Training Camp',
        description: 'Intensive 5-day conditional and tactical preparation clinic.',
        event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        location: 'Kunzer Pitch',
        type: 'Training',
        image_url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=600'
      }
    ]);
    console.log('✅ Events seeded.');

    // Seed Fixtures
    await Fixture.insertMany([
      {
        home_team: 'KKFA Kawoosa',
        away_team: 'Royal FC',
        match_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        location: 'Kawoosa Home Ground',
        competition: 'Regional League',
        status: 'Upcoming'
      },
      {
        home_team: 'Elite Academy',
        away_team: 'KKFA Kunzer',
        match_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        location: 'Srinagar Central',
        competition: 'Valley Cup',
        status: 'Completed',
        home_score: 1,
        away_score: 2
      }
    ]);
    console.log('✅ Fixtures seeded.');

    // Seed Gallery
    await Gallery.insertMany([
      {
        title: 'Academy Training',
        image_url: 'https://images.unsplash.com/photo-1510566334573-fb3ffbc129ac?auto=format&fit=crop&q=80&w=800',
        category: 'Training'
      },
      {
        title: 'Action Shot',
        image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
        category: 'Matches'
      }
    ]);
    console.log('✅ Gallery seeded.');

    console.log('\n🌟 DATABASE SEEDING COMPLETED SUCCESSFULLY! 🌟');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedData();
