const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  author: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Admin'
  },
  status: {
    type: DataTypes.ENUM('Published', 'Draft'),
    defaultValue: 'Published'
  }
}, {
  timestamps: true,
  tableName: 'news'
});

module.exports = News;
