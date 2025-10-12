// MAP.TSX
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import outageData from "../assets/outages.json";
import geoJsonData from "../assets/world.json";

// define type for outage data
interface OutageEntry {
  dst: string;
  country: string;
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

        // count outages by country 
        const outageCounts: Record<string, number> = {};
        outages.forEach((d) => {
            outageCounts[d.country] = (outageCounts[d.country] || 0) + 1;
        });

        console.log(outageCounts);

        // define color scale 
        function getColor(count: number): string {
        return count > 5
            ? "#800026"
            : count > 3
            ? "#d60606ff"
            : count > 2
            ? "#fa4033ff"
            : count > 1
            ? "#fe7358ff"
            : count === 1
            ? "#feb887ff"
            : "#c1c1c1ff";
        }

        // style function
        function style(feature: any) {
            // console.log("feature is ", feature)
            const code = feature.properties["ISO3166-1-Alpha-2"]; 
            // console.log("code is ", code)
            const count = outageCounts[code] || 0;
            return {
                fillColor: getColor(count),
                weight: 0.5,
                color: "#fff",
                fillOpacity: 1,
            };
        }

        // load imported world GeoJSON
        L.geoJSON(geoJsonData as any, { style }).addTo(map);

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

