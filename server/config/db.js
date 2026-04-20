const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = process.env.POSTGRES_URL 
  ? new Sequelize(process.env.POSTGRES_URL, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false, // Set to true to see SQL queries
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );


const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    // process.exit(1); // Do not exit in serverless environments like Vercel
  }
};

module.exports = { sequelize, connectDB };
