import './index.css';
import config from './config.json';
import L from 'leaflet';
console.log('L', L);  // eslint-disable-line

function createMap(latitude, longitude) {
  const map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${config.mapboxApiKey}`, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>', // eslint-disable-line
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.mapboxApiKey
  }).addTo(map);
}

navigator.geolocation.getCurrentPosition((obj) => {
  const coords = obj.coords;

  document.getElementById('status').innerHTML = `You're at: ${coords.latitude} * ${obj.coords.longitude}`;
  createMap(coords.latitude, coords.longitude);
});