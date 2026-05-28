'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Workshops');
    
    if (!tableInfo.groupPrice) {
      await queryInterface.addColumn('Workshops', 'groupPrice', {
        type: Sequelize.DECIMAL
      });
    }
    if (!tableInfo.personalPrice) {
      await queryInterface.addColumn('Workshops', 'personalPrice', {
        type: Sequelize.DECIMAL
      });
    }
    if (!tableInfo.singleSessionPrice) {
      await queryInterface.addColumn('Workshops', 'singleSessionPrice', {
        type: Sequelize.DECIMAL
      });
    }
    if (!tableInfo.scheduleInfo) {
      await queryInterface.addColumn('Workshops', 'scheduleInfo', {
        type: Sequelize.STRING
      });
    }
    if (!tableInfo.frequency) {
      await queryInterface.addColumn('Workshops', 'frequency', {
        type: Sequelize.STRING
      });
    }
    if (!tableInfo.duration) {
      await queryInterface.addColumn('Workshops', 'duration', {
        type: Sequelize.STRING
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Workshops');

    if (tableInfo.groupPrice) {
      await queryInterface.removeColumn('Workshops', 'groupPrice');
    }
    if (tableInfo.personalPrice) {
      await queryInterface.removeColumn('Workshops', 'personalPrice');
    }
    if (tableInfo.singleSessionPrice) {
      await queryInterface.removeColumn('Workshops', 'singleSessionPrice');
    }
    if (tableInfo.scheduleInfo) {
      await queryInterface.removeColumn('Workshops', 'scheduleInfo');
    }
    if (tableInfo.frequency) {
      await queryInterface.removeColumn('Workshops', 'frequency');
    }
    if (tableInfo.duration) {
      await queryInterface.removeColumn('Workshops', 'duration');
    }
  }
};
