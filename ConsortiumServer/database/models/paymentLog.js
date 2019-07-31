'use strict';
module.exports = (sequelize, DataTypes) => {
  const paymentLog = sequelize.define('paymentLog', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    mode: {
      allowNull: true,
      type: DataTypes.STRING,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {});
  paymentLog.associate = function(models) {
    paymentLog.belongsTo(models.organization, {
      foreignKey: 'organization_id'
    });
  };
  return paymentLog;
};
