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
    this.#fitMapToMarkers();
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();

    // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
    for (const coord of this.markersValue) {
      bounds.extend([coord.lng, coord.lat]);
    }

    this.map.fitBounds(bounds, {
      padding: 80,
      duration: 0
    });
  }


  #addMarkersToMap() {
    this.markersValue.forEach((myMarker) => {
      new mapboxgl.Marker()
        .setLngLat([myMarker.lng, myMarker.lat])
        .addTo(this.map);
    });
  }
}
