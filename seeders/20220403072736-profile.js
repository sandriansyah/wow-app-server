'use strict';

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
      'profiles',
      [
        {
          gender: 'female',
          address: 'Banjaran',
          fotoProfile: 'erma.jpeg',
          phoneNumber: '123456789',
          idUser: 1,
          createdAt:"12-03-2022",
          updatedAt:"12-03-2022"
        }
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
