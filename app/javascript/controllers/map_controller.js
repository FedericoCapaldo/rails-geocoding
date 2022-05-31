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
      const customMarkerIcon = document.createElement("div");
      customMarkerIcon.className = "marker";
      customMarkerIcon.style.backgroundImage = `url('${myMarker.image_url}')`;
      customMarkerIcon.style.backgroundSize = "contain";
      customMarkerIcon.style.width = "25px";
      customMarkerIcon.style.height = "25px";

      const popup = new mapboxgl.Popup().setHTML(myMarker.info_window);
      new mapboxgl.Marker(customMarkerIcon)
        .setLngLat([myMarker.lng, myMarker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }
}
