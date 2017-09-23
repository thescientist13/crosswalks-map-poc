import './index.css';
import config from './config.json';
import L from 'leaflet';

// TODO force refresh from query parameter
async function getUserCoordinates() {
  const localStore = localStorage.getItem('location');

  console.log('localStore', localStore); // eslint-disable-line
  const hasExistingStore = localStore && localStore.timestamp && localStore.coords;
  let coords = {};

  if (hasExistingStore) {
    const millisecondsInDay = 86400 * 1000;
    const userForcedRefresh = true;
    const hasStaleStoreData = localStore.timestamp + millisecondsInDay > new Date().now();

    if (userForcedRefresh || hasStaleStoreData) {
      console.debug('refreshing user coordindate to local storage'); // eslint-disable-line
      const obj = yield navigator.geolocation.getCurrentPosition();

      document.getElementById('status').innerHTML = `You're at: ${obj.coords.latitude} (lat) / ${obj.coords.longitude} (long)`;
      localStorage.location = {
        timestamp: obj.timestamp,
        coords: obj.coords
      };

      coords = obj.coords;
    } else {
      coords = localStore.coords;
    }
  }

  return coords;
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
  const coords = getUserCoordinates();

  createMap(coords.latitude, coords.longitude);
});