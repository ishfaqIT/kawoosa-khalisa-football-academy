const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { connectDB } = require('./config/db');

// Register Models
require('./models/Wing');
require('./models/User');
require('./models/Player');
require('./models/Coach');
require('./models/News');
require('./models/Event');
require('./models/Fixture');
require('./models/Gallery');
require('./models/Registration');

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
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// DB Connection Middleware for Serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ success: false, error: "Database connection failed" });
  }
});

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
app.use('/api/wings', require('./routes/wingRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.stack);
  res.status(500).json({ success: false, error: err.message || 'Internal Server Error' });
});

// Basic Route
app.get('/', (req, res) => {
  res.send('KKFA API is running...');
});

// Start Server locally
const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// Export for Vercel Serverless Functions
module.exports = app;
