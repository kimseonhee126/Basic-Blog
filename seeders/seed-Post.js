'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // 쿼리문 조회
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;'
    );
    const userId = users[0].map(user => user.id);

    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'first blog',
          content: 'first blog',
          writer: '둘리',
          writerId: userId[2].id
        },
        {
          title: 'second blog',
          content: 'second blog',
          writer: '홍길동',
          writerId: userId[0].id
        },
        {
          title: 'third blog',
          content: 'third blog',
          writer: '둘리',
          writerId: userId[1].id
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
