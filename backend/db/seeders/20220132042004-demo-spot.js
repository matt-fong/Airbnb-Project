'use strict';

const spots = [
  {
    ownerId: 1,
    address: "1 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 57.7651358,
    lng: -522.4730121,
    name: "House 1",
    description: "Spot 1",
    price: 100,
  },
  {
    ownerId: 2,
    address: "2 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 70.9445258,
    lng: -380.6730325,
    name: "House 2",
    description: "Spot 2",
    price: 200,
  },
  {
    ownerId: 3,
    address: "3 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -531.4487327,
    name: "House 3",
    description: "Spot 3",
    price: 300,
  },
  {
    ownerId: 4,
    address: "4 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -541.4487427,
    name: "House 4",
    description: "Spot 4",
    price: 400,
  },
  {
    ownerId: 5,
    address: "5 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -551.4487527,
    name: "House 5",
    description: "Spot 5",
    price: 500,
  },
  {
    ownerId: 6,
    address: "6 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -561.4487627,
    name: "House 6",
    description: "Spot 6",
    price: 600,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['House1', 'House2', 'House3', 'House4', 'House5', 'House6'] }
    })
  }
};
