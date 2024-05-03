import { useEffect, useRef, useState } from "react"
import Map, { Marker } from "react-map-gl"
import SearchBar from "./SearchBar";
import SideBox from "./SideBox";
import MapOptions from "./MapOptions";
import { locations } from "../utils/constants";
import { getStationsFromContract } from "../utils/services";
import Stations from "./Stations";
import Station from "./Station";


const InteractiveMap = () => {
  const mapRef = useRef(null);
  // const [pitch, setPitch] = useState(60);

  const [stationLocation, setStationLocation] = useState({ latitude: 0, longitude: 0 });
  const [stations, setStations] = useState([]);
  const [stationFromContract, setStationFromContract] = useState({});
  const [contract, setContract] = useState("rouen");
  const [zoom, setZoom] = useState(11);
  const [stationId, setStationId] = useState(0);

  const switchContract = (currentContract) => {
    mapRef.current.flyTo({
      center: [currentContract.longitude, currentContract.latitude],
      zoom: zoom,
      speed: 1.5,
      curve: 1.5,
    })
  }

  const goToStationPosition = (latitude, longitude) => {
    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 15,
      speed: 1.5,
      curve: 1.5,
    })
  }

  const handleLocationChange = (lat, long, index) => {
    setStationLocation({ latitude: lat, longitude: long, stationKey: index });
    setStationId(index);
  }

  const goToContract = (contract) => {
    setContract(contract);
    setStationId(0);
    setStations([]);
    setStationFromContract({});
    setStationLocation({ latitude: 0, longitude: 0 });
    setStationId(0);
  }

  useEffect(() => {
    setTimeout(() => {
      getStationsFromContract(contract)
      .then((res) => {
        setStations(res);
      })
    }, 2000);

    if(!mapRef.current) {
      return;
    } else {
      const currentContract = locations.find((location) => location.name === contract);
      switchContract(currentContract);
    }

  }, [contract, zoom]);

  useEffect(() => {
    if(stationLocation.latitude !== 0 && stationLocation.longitude !== 0) {
      goToStationPosition(stationLocation.latitude, stationLocation.longitude);
    }
  }, [stationLocation]);

  useEffect(() => {
    // Utile pour déterminer si un objet est vide, car les objets sont comparés par reference et non par valeur
    if(Object.keys(stationFromContract).length !== 0) {
      goToStationPosition(stationFromContract?.position.latitude, stationFromContract?.position.longitude);
    }
  }, [stationFromContract]);

  return (
    <div className="relative w-screen h-screen overflow-hidden z-[1px]">
      {/* La carte */}
      <Map
        ref={mapRef}
        mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 1.099328,
          latitude: 49.4404598,
          zoom: zoom,
          // pitch: 60,
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // mapStyle="mapbox://styles/mapbox/standard"
      >
        {/* Si l'utilisateur a fait une recherche d'un lieu en particulier, on affiche un marker à la position du lieu */}
        {Object.keys(stationFromContract).length !== 0 ?
          <Marker longitude={stationFromContract.position.longitude} latitude={stationFromContract.position.latitude} style={{ zIndex: 1 }}>
            <div className="flex relative justify-center cursor-pointer hover:scale-125 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 animate-bounce" viewBox="0 0 24 24"><path fill="#7e22ce" fillRule="evenodd" d="M12 2c-4.418 0-8 4.003-8 8.5c0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5C20 6.003 16.418 2 12 2m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clipRule="evenodd"/></svg>
            </div>
          </Marker>
          :
          // Sinon on affiche tous les markers
          stations.map((station) => (
            <Marker longitude={station.position.longitude} latitude={station.position.latitude} key={station.name} style={{ zIndex: 1 }} onClick={() => handleLocationChange(station.position.latitude, station.position.longitude, station.number)}>
              <div key={station.number} className="flex relative justify-center cursor-pointer hover:scale-125 transition-transform">
                {stationLocation.latitude === station?.position.latitude && stationLocation.longitude === station?.position.longitude ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 animate-bounce" viewBox="0 0 24 24"><path fill="#7e22ce" fillRule="evenodd" d="M12 2c-4.418 0-8 4.003-8 8.5c0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5C20 6.003 16.418 2 12 2m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clipRule="evenodd"/></svg>
                :
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#0ea5e9" d="M12 2c-4.418 0-8 4.003-8 8.5c0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5C20 6.003 16.418 2 12 2" opacity=".5"/><path fill="#ffffff" d="M12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5"/></svg>
                }
              </div>
            </Marker>
          ))}
      </Map>

      {/* Barre de recherche */}
      <SearchBar onGetStationFromContract={setStationFromContract} />

      {/* Composant latéral de gauche */}
      <SideBox onGoToContract={goToContract} />

      {/* Station depuis la barre de recherche */}
      <Station info={stationFromContract} />

      {/* Options de carte */}
      <MapOptions zoom={zoom} onZoom={setZoom} onResetZoom={setZoom} />
      
      {/* Liste des stations par contract */}
      <Stations stations={stations} onGetPosition={setStationLocation} stationId={stationId} contract={contract}  />
    </div>
  )
}

export default InteractiveMap