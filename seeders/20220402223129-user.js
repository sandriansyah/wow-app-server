'use strict';
const bcrypt = require("bcrypt")
const salt = await bcrypt.genSalt(10)
const hashedPassword = bcrypt.hash("12345678",salt)

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email:'erma@gmail.com',
          password: hashedPassword, //12345678
          status:'admin',
          fullName:"erma suryani",
          createdAt:"12-03-2022",
          updatedAt:"12-03-2022"
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
