require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const client = require('../database/pgConnect.js');

const app = express();

const PORT = 8080;
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/api/recommended', (req, res) => {
  client.query('SELECT * FROM adventures LIMIT 100', (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(response.rows);
    }
  });
});

app.get('/api/recommended/:id', (req, res) => {
  const { id } = req.params;
  client.query(`SELECT * FROM adventures WHERE adventure_id=${id}`, (err, response) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(response.rows[0]);
    }
  });
});

app.get('/api/recommended/hello/:num', (req, res) => {
  const { num } = req.params;
  if (num === '5') {
    client.query('SELECT * FROM adventures WHERE liked=true LIMIT 10', (err, response) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(response.rows);
      }
    });
  } else {
    // may need to fix with join table query
    if (num === '4') {
      client.query('SELECT * FROM adventures WHERE subcategory=\'Private & Custom Tours\' LIMIT 10', (err, response) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(response.rows);
        }
      });
    }
    if (num === '3') {
      client.query('SELECT * FROM adventures WHERE subcategory=\'Tours & Sightseeing\' LIMIT 10', (err, response) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(response.rows);
        }
      });
    }
    if (num === '2') {
      client.query('SELECT * FROM adventures WHERE subcategory=\'Outdoor Adventures\' LIMIT 10', (err, response) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(response.rows);
        }
      });
    }
    if (num === '1') {
      client.query('SELECT * FROM adventures LIMIT 10', (err, response) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).send(response.rows);
        }
      });
    }
  }
});

app.put('/api/recommended/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  client.query(`UPDATE adventures SET liked=not liked WHERE adventure_id=${id}`, (err, response) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(response.rows);
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
