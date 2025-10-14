// DASHBOARD.TSX
import React, { useState } from "react";
import MapComponent from "./Map";

// interface Location {
//   lat: number;
//   lng: number;
//   label: string;
// }



const Dashboard: React.FC = () => {
//   const [mapData, setMapData] = useState<Location[]>([]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
        {/* map takes 80% of width and height */}
        <div className="flex flex-col items-center w-4/5 h-4/5">
            <MapComponent />
            <div className="flex justify-between items-center mt-8 w-1/5 ">
              <button>
                test
              </button>
              <button>
                test
              </button>
              <button>
                test
              </button>
            </div>
        </div>
    </div>
  );
};


export default Dashboard;

