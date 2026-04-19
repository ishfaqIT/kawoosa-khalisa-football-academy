const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Player = require('../models/Player');
const Wing = require('../models/Wing');
const News = require('../models/News');
const Event = require('../models/Event');
const Fixture = require('../models/Fixture');
const Gallery = require('../models/Gallery');

async function seedData() {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
  await sequelize.sync({ force: true });
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });
  console.log('Database synced for seeding.');

  const kawoosa = await Wing.create({
    name: 'Kawoosa Khalisa Wing',
    location: 'Kawoosa, Kashmir',
    description: 'The central hub of KKFA operations.'
  });

  const kunzer = await Wing.create({
    name: 'Kunzer Wing',
    location: 'Kunzer, Kashmir',
    description: 'Our high-altitude training facility.'
  });

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'KKFA Admin',
    email: 'admin@kkfa.com',
    password: hashedPassword,
    role: 'Super Admin'
  });

  await Player.bulkCreate([
    {
      name: 'Adil Ahmad',
      dob: '2008-05-12',
      wing_id: kawoosa.id,
      position: 'Forward',
      jersey_no: 10,
      photo_url: 'https://images.unsplash.com/photo-1543326173-0761358997a0?auto=format&fit=crop&q=80&w=400',
      bio: 'Fast and technical striker.'
    },
    {
      name: 'Sahil Mir',
      dob: '2009-08-20',
      wing_id: kunzer.id,
      position: 'Midfielder',
      jersey_no: 8,
      photo_url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=400',
      bio: 'Creative playmaker with great vision.'
    },
    {
      name: 'Irfan Ganai',
      dob: '2007-11-05',
      wing_id: kawoosa.id,
      position: 'Defender',
      jersey_no: 4,
      photo_url: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=400',
      bio: 'Solid defender and team captain.'
    }
  ]);

  await News.bulkCreate([
    {
      title: 'U-17 Team Wins District Championship',
      excerpt: 'A stellar performance by the Kawoosa Wing earns the prestigious cup.',
      content: 'In a thrilling final match against Valley United, the KKFA Kawoosa Wing secured a 3-1 victory. Head Coach praised the discipline and tactical execution of the operatives.',
      image_url: 'https://images.unsplash.com/photo-1518605368461-1ee7e16120e2?auto=format&fit=crop&q=80&w=600',
      author: 'Admin',
      status: 'Published'
    },
    {
      title: 'Saying No to Drugs through Sports',
      excerpt: 'KKFA launches a new community initiative.',
      content: 'True to our theme "Young Kashmir, Healthy Kashmir", KKFA has conducted seminars and free trial sessions aiming to empower local youth towards physical excellence and away from substance abuse.',
      image_url: 'https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?auto=format&fit=crop&q=80&w=600',
      author: 'Admin',
      status: 'Published'
    }
  ]);

  await Event.bulkCreate([
    {
      title: 'Kunzer High-Altitude Training Camp',
      description: 'Intensive 5-day conditional and tactical preparation clinic.',
      event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      location: 'Kunzer Pitch',
      type: 'Training'
    },
    {
      title: 'Youth Open Trials (U-15)',
      description: 'Discovering the next generation of Kashmiri football talent. Registration required.',
      event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      location: 'Kawoosa Main Stadium',
      type: 'Trial'
    }
  ]);

  await Fixture.bulkCreate([
    {
      home_team: 'KKFA Kawoosa',
      away_team: 'Royal FC',
      match_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
      location: 'Kawoosa Home Ground',
      competition: 'Regional League',
      status: 'Upcoming'
    },
    {
      home_team: 'Elite Academy',
      away_team: 'KKFA Kunzer',
      match_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      location: 'Srinagar Central',
      competition: 'Valley Cup',
      status: 'Completed',
      home_score: 1,
      away_score: 2
    }
  ]);

  await Gallery.bulkCreate([
    {
      title: 'Championship Celebration 2024',
      image_url: 'https://images.unsplash.com/photo-1600250395353-85fbd245a909?auto=format&fit=crop&q=80&w=800',
      category: 'Matches'
    },
    {
      title: 'Morning Training Session',
      image_url: 'https://images.unsplash.com/photo-1515281239448-2abe32974fa9?auto=format&fit=crop&q=80&w=800',
      category: 'Training'
    }
  ]);

  console.log('Seeding completed.');
  process.exit();
}

seedData().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
