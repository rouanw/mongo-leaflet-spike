// Based on example from https://github.com/alex3165/react-leaflet-draw/blob/master/example/edit-control.js
import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import reqwest from 'reqwest';

export default class EditControlExample extends Component {

  _onCreate(e) {
    reqwest({
      type: 'json',
      contentType: 'application/json',
      headers: { accept: 'application/json' },
      timeout: 10000,
      url: `/geo-json`,
      method: 'post',
      data: JSON.stringify(e.layer.toGeoJSON()),
    });
  }

  render() {
    return (
      <Map center={[52, -1]} zoom={7} className="themap">
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <FeatureGroup>
            <EditControl
              position='topright'
              onCreated={this._onCreate}
              draw={{
                polyline: false,
                rectangle: false,
                circle: false,
                marker: false,
                circlemarker: false,
              }}
              edit={{
                edit: false,
                remove: false,
              }}
            />
        </FeatureGroup>
      </Map>
    );
  }
}
