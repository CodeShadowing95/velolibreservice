/* eslint-disable react/prop-types */
import { useState } from "react";
import { mapStyles } from "../utils/constants"

const MapAppearrance = ({ onSetMapStyle }) => {
  const [openMapPanel, setOpenMapPanel] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v9");

  const toggleMapStyles = (style) => {
    setSelectedStyle(style);
    onSetMapStyle(style);
  }

  return (
    <>
      <div className={`absolute top-1/3 right-4 z-10 cursor-pointer group bg-white p-[2px] rounded-md transition-transform ${openMapPanel ? "-translate-x-36" : "translate-x-0"}`} onClick={() => setOpenMapPanel(!openMapPanel)}>
        <div className="relative">
          {/* Image */}
          <div className="w-24 h-16 rounded-md bg-white relative">
            <div className="w-full h-full rounded-md">
              <img src="/src/assets/MapStyles/streets.png" className="w-full h-full object-center rounded-md" alt="map style" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/80 flex justify-center items-end rounded-md pb-2">
              <div className="w-full flex justify-center items-center gap-1 group-hover:-translate-y-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 18.54l7.37-5.74L21 14.07l-9 7l-9-7l1.62-1.26zM12 16L3 9l9-7l9 7zm0-11.47L6.26 9L12 13.47L17.74 9z"/></svg>
                <p className="text-white text-xs">Calques</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className={`absolute top-4 right-0 z-10 p-2 rounded-lg bg-white transition-transform ${openMapPanel ? "translate-x-0" : "translate-x-full"}`}>
        <div className="relative">
          <div className="h-[calc(100vh-250px)] flex flex-col bg-white gap-3 overflow-auto">
            {mapStyles.map((mapStyle, index) => (
              <div key={index} className={`w-full rounded-lg flex flex-col items-center gap-1 p-1 text-sm font-semibold group transition-all ${mapStyle.style === selectedStyle ? "bg-blue-500 text-white" : "hover:bg-blue-200 text-gray-700"}`} onClick={() => toggleMapStyles(mapStyle.style)}>
                <img src={mapStyle.image} alt="stylemap" className="w-32 h-20 rounded-t-md" />
                {mapStyle.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MapAppearrance