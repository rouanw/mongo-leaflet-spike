const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3001);

const MongoClient = require('mongodb');
const baseUrl = 'mongodb://localhost:27017';

const connection = MongoClient.connect(`${baseUrl}/geo_spike`);

app.post('/geo-json', (req, res) => {
  connection
  .then((db) => {
    const collection = db.collection('places');
    collection.insert(req.body)
      .then((result) => {
        console.log(`Successfully inserted ${result.result.n} records`);
        db.close();
      })
      .catch((err) => {
        console.error('Failed to insert shifts');
        db.close();
      });
  })
  .then(() => res.send('Saved'));
});

app.listen(app.get('port'), () => console.log(`Express listening on port ${app.get('port')}`));
