import L from 'leaflet';

console.log('leaflet here!', L); // eslint-disable-line
console.log('geolocation!', navigator.geolocation); // eslint-disable-line

navigator.geolocation.getCurrentPosition((obj) => { // eslint-disable-line
  console.log('current position callback', obj); // eslint-disable-line
  console.log('current position callback', obj.coords.latitude); // eslint-disable-line
  document.getElementById('root').innerHTML = obj.coords.latitude + ' * ' + obj.coords.longitude;
  document.getElementById('time').innerHTML = obj.timestamp;
});