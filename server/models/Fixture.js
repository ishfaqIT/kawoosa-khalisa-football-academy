const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Fixture = sequelize.define('Fixture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  home_team: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  away_team: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  match_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  competition: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Upcoming', 'Completed', 'Postponed', 'Cancelled'),
    defaultValue: 'Upcoming'
  },
  home_score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  away_score: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'fixtures'
});

module.exports = Fixture;
