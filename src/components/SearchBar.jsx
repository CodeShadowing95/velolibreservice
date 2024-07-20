/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

import { criterias } from "../utils/constants";
import { getStations, getStationsInfos } from "../utils/services";

const SearchBar = ({ onGetStationFromContract, onDiscardSidebox }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stations, setStations] = useState([]);
  const [stationsNames, setStationsNames] = useState([])
  const [stationsAddresses, setStationsAddresses] = useState([])
  const [filteredStations, setFilteredStations] = useState([])
  const [filteredAddresses, setFilteredAddresses] = useState([])
  const [criteria, setCriteria] = useState("station")
  const [discardSidebox, setDiscardSidebox] = useState(false)

  const [enableSearchPanel, setEnableSearchPanel] = useState(true)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const divRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const term = event.target[0].value;

    if(term) {
      getStationInfo(term);
    }
  }

  const handleChange = (event) => {
    setEnableSearchPanel(true);
    setSearchTerm(event.target.value);
    if(criteria === "station") {
      setFilteredStations(stationsNames.filter((name) => name.toLowerCase().includes(event.target.value.toLowerCase()))) 
    } else if(criteria === "adresse") {
      setFilteredAddresses(stationsAddresses.filter((address) => address.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    onGetStationFromContract({});
  }

  const getStationInfo = (name) => {
    const station = stations.find((s) => s.name === name || s.address === name);
    if(station) {
      getStationsInfos(station.number, station.contractName)
      .then((stationDetail) => {
        onGetStationFromContract(stationDetail);
      })
    }
  }

  const editSearchbar = (name) => {
    setSearchTerm(name);
    if(searchTerm) {
      setEnableSearchPanel(false);
    } else {
      setEnableSearchPanel(true);
    }
    
    getStationInfo(name);
  }

  const toggleList = () => {
    setToggleDropdown(!toggleDropdown);
    setEnableSearchPanel(false);
  }

  const changeSearchCriteria = async (name) => {
    setCriteria(name);
    if(name === "station") {
      setFilteredStations(stationsNames)
    } else if(name === "adresse") {
      setFilteredAddresses(stationsAddresses)
    }
  }

  const toggleSidebox = () => {
    if(discardSidebox) {
      setDiscardSidebox(false);
      onDiscardSidebox(false);
    } else {
      setDiscardSidebox(true);
      onDiscardSidebox(true);
    }
  }

  useEffect(() => {
    // Check if screen size >= 1024
    const handleResize = () => {
      if(window.innerWidth >= 1024) {
        setDiscardSidebox(true);
        onDiscardSidebox(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setToggleDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getStations()
    .then((res) => {
      setStations(res);
      setStationsNames(stations.map((station) => station.name));
      setStationsAddresses(stations.map((station) => station.address).filter((address) => address !== ""));
    })
  }, [stations, stationsAddresses, stationsNames])

  return (
    <div className="absolute top-4 lg:left-1/3 flex gap-2 px-2 z-10">
      <div className="bg-white rounded-xl p-4 lg:hidden block shadow-md" onClick={toggleSidebox}>
        {discardSidebox ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" viewBox="0 0 24 24"><path fill="currentColor" d="M2 14h6v6H2M16 8h-6v2h6M2 10h6V4H2m8 0v2h12V4M10 20h6v-2h-6m0-2h12v-2H10"/></svg>
        )}
      </div>
      <div className="flex relative rounded-xl shadow-md">
        <div className="w-full sm:w-96 relative">

          {/* Search Bar */}
          <form className={`relative flex items-center w-full h-14 rounded-tl-xl ${searchTerm && enableSearchPanel ? 'rounded-bl-none' : 'rounded-bl-xl'} bg-white ps-4 overflow-hidden`} onSubmit={handleSubmit}>
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24"><path fill="#9CA3AF" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm font-medium font-lato text-gray-700 placeholder-gray-500 pr-2"
              name="search_station"
              type="search"
              id="search"
              value={searchTerm}
              placeholder={`Rechercher par ${criteria}...`}
              onChange={handleChange}
            />
          </form>

          {/* List */}
          <div className={`absolute w-full translate-y-0 py-4 h-72 overflow-auto bg-white z-10 ${searchTerm && enableSearchPanel ? "border-t shadow-xl border-t-gray-300 rounded-bl-xl rounded-br-xl" : "hidden"}`}>
            <div className="flex flex-col justify-center items-center gap-1">
              {criteria === "station" ? (
                filteredStations.length > 0 ?
                  filteredStations.map((stationName, index) => (
                    <div key={index} className="flex w-full items-center px-5 py-2 hover:bg-gray-100 gap-2 cursor-pointer" onClick={() => editSearchbar(stationName) }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.25a.69.69 0 0 1-.41-.13c-.3-.19-7.34-4.92-7.34-10.67a7.75 7.75 0 0 1 15.5 0c0 5.75-7 10.48-7.34 10.67a.69.69 0 0 1-.41.13m0-17a6.23 6.23 0 0 0-6.25 6.2c0 4.21 4.79 8.06 6.25 9.13c1.46-1.07 6.25-4.92 6.25-9.13A6.23 6.23 0 0 0 12 4.25"/><path fill="currentColor" d="M12 12.75A2.75 2.75 0 1 1 14.75 10A2.75 2.75 0 0 1 12 12.75m0-4A1.25 1.25 0 1 0 13.25 10A1.25 1.25 0 0 0 12 8.75"/></svg>
                      <p className=" text-sm font-medium font-lato text-gray-500 break-words max-w-full">{stationName}</p>
                    </div>
                  ))
                  :
                  <div className="flex justify-center items-center px-8 max-w-sm">
                    <p className="text-sm font-medium font-lato text-black break-words w-full">Aucune station correspondante à {'<<'} <span className="font-semibold">{searchTerm}</span> {'>>'}</p>
                  </div>
                )
                :
                (
                  filteredAddresses.length > 0 ?
                  filteredAddresses.map((address, index) => (
                    <div key={index} className="flex w-full items-center px-5 py-2 hover:bg-gray-100 gap-2 cursor-pointer" onClick={() => editSearchbar(address) }>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21.25a.69.69 0 0 1-.41-.13c-.3-.19-7.34-4.92-7.34-10.67a7.75 7.75 0 0 1 15.5 0c0 5.75-7 10.48-7.34 10.67a.69.69 0 0 1-.41.13m0-17a6.23 6.23 0 0 0-6.25 6.2c0 4.21 4.79 8.06 6.25 9.13c1.46-1.07 6.25-4.92 6.25-9.13A6.23 6.23 0 0 0 12 4.25"/><path fill="currentColor" d="M12 12.75A2.75 2.75 0 1 1 14.75 10A2.75 2.75 0 0 1 12 12.75m0-4A1.25 1.25 0 1 0 13.25 10A1.25 1.25 0 0 0 12 8.75"/></svg>
                      <p className=" text-sm font-medium font-lato text-gray-500 break-words max-w-full">{address}</p>
                    </div>
                  ))
                  :
                  <div className="flex justify-center items-center px-8 max-w-sm">
                    <p className="text-sm font-medium font-lato text-black break-words w-full">Aucune adresse correspondante à {'<<'} <span className="font-semibold">{searchTerm}</span> {'>>'}</p>
                  </div>
                )
              }
            </div>
          </div>
        </div>

        {/* Contract */}
        <div ref={divRef} className={`flex relative bg-white justify-center items-center rounded-tr-xl ${toggleDropdown ? 'rounded-br-none' : 'rounded-br-xl'}`} onClick={toggleList}>
          <div className="flex justify-center items-center gap-2 px-4 text-sm font-medium font-lato border-l border-l-gray-200 cursor-pointer z-10 min-w-40">
            <p className="text-gray-500 capitalize">{criteria}</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black/70" viewBox="0 0 24 24"><path fill="currentColor" d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"/></svg>
          </div>
          {/* Dropdown menu for contracts */}
          <div className={`absolute w-full top-full py-2 overflow-auto bg-white z-1 ${toggleDropdown ? "shadow-lg border-t border-t-gray-300 rounded-bl-xl rounded-br-xl" : "hidden"}`}>
            <div className="flex flex-col justify-center items-center gap-1 w-full">
              {criterias.map((term) => (
                <div key={term} className="flex w-full items-center px-4 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => changeSearchCriteria(term)}>
                  <div className="w-6 h-6 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`wfull h-full object-contain text-blue-500 ${criteria === term ? 'block' : 'hidden'}`} viewBox="0 0 24 24"><path fill="currentColor" d="m10 13.6l5.9-5.9q.275-.275.7-.275t.7.275t.275.7t-.275.7l-6.6 6.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275z"/></svg>
                  </div>
                  <p className={`text-sm capitalize ${criteria === term ? 'font-semibold' : 'font-medium'} font-lato text-gray-500 break-words`}>{term}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar