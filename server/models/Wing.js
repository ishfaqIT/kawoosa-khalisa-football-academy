const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Wing = sequelize.define('Wing', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ground: {
    type: DataTypes.STRING,
  },
  founded: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
  },
  color_accent: {
    type: DataTypes.STRING,
    defaultValue: '#00FF87'
  }
}, {
  timestamps: true,
  tableName: 'wings'
});

module.exports = Wing;
