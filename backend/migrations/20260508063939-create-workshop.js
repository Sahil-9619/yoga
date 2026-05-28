'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Workshops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      photo: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      time: {
        type: Sequelize.STRING
      },
      mode: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      platform: {
        type: Sequelize.STRING
      },
      priceType: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL
      },
      groupPrice: {
        type: Sequelize.DECIMAL
      },
      personalPrice: {
        type: Sequelize.DECIMAL
      },
      singleSessionPrice: {
        type: Sequelize.DECIMAL
      },
      scheduleInfo: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Workshops');
  }
};