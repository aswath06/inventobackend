'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QtyDetails', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      productQrcode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'qrcode',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      vendorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vendors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    // optional index for quick lookups
    await queryInterface.addIndex('QtyDetails', ['productQrcode']);
    await queryInterface.addIndex('QtyDetails', ['customerId']);
    await queryInterface.addIndex('QtyDetails', ['vendorId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QtyDetails');
  },
};
