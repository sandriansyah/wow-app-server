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
      'users',
      [
        {
          email:'erma@gmail.com',
          password: '$2b$10$7ovHDrtaMe.FmutXxEhnWOo7rDOdTloUMgqms5RXYmL5/4dfM.OTm', //123456
          status:'admin',
          fullName:"erma suryani",
          createdAt:"12-03-2022",
          updatedAt:"12-03-2022"
        },
      ],    
      {}
    )

    await queryInterface.bulkInsert(
      'profiles',
      [
        {
          gender: 'female',
          address: 'Banjaran',
          fotoProfile: 'erma.jpeg',
          phoneNumber: '123456789',
          idUser: 2,
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
