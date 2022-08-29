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
    description: "Adorable home that is move-in ready and waiting for you to put your own personal touches on.",
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
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards.",
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
    description: "The first floor features a lovely, spacious living room with a fireplace.",
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
    description: "Fabulous location, walking distance to the prestigious Roxbury Latin School.",
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
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards!",
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
    description: "Stroll to beach, Gayles bakery, parks, schools & churches from this adorable beach home!",
    price: 600,
  },
  {
    ownerId: 7,
    address: "7 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 57.7657358,
    lng: -522.4730727,
    name: "House 7",
    description: "Adorable home that is move-in ready and waiting for you to put your own personal touches on.",
    price: 700,
  },
  {
    ownerId: 8,
    address: "8 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 70.9445858,
    lng: -380.6730385,
    name: "House 8",
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards that are super sunny.",
    price: 800,
  },
  {
    ownerId: 9,
    address: "9 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -591.4487927,
    name: "House 9",
    description: "The first floor features a lovely, spacious living room with a fireplace.",
    price: 900,
  },
  {
    ownerId: 10,
    address: "10 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.76108618,
    lng: -5101.1010871027,
    name: "House 10",
    description: "Fabulous location, walking distance to the prestigious Roxbury Latin School.",
    price: 1000,
  },
  {
    ownerId: 11,
    address: "11 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.7648618,
    lng: -11111.44871127,
    name: "House 11",
    description: "The indoor/outdoor living is ideal from this sunny locale with front, side and backyards!",
    price: 1100,
  },
  {
    ownerId: 12,
    address: "12 Dyker Ave",
    city: "Brooklyn",
    state: "New York",
    country: "United States of America",
    lat: 82.712481218,
    lng: -5121.44871227,
    name: "House 12",
    description: "Stroll to beach, Gayles bakery, parks, schools & churches from this adorable beach home!",
    price: 1200,
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', spots, {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['House1', 'House2', 'House3', 'House4', 'House5', 'House6', 'House7', 'House8', 'House9', 'House10', 'House11', 'House12'] }
    })
  }
};
