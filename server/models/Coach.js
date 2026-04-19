const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Coach = sequelize.define('Coach', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING, // Head Coach, Wing Coach, Scout, etc.
    allowNull: false
  },
  wing_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  photo_url: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  qualifications: {
    type: DataTypes.TEXT,
  },
  experience_yrs: {
    type: DataTypes.INTEGER,
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'coaches'
});

module.exports = Coach;
