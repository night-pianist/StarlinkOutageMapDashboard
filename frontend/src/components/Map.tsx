// MapComponent.tsx
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent: React.FC = () => {
  useEffect(() => {
    // bounds for vertical drag (horizontal wrap-around is fine)
    const southWest = L.latLng(-60, -360);
    const northEast = L.latLng(85, 360);
    const bounds = L.latLngBounds(southWest, northEast);

    // initialize the map with min/max zoom
    const map = L.map("map", {
        worldCopyJump: true, // allows horizontal wrap-around
        minZoom: 3, // can't zoom out pass 2 (lower number = more zoomed out)
        maxZoom: 18, // can't zoom in pass 18
        maxBounds: bounds,
        maxBoundsViscosity: 1.0, // prevents dragging outside bounds
    }).setView([0, 0], 3);

    // add a basic OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    return () => {
      map.remove(); // cleanup on unmount
    };
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100%" }}></div>;
};

export default MapComponent;
