import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const Stations = ({ stations, onGetPosition, stationId }) => {
  const [togglePanel, setTogglePanel] = useState(false);
  const [stationIndex, setStationIndex] = useState(0);

  const hidePanel = () => {
    setTogglePanel(!togglePanel);
  };

  const goToPosition = (latitude, longitude, index) => {
    onGetPosition({latitude, longitude});
    setStationIndex(index);
  };

  useEffect(() => {
    if (stationId) {
      setStationIndex(stationId);
    }
  }, [stationId]);
  

  return (
    <div id="stations" className={`absolute bottom-0 right-0 z-10 ${togglePanel ? "translate-y-full" : "translate-y-0"} transition-transform`}>
      <div className="flex w-[calc(100vw-400px)] relative">
        <div className="w-full flex relative gap-4 overflow-x-auto"
          style={{
            "scrollbarWidth": "none",
            "msOverflowStyle": "none",
            "&::WebkitScrollbar": { "width": "0px" }
          }}
        >
          {stations.length ?
            stations.map((station) => (
              // Station implementation
              <div key={station.number} className={`flex flex-col items-center cursor-pointer transition-transform bg-white min-w-60 min-h-[305px] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 ${station.number === stationIndex ? "border-[5px] border-blue-500/50 scale-95" : "border hover:scale-95"}`} onClick={() => goToPosition(station?.position.latitude, station?.position.longitude, station.number)}>
                {/* Station image */}
                <div className="w-full h-24 flex justify-center items-center mb-2 rounded-t-xl">
                  <img src="/location_banner.jpg" alt="station" className="w-full h-full object-cover rounded-t-xl" />
                </div>
                {/* Station name, address, status, connected, stands */}
                <div className="w-full flex items-center px-2">
                  {/* Station name & address */}
                  <div className="w-full flex flex-col">
                    <p className="text-sm font-bold font-lato break-words">{station.name ? station.name.slice(7) : "Non renseigné"}</p>
                    <p className="text-xs font-medium font-lato text-gray-500">{station.address.toLowerCase() ? station.address : "Adresse inconnue"}</p>
                  </div>
                </div>

                {/* status, connected, stands */}
                <div className="w-full flex flex-wrap items-end gap-1 mt-2 px-2">
                  {/* status */}
                  <div className={`flex justify-center items-center flex-1 ${station.status === "OPEN" ? "bg-green-600" : "bg-red-600"} gap-1 rounded-full px-2 py-[1px]`}>
                    {station.status === "OPEN" ?
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="m10 13.6l5.9-5.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-6.6 6.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275z"/></svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="m12 13.4l-2.917 2.925q-.276.275-.704.275t-.704-.275q-.275-.275-.275-.7t.275-.7L10.6 12L7.675 9.108Q7.4 8.832 7.4 8.404q0-.427.275-.704q.275-.275.7-.275t.7.275L12 10.625L14.892 7.7q.276-.275.704-.275q.427 0 .704.275q.3.3.3.712t-.3.688L13.375 12l2.925 2.917q.275.276.275.704t-.275.704q-.3.3-.712.3t-.688-.3z"/></svg>
                    }
                    <p className="text-[10px] leading-3 text-white">{station.status === "OPEN" ? "Ouverte" : "Fermée"}</p>
                  </div>
                  {/* connected */}
                  <div className={`flex justify-center items-center flex-1 ${station.connected === true ? "bg-green-600" : "bg-red-600"} gap-1 rounded-full px-2 py-[2px]`}>
                    {station.connected === true ?
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 12c-2.03 0-3.9.67-5.4 1.8l-1.8-2.4C6.81 9.89 9.3 9 12 9s5.19.89 7.2 2.4l-1.28 1.7c-.37.07-.74.17-1.08.31C15.44 12.5 13.78 12 12 12m9-3l1.8-2.4C19.79 4.34 16.05 3 12 3S4.21 4.34 1.2 6.6L3 9c2.5-1.88 5.62-3 9-3s6.5 1.12 9 3m-9 6c-1.35 0-2.6.45-3.6 1.2L12 21l1.04-1.39c-.04-.2-.04-.4-.04-.61c0-1.34.44-2.57 1.19-3.57c-.69-.27-1.42-.43-2.19-.43m5.75 4.43l-1.59-1.59L15 19l2.75 3l4.75-4.75l-1.16-1.41z"/></svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"><path fill="#ffffff" d="M24 8.98A16.88 16.88 0 0 0 12 4C7.31 4 3.07 5.9 0 8.98L12 21v-9h8.99zM19.59 14l-2.09 2.09L15.41 14L14 15.41l2.09 2.09L14 19.59L15.41 21l2.09-2.08L19.59 21L21 19.59l-2.08-2.09L21 15.41z"/></svg>
                    }
                    <p className="text-[10px] leading-3 text-white">{station.connected === true ? "Connectée" : "Non-connectée"}</p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="w-full border-t my-2"></div>

                {/* Stands */}
                <div className="flex flex-col gap-2 w-full px-2">
                  <div className={`flex items-center gap-1 rounded-full px-2 py-[2px]`}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 496 512"><path fill="#000000" d="m384.004 319.234l-27.349-82.046h-65.56v32.346h42.25l3.376 10.126l-72.58 53.479V63.969l59.296-31.625V0L0 172.5v32.343l21.562-11.5v307.984H264.14V373.312l83.332-61.402l5.83 17.489c-58.351 30.62-70.507 112.74-18.653 158.39c55.919 49.226 144.673 19.41 159.376-53.542c13.575-67.364-45.316-125.22-110.021-115.013m78.314 108.623c-9.8 48.634-68.97 68.512-106.25 35.694c-33.102-29.14-27.028-80.527 7.696-102.765l15.307 45.916c-3.362 8.05-1.89 17.979 5.556 24.533c12.426 10.94 32.15 4.314 35.416-11.898c1.943-9.638-2.813-18.37-10.268-22.787l-15.333-46c40.913-2.889 76.542 34.305 67.876 77.307"/></svg> */}
                    <p className="text-xs font-medium">Capacité totale de la station: {station?.totalStands.capacity > station?.mainStands.capacity ? station?.totalStands.capacity : station?.mainStands.capacity}</p>
                  </div>
                  <div className="flex flex-wrap items-center w-full px-2 gap-4 mt-1">
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xl font-bold text-amber-600">{station?.mainStands?.availabilities?.bikes}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 496 512"><path fill="#000000" d="m384.004 319.234l-27.349-82.046h-65.56v32.346h42.25l3.376 10.126l-72.58 53.479V63.969l59.296-31.625V0L0 172.5v32.343l21.562-11.5v307.984H264.14V373.312l83.332-61.402l5.83 17.489c-58.351 30.62-70.507 112.74-18.653 158.39c55.919 49.226 144.673 19.41 159.376-53.542c13.575-67.364-45.316-125.22-110.021-115.013m78.314 108.623c-9.8 48.634-68.97 68.512-106.25 35.694c-33.102-29.14-27.028-80.527 7.696-102.765l15.307 45.916c-3.362 8.05-1.89 17.979 5.556 24.533c12.426 10.94 32.15 4.314 35.416-11.898c1.943-9.638-2.813-18.37-10.268-22.787l-15.333-46c40.913-2.889 76.542 34.305 67.876 77.307"/></svg>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xl font-bold text-amber-600">{station?.mainStands?.availabilities?.mechanicalBikes}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#000000" d="M5.009 19.5q-1.917 0-3.213-1.294T.5 15q0-1.875 1.316-3.207T5 10.462q1.714 0 2.997 1.16q1.284 1.159 1.48 2.878h1.765l-2.146-6H8q-.213 0-.356-.144T7.5 7.999t.144-.356T8 7.5h3q.213 0 .356.144t.144.357t-.144.356T11 8.5h-.83l.696 1.962h5.915L15.1 5.846q-.058-.173-.192-.26q-.135-.086-.308-.086H13q-.212 0-.356-.144t-.144-.357t.144-.356T13 4.5h1.6q.477 0 .871.267t.567.725l1.816 4.958H19q1.868 0 3.184 1.316T23.5 14.95q0 1.876-1.315 3.194q-1.316 1.318-3.185 1.318q-1.723 0-2.98-1.135T14.523 15.5H9.477q-.196 1.725-1.498 2.863T5.009 19.5M5 18.5q1.256 0 2.214-.793q.959-.794 1.24-2.207H6q-.213 0-.356-.144t-.144-.357t.144-.356T6 14.5h2.454q-.281-1.42-1.24-2.21Q6.256 11.5 5 11.5q-1.487 0-2.494 1.006T1.5 15q0 1.442 1.006 2.471T5 18.5m7.354-4h2.169q.087-.69.51-1.623q.425-.933 1.236-1.416h-5.05zm6.645 4q1.488 0 2.494-1.029t1.007-2.478q0-1.48-1.006-2.486T19 11.5q-.223 0-.416.01t-.376.067l.861 2.302q.073.188-.012.376t-.28.264q-.189.073-.38-.012t-.266-.28l-.812-2.296q-.865.483-1.342 1.327T15.5 15q0 1.442 1.006 2.471t2.493 1.029M19 15"/></svg>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xl font-bold text-amber-600">{station?.mainStands?.availabilities?.electricalBikes}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#000000" d="M5.009 16.5q-1.917 0-3.213-1.294T.5 12q0-1.875 1.316-3.207T5 7.462q1.714 0 2.997 1.16Q9.281 9.78 9.477 11.5h1.765l-2.146-6H8q-.213 0-.356-.144T7.5 4.999t.144-.356T8 4.5h3q.213 0 .356.144t.144.357t-.144.356T11 5.5h-.83l.696 1.962h5.915L15.1 2.846q-.058-.173-.192-.26q-.135-.086-.308-.086H13q-.212 0-.356-.144t-.144-.357t.144-.356T13 1.5h1.6q.477 0 .871.267t.567.725l1.816 4.958H19q1.868 0 3.184 1.316T23.5 11.95q0 1.876-1.315 3.194q-1.316 1.318-3.185 1.318q-1.723 0-2.98-1.135T14.523 12.5H9.477q-.196 1.725-1.498 2.863T5.009 16.5M5 15.5q1.256 0 2.214-.793q.959-.793 1.24-2.207H6q-.213 0-.356-.144t-.144-.357t.144-.356T6 11.5h2.454q-.281-1.42-1.24-2.21Q6.256 8.5 5 8.5q-1.487 0-2.494 1.006T1.5 12q0 1.442 1.006 2.471T5 15.5m7.354-4h2.169q.087-.69.51-1.623q.425-.933 1.236-1.416h-5.05zm6.645 4q1.488 0 2.494-1.029t1.007-2.479q0-1.479-1.006-2.485T19 8.5q-.223 0-.416.01t-.376.067l.861 2.302q.073.188-.012.376t-.28.264q-.189.073-.38-.012t-.266-.28l-.812-2.296q-.865.483-1.342 1.327T15.5 12q0 1.442 1.006 2.471t2.493 1.029m-6.153 5.423v1.085q0 .22-.19.34q-.189.12-.406.01l-3.762-1.902q-.136-.081-.106-.23t.187-.149h2.546v-1.085q0-.22.19-.34t.407-.01l3.761 1.902q.137.081.107.23t-.188.149zM19 12"/></svg>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <p className="text-xl font-bold text-amber-600">{station?.mainStands?.availabilities?.stands}</p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#000000" d="M11 14h1.5a3.5 3.5 0 1 0 0-7H9v10h2zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m7 6h1.5a1.5 1.5 0 0 1 0 3H11z"/></svg>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      {
                        station?.banking ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#15803d" d="M13 19c0-.34.04-.67.09-1H3v-6h16v1c.7 0 1.37.13 2 .35V6c0-1.11-.89-2-2-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h10.09c-.05-.33-.09-.66-.09-1M3 6h16v2H3zm14.75 16L15 19l1.16-1.16l1.59 1.59l3.59-3.59l1.16 1.41z"/></svg>
                        )
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#b91c1c" d="M13 19c0-.34.04-.67.09-1H3v-6h16v1c.7 0 1.37.13 2 .35V6c0-1.11-.89-2-2-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h10.09c-.05-.33-.09-.66-.09-1M3 6h16v2H3zm19.54 10.88L20.41 19l2.13 2.12l-1.42 1.42L19 20.41l-2.12 2.13l-1.41-1.42L17.59 19l-2.12-2.12l1.41-1.41L19 17.59l2.12-2.13z"/></svg>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
            :
            <div className="flex justify-center items-center w-full bg-white px-4 h-20">
              <p className="">Aucune station trouvée sur ce contrat.</p>
            </div>
          }
        </div>

        {/* Hide panel */}
        <div className="flex justify-center items-center px-4 rounded-t-md absolute left-8 -translate-y-full bg-gray-500 shadow-xl cursor-pointer z-[1px] hover:bg-gray-700 transition-colors" onClick={() => hidePanel()}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${togglePanel ? 'rotate-0' : '-rotate-180'} transition-transform duration-200`} viewBox="0 0 24 24"><path fill="#ffffff" d="M9.162 13.5q-.182 0-.293-.124t-.111-.289q0-.04.13-.283l2.677-2.677q.093-.092.2-.142t.235-.05t.235.05t.2.142l2.677 2.677q.055.056.093.129t.037.157q0 .168-.11.289t-.294.121z"/></svg>
          <p className="text-white text-xs font-bold ml-2">Résultats de recherche</p>
        </div>
      </div>
    </div>
  )
}

export default Stations