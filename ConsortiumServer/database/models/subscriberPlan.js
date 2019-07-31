'use strict';
module.exports = (sequelize, DataTypes) => {
  const subscriberPlan = sequelize.define('subscriberPlan', {
    uniqueId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },

    credits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    dataUsage: {
      type: DataTypes.FLOAT,
      allowNull: true

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
  subscriberPlan.associate = function(models) {
    subscriberPlan.belongsTo(models.organization, {
      foreignKey: 'organization_id'
    });

    subscriberPlan.hasMany(models.paymentLog, {
      foreignKey: "subscriberPlan"
    })
  };
  return subscriberPlan;
};
