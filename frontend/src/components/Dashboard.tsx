// DASHBOARD.TSX
import React, { useState } from "react";
import MapComponent from "./Map";

// interface Location {
//   lat: number;
//   lng: number;
//   label: string;
// }


const Dashboard: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [granularity, setGranularity] = useState("");
  const [mapData, setMapData] = useState<any[]>([]); // to pass to MapComponent

  const handleSubmit = async () => {
    try {
      console.log("btn pressed")
      // const response = await fetch(
      //   `http://localhost:5000/api/outages?start=${startDate}&end=${endDate}&granularity=${granularity}`
      // );
      // const data = await response.json();
      // setMapData(data); // update state -> send to MapComponent
    } catch (err) {
      console.error("Error fetching map data:", err);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
        {/* map takes 80% of width and height */}
        <div className="flex flex-col items-center w-4/5 h-4/5">
            <MapComponent data={mapData} />
            <div className="flex justify-between items-center mt-8 w-2/5 ">
              <select
                className="border border-gray-300 rounded m-4"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              >
                <option value="">Start Date</option>
                <option value="2025-05-27">May 27 2025</option>
                <option value="2025-05-28">May 28 2025</option>
                <option value="2025-05-29">May 29 2025</option>
              </select>

              <select
                className="border border-gray-300 rounded m-4"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              >
                <option value="">End Date</option>
                <option value="2025-05-27">May 27 2025</option>
                <option value="2025-05-28">May 28 2025</option>
                <option value="2025-05-29">May 29 2025</option>
              </select>

              <select
                className="border border-gray-300 rounded m-4"
                value={granularity}
                onChange={(e) => setGranularity(e.target.value)}
              >
                <option value="">Granularity</option>
                <option value="1m">1 minute</option>
                <option value="5m">5 minutes</option>
              </select>

              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
        </div>
    </div>
  );
};


export default Dashboard;

