/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */

const faker = require('faker');
const fs = require('fs');

const ConvertToCSV = (objArray) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i += 1) {
    let line = '';
    for (const index in array[i]) {
      if (line !== '') {
        line += ',';
      }
      line += array[i][index];
    }
    str += (`${line}\r\n`);
  }
  return str;
};

function randSubcategory() {
  const options = ['Tours & Sightseeing', 'Private & Custom Tours', 'Outdoor Adventures'];
  return options[Math.ceil(Math.random() * 3) - 1];
}

function getRandomInt(max) {
  return (Math.random() * Math.floor(max)).toFixed(2);
}

const adventures = [];

// for (let i = 0; i < 1000000; i += 1) {
// for (let i = 1000000; i < 2000000; i += 1) {
// for (let i = 2000000; i < 3000000; i += 1) {
// for (let i = 3000000; i < 4000000; i += 1) {
// for (let i = 4000000; i < 5000000; i += 1) {
// for (let i = 5000000; i < 6000000; i += 1) {
// for (let i = 6000000; i < 7000000; i += 1) {
// for (let i = 7000000; i < 8000000; i += 1) {
// for (let i = 8000000; i < 9000000; i += 1) {
for (let i = 9000000; i < 10000000; i += 1) {
  const adventure = {
    Adventure_ID: i,
    image: faker.image.people(),
    name: faker.address.streetName(),
    price: `$${faker.commerce.price()}`,
    rating: getRandomInt(5),
    timesBooked: faker.random.number(),
    reviews: faker.random.number(),
    liked: false,
    overview: faker.lorem.paragraph(),
    subcategory: randSubcategory(),
  };
  adventures.push(adventure);
}

const adventuresJSON = JSON.stringify(adventures);
const adventuresCSV = ConvertToCSV(adventuresJSON);

fs.appendFile('./adventures.csv', adventuresCSV, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
