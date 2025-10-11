import React, { useState } from "react";
import MapComponent from "./Map";

interface Location {
  lat: number;
  lng: number;
  label: string;
}

const Dashboard: React.FC = () => {
//   const [mapData, setMapData] = useState<Location[]>([]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
        {/* Map takes 80% of width and height */}
        <div className="w-4/5 h-4/5">
            <MapComponent />
        </div>
    </div>
  );
};


export default Dashboard;
