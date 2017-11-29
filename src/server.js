const express = require('express');
const chance = require('chance').Chance();
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);

const MongoClient = require('mongodb');
const baseUrl = 'mongodb://localhost:27017';

const connection = MongoClient.connect(`${baseUrl}/geo_spike`);
let _db;
let _collection;

app.post('/geo-json', (req, res) => {
  _collection.insert({ location: req.body, name: chance.name() })
    .then((result) => {
      console.log(`Successfully inserted ${result.result.n} records`);
    })
    .catch((err) => {
      console.error('Failed to insert shifts');
    })
    .then(() => res.send('Saved'));
});

app.post('/search', (req, res) => {
  console.log('searching...')
  _collection.find({
    'location.geometry': {
      $geoIntersects: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(req.body.lat), parseFloat(req.body.long)]
       },
      }
    }
  })
  .toArray()
  .then((result) => res.send(result))
});

connection.then((db) => {
  _db = db;
  _collection = _db.collection('places');
  _collection.createIndex({ 'location.geometry': '2dsphere' })
  .then(() => {
    app.listen(app.get('port'), () => console.log(`Express listening on port ${app.get('port')}`));
  });
});
