/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: '18.188.139.60',
  database: 'sdc',
  password: 'kp7188',
  port: 5432,
});

client.connect();
console.log('=============== Connected to PostgreSQL ===============');
module.exports = client;
