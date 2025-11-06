'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Customer.associate = function(models) {
    Customer.hasMany(models.QtyDetail, {
      foreignKey: 'customerId',
      as: 'qtyDetails',
    });
  };

  return Customer;
};
