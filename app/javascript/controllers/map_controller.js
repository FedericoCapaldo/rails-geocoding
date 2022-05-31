import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  connect() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yd29ya3dob2tub3dzd2h5IiwiYSI6ImNsM3UzZGk2NjBpdm0zanJ4Z3Ezb25qdDAifQ.Nfp1e6dOAG5Xbmt9D7DJxw';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }
}
