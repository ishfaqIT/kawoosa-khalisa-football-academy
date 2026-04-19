const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: 'Male'
  },
  wing_id: {
    type: DataTypes.INTEGER,
  },
  position: {
    type: DataTypes.STRING,
  },
  photo_url: {
    type: DataTypes.STRING,
  },
  jersey_no: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING, // Active, Inactive, Trial
    defaultValue: 'Active'
  },
  bio: {
    type: DataTypes.TEXT,
  },
  school: {
    type: DataTypes.STRING,
  },
  parent_contact: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
  tableName: 'players'
});

module.exports = Player;
