// MAP.TSX
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import outageData from "../assets/ratio_outages.json";
import geoJsonData from "../assets/world.json";

// define type for outage data
interface OutageEntry {
  country: string;
  ratio: number;
}

const outages = outageData as OutageEntry[];

const Map: React.FC = () => {
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

        // // add a basic OpenStreetMap tile layer
        // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        // }).addTo(map);

        // count country outages ratio 
        const ratioLookup: Record<string, number> = {};
        outages.forEach((d) => {
            ratioLookup[d.country] = d.ratio;
        });

        // console.log(ratioLookup);

        // define color scale 
        function getColor(ratio: number): string {
            if (ratio === 0) return "#FFFFFF"; // white for zero
            if (ratio <= 0.2) return "#FFCCCC";
            if (ratio <= 0.4) return "#FF9999";
            if (ratio <= 0.6) return "#FF6666";
            if (ratio <= 0.8) return "#FF3333";
            return "#800000"; // dark red for high ratio
        }


        // style function
        function style(feature: any) {
            // console.log("feature is ", feature)
            const code = feature.properties["ISO3166-1-Alpha-2"]; 
            // console.log("code is ", code)
            const ratio = ratioLookup[code] || 0; // default to 0 if missing
            return {
                fillColor: getColor(ratio),
                weight: 0.5,
                color: "#e0e0e0",
                fillOpacity: 1,
            };
        }

        function onEachFeature(feature: any, layer: L.Layer) {
            const code = feature.properties["ISO3166-1-Alpha-2"];
            const ratio = ratioLookup[code] || 0;
            // show tooltip on hover
            layer.bindTooltip(
                `${feature.properties.name}: ${(ratio * 100).toFixed(4)}%`,
                { sticky: true } // tooltip follows the mouse
            );

            // optional: highlight on hover
            layer.on({
                mouseover: (e) => {
                    (e.target as L.Path).setStyle({
                        weight: 2,
                        color: "#666",
                        fillOpacity: 0.9,
                    });
                },
                mouseout: (e) => {
                    (e.target as L.Path).setStyle(style(feature));
                },
            });
        }

        // load imported world GeoJSON
        L.geoJSON(geoJsonData as any, { style, onEachFeature }).addTo(map);

        return () => {
            map.remove(); // cleanup on unmount
        };
        
    }, []);

    return (
    <div
        id="map"
        className="w-full h-full rounded-1xl"
    ></div>
    );
};

export default Map;

