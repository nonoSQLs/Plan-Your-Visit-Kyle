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
  const options = ['1', '2', '3'];
  return options[Math.ceil(Math.random() * 3) - 1];
}

function randURL() {
  return `https://tutorial90005123.s3.us-east-2.amazonaws.com/thailandPics/tripadvisor_thailand_${Math.floor(Math.random() * 99)}.jpg`;
}

function getRandomInt(max) {
  return (Math.random() * Math.floor(max)).toFixed(2);
}

const adventures = [];

const writeCSV = (start, end) => {
  for (let i = start; i <= end; i += 1) {
    const adventure = {
      adventure_id: i,
      image: randURL(),
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
};

const subcategories = [];

const writeSubcatCSV = (start, end) => {
  for (let i = start; i <= end; i += 1) {
    const subcategory = {
      adventure_id: i,
      subcategory_id: randSubcategory(),
    };
    subcategories.push(subcategory);
  }

  const subcategoriesJSON = JSON.stringify(subcategories);
  const subcategoriesCSV = ConvertToCSV(subcategoriesJSON);

  fs.appendFile('./subcategories.csv', subcategoriesCSV, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

writeSubcatCSV(1, 10000000);
console.log('10 million!');

writeCSV(1, 1000000);
console.log('1 million');
writeCSV(1000001, 2000000);
console.log('2 million');
writeCSV(2000001, 3000000);
console.log('3 million');
writeCSV(3000001, 4000000);
console.log('4 million');
writeCSV(4000001, 5000000);
console.log('5 million');
writeCSV(5000001, 6000000);
console.log('6 million');
writeCSV(6000001, 7000000);
console.log('7 million');
writeCSV(7000001, 8000000);
console.log('8 million');
writeCSV(8000001, 9000000);
console.log('9 million');
writeCSV(9000001, 10000000);
console.log('10 million!');
