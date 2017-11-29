# Finding polygons containing a point

> Spike with MongoDB geo-spatial queries and Leaflet.js

## Using the spike

### Get everything running

```sh
yarn install
yarn start # to get the front-end running
yarn dev # to get the server running
```

### Draw some polygons

```sh
open http://localhost:3000
```

Draw some polygons on the map. They will be inserted in Mongo in GeoJSON format.

### Query the data

`POST` to `http://localhost:3001/search` with the latitude and longitude of a point you want to search with. Example:

```sh
curl -H "Content-Type: application/json" -X POST -d '{"lat":"-1.5","long":"52.085"}' http://localhost:3001/search
```

Or if you have `httpie` installed:

```sh
http post http://localhost:3001/search lat=-1.5 long=52.085
```

## What I learnt

- You'll need to include both the `leaflet` and `leaflet-draw` npm packages.
- There are some useful `React` wrappers for Leaflet. This spike uses `react-leaflet` and `react-leaflet-draw`
- There are two CSS files that need to be included for the map to display properly: one for leaflet and one for leaflet draw - See `App.js`
- Data must be stored in GeoJSON, but can be nested within a larger document. Leaflet provides a function to get data in this format - see `Map.js`. Example data structure:

```json
{
  "_id": {
    "$oid": "5a1e8e9e02c9357a111a4e35"
  },
  "location": {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [-2.966309, 52.908902],
          [-1.07666, 52.928775],
          [-1.175537, 52.079506],
          [-2.537842, 52.086257],
          [-2.966309, 52.908902]
        ]
      ]
    }
  },
  "name": "Mary Estrada"
}
```

- You need to create a `2dsphere` index in Mongo. See `server.js`.
- The co-ordinates of the point you're querying with must also be provided in GeoJSON format. This means latitude comes first. See `server.js`.
- If we wanted to use Google Maps instead of leaflet, we'd need to make sure that our current agreement with Google allows us to use their maps on pages that are limited to certain users. See https://developers.google.com/maps/terms#9-license-requirements and https://enterprise.google.com/maps/.

## Useful links

- https://docs.mongodb.com/manual/geospatial-queries/
- https://docs.mongodb.com/manual/reference/operator/query/geoIntersects/
- http://leafletjs.com/examples/quick-start/
- http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html
- https://github.com/alex3165/react-leaflet-draw/blob/master/example/edit-control.js
