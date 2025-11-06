'use strict';
module.exports = (sequelize, DataTypes) => {
  const QtyDetail = sequelize.define('QtyDetail', {
    productQrcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});

  QtyDetail.associate = function(models) {
    QtyDetail.belongsTo(models.Product, {
      foreignKey: 'productQrcode',
      targetKey: 'qrcode',
      as: 'product',
    });

    QtyDetail.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer',
    });

    QtyDetail.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      as: 'vendor',
    });
  };

  return QtyDetail;
};
