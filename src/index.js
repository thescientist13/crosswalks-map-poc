import L from 'leaflet';

navigator.geolocation.getCurrentPosition((obj) => {
  document.getElementById('root').innerHTML = obj.coords.latitude + ' * ' + obj.coords.longitude;
  document.getElementById('time').innerHTML = obj.timestamp;
});