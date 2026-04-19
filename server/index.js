const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');

// Models
const User = require('./models/User');
const Wing = require('./models/Wing');
const Coach = require('./models/Coach');
const Player = require('./models/Player');
const News = require('./models/News');
const Event = require('./models/Event');
const Fixture = require('./models/Fixture');
const Registration = require('./models/Registration');
const Gallery = require('./models/Gallery');

// Associations
Wing.hasMany(Coach, { foreignKey: 'wing_id' });
Coach.belongsTo(Wing, { foreignKey: 'wing_id' });

Wing.hasMany(Player, { foreignKey: 'wing_id' });
Player.belongsTo(Wing, { foreignKey: 'wing_id' });

Wing.hasMany(Registration, { foreignKey: 'wing_id' });
Registration.belongsTo(Wing, { foreignKey: 'wing_id' });

const app = express();

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes
app.use('/api/players', require('./routes/playerRoutes'));
app.use('/api/coaches', require('./routes/coachRoutes'));
app.use('/api/news', require('./routes/newsRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/fixtures', require('./routes/fixtureRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/register', require('./routes/registrationRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.stack);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('KKFA API is running...');
});

// Sync Database (Vercel Serverless environments might not need full sync on every request)
connectDB();
if (process.env.NODE_ENV === 'development') {
  sequelize.sync({ alter: true }).then(() => {
    console.log('✅ Database models synced.');
  }).catch(err => console.error('Error syncing models', err));
}

// Start Server locally
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel Serverless Functions
module.exports = app;

