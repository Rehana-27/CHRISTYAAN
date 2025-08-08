const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const meditations = sequelize.define(
    'meditations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

title: {
        type: DataTypes.TEXT,

      },

content: {
        type: DataTypes.TEXT,

      },

published_at: {
        type: DataTypes.DATE,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  meditations.associate = (db) => {

    db.meditations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.meditations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return meditations;
};

