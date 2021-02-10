/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc',
  password: 'kp7188',
  port: 5432,
});

client.connect();
console.log('=============== Connected to PostgreSQL ===============');
const query = 'SELECT * FROM adventures WHERE adventure_id=9334244';
client.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.rows[0]);
});

module.exports = client;
