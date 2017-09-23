import L from 'leaflet';
console.log('L', L);  // eslint-disable-line

navigator.geolocation.getCurrentPosition((obj) => {
  document.getElementById('root').innerHTML = obj.coords.latitude + ' * ' + obj.coords.longitude;
  document.getElementById('time').innerHTML = obj.timestamp;
});