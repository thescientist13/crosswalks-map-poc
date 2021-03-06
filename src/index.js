import './index.css';
import config from './config.json';
import L from 'leaflet';

const LOCAL_STORAGE_KEY = 'geolocation';

function resolveGeolactionLookup(resolve) {
  navigator.geolocation.getCurrentPosition((position) => {

    const dataForLocalStorage = {
      timestamp: position.timestamp,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    };

    localStorage[LOCAL_STORAGE_KEY] = JSON.stringify(dataForLocalStorage);

    resolve(position.coords);
  });
}

function getUserCoordinates() {
  const localStoreGeolocation = localStorage.getItem(LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) : null;
  const hasExistingStoreGeolocationData = localStoreGeolocation && localStoreGeolocation.timestamp && localStoreGeolocation.coords;

  if (hasExistingStoreGeolocationData) {
    const millisecondsInDay = 86400 * 1000; // we'll refresh local storage every 24h
    const userForcedRefresh = location.search.indexOf('?forceRefresh') >= 0;
    const hasStaleStoreLocationData = localStoreGeolocation.timestamp + millisecondsInDay <= Date.now();

    if (userForcedRefresh || hasStaleStoreLocationData) {
      return new Promise(resolveGeolactionLookup);
    } else {
      return new Promise((resolve) => {
        resolve(localStoreGeolocation.coords);
      });
    }
  } else {
    return new Promise(resolveGeolactionLookup);
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
    document.getElementById('status').innerHTML = `You're at: ${coords.latitude} (lat) / ${coords.longitude} (long)`;

    createMap(coords.latitude, coords.longitude);
  }).catch((err) => {
    console.error('uhoh....', err); // eslint-disable-line
  });

});