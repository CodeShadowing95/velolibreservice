/* eslint-disable react/prop-types */
import { useState } from "react";
import { mapStyles } from "../utils/constants";

const MapOptions = ({ zoom, onZoom, onResetZoom, onSetMapStyle }) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [openMapPanel, setOpenMapPanel] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("mapbox://styles/mapbox/streets-v9");

  const toggleMapStyles = (style) => {
    setSelectedStyle(style);
    onSetMapStyle(style);
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }

  const handleZoom = (value) => {
    onZoom(value);
    setCurrentZoom(value);
  }

  const resetZoom = () => {
    onResetZoom(11);
    setCurrentZoom(11);
  }

  return (
    <>
      <div className="absolute sm:top-4 top-24 right-4 flex flex-col gap-2 z-10">
        {/* Geolocation */}
        <div className="w-8 h-8 flex justify-center items-center bg-white p-2 rounded-lg shadow-xl cursor-pointer" onClick={getCurrentLocation}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#000000" d="M11 21.95v-1q-3.125-.35-5.363-2.587T3.05 13h-1q-.425 0-.712-.288T1.05 12t.288-.712T2.05 11h1q.35-3.125 2.588-5.363T11 3.05v-1q0-.425.288-.712T12 1.05t.713.288t.287.712v1q3.125.35 5.363 2.588T20.95 11h1q.425 0 .713.288t.287.712t-.287.713t-.713.287h-1q-.35 3.125-2.587 5.363T13 20.95v1q0 .425-.288.713T12 22.95t-.712-.287T11 21.95M12 19q2.9 0 4.95-2.05T19 12t-2.05-4.95T12 5T7.05 7.05T5 12t2.05 4.95T12 19m0-3q-1.65 0-2.825-1.175T8 12t1.175-2.825T12 8t2.825 1.175T16 12t-1.175 2.825T12 16"/></svg>
        </div>

        {/* Zoom in & out */}
        <div className="flex flex-col justify-center items-center rounded-lg bg-white">
          <div className="w-8 h-8 flex justify-center items-center p-2 rounded-lg hover:bg-gray-50" onClick={() => handleZoom(currentZoom + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#000000" d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"/></svg>
          </div>
          <div className="border border-gray-200 w-1/2"></div>
          <div className="w-8 h-8 flex justify-center items-center p-2 rounded-lg hover:bg-gray-50" onClick={() => handleZoom(currentZoom - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 256 256"><path fill="#000000" d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"/></svg>
          </div>
        </div>
        
        {/* Theme */}
        <div className={`w-8 h-8 flex justify-center items-center bg-white p-2 rounded-lg shadow-xl cursor-pointer ${openMapPanel ? "-translate-x-36" : "translate-x-0"} transition`} onClick={() => setOpenMapPanel(!openMapPanel)}>
          {!openMapPanel && <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="currentColor" d="m12 18.54l7.37-5.74L21 14.07l-9 7l-9-7l1.62-1.26zM12 16L3 9l9-7l9 7zm0-11.47L6.26 9L12 13.47L17.74 9z"/></svg>}
          {openMapPanel && <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>}
        </div>

        {/* Free navigation */}
        <div className="w-8 h-8 flex justify-center items-center bg-white p-2 rounded-lg shadow-xl cursor-pointer" onClick={() => resetZoom()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#000000" d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"><animateTransform id="eosIconsCompass0" attributeName="transform" attributeType="XML" begin="0;eosIconsCompass2.end" dur="1s" from="-90 12 12" to="0 12 12" type="rotate"/><animateTransform id="eosIconsCompass1" attributeName="transform" attributeType="XML" begin="eosIconsCompass0.end" dur="1s" from="0 12 12" to="-90 12 12" type="rotate"/><animateTransform id="eosIconsCompass2" attributeName="transform" attributeType="XML" begin="eosIconsCompass1.end" dur="1s" from="-90 12 12" to="270 12 12" type="rotate"/></path></svg>
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

export default MapOptions