'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          name: '홍길동',
          age: '19',
        },
        {
          id: 2,
          name: '고길동',
          age: '15',
        },
        {
          id: 3,
          name: '둘리',
          age: '7',
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
