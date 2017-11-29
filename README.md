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
