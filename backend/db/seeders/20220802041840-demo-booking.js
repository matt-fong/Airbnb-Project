'use strict';

const bookings = [
 {
   spotId: 1,
   userId: 2,
   startDate: '2022-02-12',
   endDate: '2022-02-14',
 },
 {
   spotId: 2,
   userId: 1,
   startDate: '2022-07-04',
   endDate: '2022-07-14',
 },
 {
   spotId: 3,
   userId: 3,
   startDate: '2022-03-11',
   endDate: '2022-04-11',
 },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', bookings, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3] }
    })
  }
};