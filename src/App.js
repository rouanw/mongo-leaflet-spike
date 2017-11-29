import React, { Component } from 'react';
import logo from './logo.svg';
import Map from './Map.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spike with MongoDB geo-spatial queries and Leaflet.js</h1>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
                integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
                crossOrigin=""
          />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.13/leaflet.draw.css"/>
        </header>
        <Map />
      </div>
    );
  }
}

export default App;
