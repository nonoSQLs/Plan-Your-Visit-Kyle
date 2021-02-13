/* eslint-disable no-console */
// const { Client } = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: '18.188.139.60',
//   database: 'sdc',
//   password: 'kp7188',
//   port: 5432,
// });

// client.connect();
// console.log('=============== Connected to PostgreSQL ===============');
// module.exports = client;

const { Pool } = require('pg');

const client = new Pool({
  user: 'postgres',
  host: '18.188.139.60',
  database: 'sdc',
  password: 'kp7188',
  port: 5432,
  max: 2000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

client.connect();
console.log('=============== Connected to PostgreSQL Pool ===============');
module.exports = client;
