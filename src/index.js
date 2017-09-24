import './index.css';
import config from './config.json';
import L from 'leaflet';

function resolveGeolactionPromise(resolve) {
  navigator.geolocation.getCurrentPosition((position) => {
    document.getElementById('status').innerHTML = `You're at: ${position.coords.latitude} (lat) / ${position.coords.longitude} (long)`;

    localStorage.location = JSON.stringify({
      timestamp: position.timestamp,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });

    resolve(position.coords);
  });
}

// TODO force refresh from query parameter
function getUserCoordinates() {
  const localStoreLocation = localStorage.getItem('location') ? JSON.parse(localStorage.getItem('location')) : null;
  const hasExistingStore = localStoreLocation && localStoreLocation.timestamp && localStoreLocation.coords;

  if (hasExistingStore) {
    const millisecondsInDay = 86400 * 1000;
    const userForcedRefresh = false;
    const hasStaleStoreData = localStoreLocation.timestamp + millisecondsInDay <= Date.now(); // we'll refresh every 24h

    if (userForcedRefresh || hasStaleStoreData) {
      return new Promise(resolveGeolactionPromise);
    } else {
      return new Promise((resolve) => {
        resolve(localStoreLocation.coords);
      });
    }
  } else {
    return new Promise(resolveGeolactionPromise);
  }
}

function createMap(latitude, longitude) {
  const map = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${config.mapboxApiKey}`, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>', // eslint-disable-line
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: config.mapboxApiKey
  }).addTo(map);
}

window.addEventListener('load', () => {

  getUserCoordinates().then((coords) => {
    createMap(coords.latitude, coords.longitude);
  }).catch((err) => {
    console.error('uhoh....', err); // eslint-disable-line
  });

});