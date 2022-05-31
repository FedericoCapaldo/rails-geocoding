import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static values = { 'apiKey': String, 'markers': Array };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;
    this.map = new mapboxgl.Map({
      container: this.element,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
    });
    this.#addMarkersToMap();
  }

  #addMarkersToMap() {
    console.log(this.markersValue);
    this.markersValue.forEach((myMarker) => {
      new mapboxgl.Marker()
        .setLngLat([myMarker.lng, myMarker.lat])
        .addTo(this.map);
    });

  }
}
