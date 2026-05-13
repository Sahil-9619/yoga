'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Contact', 'email', {
      type: Sequelize.STRING,
      allowNull: true, // Making it true first to avoid issues with existing data, then I can change it or just leave it.
      after: 'phone'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Contact', 'email');
  }
};
