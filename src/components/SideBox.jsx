/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { getContracts, getStationsFromContract } from '../utils/services';
import { countryCodes, locations } from '../utils/constants';

const SideBox = ({ onGoToContract }) => {
  const [contracts, setContracts] = useState([]);
  const [openSidebox, setOpenSidebox] = useState(true);
  const [enableDelay, setEnableDelay] = useState(false);
  const [selected, setSelected] = useState("rouen");
  const [selectedContract, setSelectedContract] = useState(null);
  const [toContract, setToContract] = useState("");
  const [quantities, setQuantities] = useState([{ name: "", "quantity": 0 }]);
  let contractsRef = useRef([]);

  const goTo = (contractName) => {
    onGoToContract(contractName);
    // toggleSidebox();
    setSelected(contractName);
  }

  const toggleSidebox = () => {
    setOpenSidebox(!openSidebox);
    setTimeout(() => setEnableDelay(!enableDelay), 100);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setContracts(contractsRef.current.filter((contract) => contract?.name.toLowerCase().includes(value.toLowerCase())));
  }

  const getContractDetails = (contract) => {
    setToContract(contract);
    setSelectedContract(contractsRef.current.find((c) => c.name === contract));
  }

  useEffect(() => {
    // Get all contracts
    getContracts()
    .then((res) => {
      setContracts(res);
      contractsRef.current = res;
    })

    // Get stations length by contract
    for(let location of locations) {
      getStationsFromContract(location.name)
      .then((res) => {
        setQuantities((prev) => [...prev, { name: location.name, quantity: res.length }])
      })
    }
  }, []);

  return (
    <div className="absolute top-4 left-2 w-80 invisible lg:visible">
      {/* Header */}
      <div className={`w-full h-14 bg-gradient-to-r from-sky-400 to-sky-500 z-20 ${openSidebox ? "rounded-t-md" : "rounded-md"}`}>
        <div className="w-full h-full flex justify-between items-center px-2">
          <div className="w-10 h-10 flex justify-center items-center p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full object-contain' viewBox="0 0 24 24"><path fill="#ffffff" d="M8 17q.425 0 .713-.288T9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17m0-4q.425 0 .713-.288T9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13m0-4q.425 0 .713-.288T9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9m3 8h6v-2h-6zm0-4h6v-2h-6zm0-4h6V7h-6zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5H5zM5 5v14z"/></svg>
          </div>
          <p className="text-white font-roboto font-medium text-sm">Velo Libre Service</p>
          <div className="flex justify-center items-center p-2 hover:bg-sky-600 rounded-full cursor-pointer" onClick={() => toggleSidebox()}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 object-contain ${enableDelay ? '-rotate-180' : '-rotate-0'} transition-transform duration-200`} viewBox="0 0 24 24"><path fill="#ffffff" d="M9.162 13.5q-.182 0-.293-.124t-.111-.289q0-.04.13-.283l2.677-2.677q.093-.092.2-.142t.235-.05t.235.05t.2.142l2.677 2.677q.055.056.093.129t.037.157q0 .168-.11.289t-.294.121z"/></svg>
          </div>
        </div>
      </div>
      <div className={`w-full pb-2 ${openSidebox ? 'flex' : 'hidden'} flex-col shadow-lg rounded-b-md overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 z-0`}>
        {/* Body */}
        <div className="flex relative overflow-hidden">
          <div className={`w-full p-2 h-[360px] ${toContract ? '-translate-x-full' : 'translate-x-0'} gap-3 overflow-auto transition-all`}>
            {/* Contracts listing followed by number of stations */}
            <div className="w-full flex flex-col">
              {/* Title */}
              <div className="w-full flex justify-between items-center px-2 mb-2">
                <p className="font-roboto font-bold text-sm">Contrats</p>
                <div className="w-8 h-8 flex justify-center items-center p-2 rounded-full hover:bg-black/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain" viewBox="0 0 24 24"><path fill="#000000" d="m12 10.108l-4.246 4.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354l4.389-4.388q.242-.243.565-.243t.565.243l4.389 4.388q.14.14.15.344t-.15.364t-.354.16t-.354-.16z"/></svg>
                </div>
              </div>
              
              {/* Searchbar for contracts */}
              <div className="w-full mb-4 relative">
                <input className="w-full bg-white/80 h-10 px-5 pr-12 rounded-lg text-sm focus:outline-none" type="text" name="search" placeholder="Rechercher une ville..." onChange={(e) => handleChange(e)} />
                <div className="absolute right-0 top-0 mt-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path fill="#6b7280" d="M15.5 12c2.5 0 4.5 2 4.5 4.5c0 .88-.25 1.7-.69 2.4l3.08 3.1L21 23.39l-3.12-3.07c-.69.43-1.51.68-2.38.68c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5m0 2a2.5 2.5 0 0 0-2.5 2.5a2.5 2.5 0 0 0 2.5 2.5a2.5 2.5 0 0 0 2.5-2.5a2.5 2.5 0 0 0-2.5-2.5m4-12a.5.5 0 0 1 .5.5v9.31c-.58-.55-1.25-1-2-1.31V4.7l-3 1.16V10c-.7.07-1.38.24-2 .5V5.87l-4-1.4V16.5c0 .64.09 1.26.26 1.84L8 17.9l-5.34 2.07l-.16.03a.5.5 0 0 1-.5-.5V4.38c0-.23.15-.41.36-.48L8 2l6 2.1l5.34-2.07zM4 5.46v11.85l3-1.16V4.45z"/></svg>
                </div>
              </div>

              {/* List */}
              <div className="w-full flex flex-col gap-3">
                {contracts.map((contract) => (
                  <div key={contract?.name} className={`w-full flex justify-between items-center px-4 py-2 gap-4 ${selected === contract?.name ? 'bg-blue-100 hover:bg-blue-200' : 'bg-white hover:bg-white/90'} rounded-lg cursor-pointer`} onClick={() => goTo(contract?.name)}>
                    <div className="flex flex-col">
                      <div className="w-full flex justify-between items-center">
                        <p className="font-roboto font-semibold text-md capitalize mb-1 hover:underline">{contract?.commercial_name ? contract?.commercial_name : "Contrat inconnu"}</p>
                        <div className={`w-8 h-8 ${selected === contract?.name ? 'flex' : 'hidden'} justify-center items-center p-2 rounded-full hover:bg-black/10`} onClick={() => getContractDetails(contract?.name)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full object-contain' viewBox="0 0 24 24"><path fill="#525252" d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"/></svg>
                        </div>
                      </div>
                      <p className="font-roboto font-medium text-xs text-gray-500 capitalize mb-3">{contract?.name}</p>
                      {/* Stations and Parkings */}
                      <div className="flex items-center gap-1 py-1">
                        {/* Stations */}
                        <div className="flex justify-center items-center gap-2 p-1 border rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#c2410c" d="M21 16.83v-5.667c0-1.044 0-1.566-.283-1.959c-.229-.317-.596-.486-1.25-.713c-.134 1.606-.666 3.247-1.501 4.682c-.973 1.672-2.418 3.167-4.269 3.974a4.255 4.255 0 0 1-3.394 0c-1.851-.807-3.296-2.302-4.269-3.974A11.533 11.533 0 0 1 4.7 9.658c-.383-.057-.676-.028-.93.113a1.5 1.5 0 0 0-.28.203C3 10.42 3 11.249 3 12.908v4.93c0 1.043 0 1.565.283 1.958s.778.558 1.768.888l.384.128c1.577.525 2.365.788 3.172.79c.243 0 .485-.017.726-.052c.798-.115 1.548-.49 3.048-1.24c1.149-.575 1.724-.862 2.334-.995c.214-.047.431-.08.65-.098c.623-.052 1.25.053 2.507.262c1.273.212 1.91.318 2.375.051c.158-.09.298-.209.413-.35c.34-.415.34-1.06.34-2.35"/><path fill="#c2410c" fillRule="evenodd" d="M12 2C8.686 2 6 4.552 6 7.7c0 3.124 1.915 6.769 4.903 8.072a2.755 2.755 0 0 0 2.194 0C16.085 14.47 18 10.824 18 7.7C18 4.552 15.314 2 12 2m0 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4" clipRule="evenodd"/></svg>
                          <div className="flex flex-col">
                            <p className="font-roboto font-light text-xs">Stations</p>
                            <p className="font-roboto font-semibold text-xs">{quantities.find((c) => c.name === contract?.name)?.quantity}</p>
                          </div>
                        </div>

                        {/* Parkings */}
                        <div className="flex justify-center items-center gap-2 p-1 border rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#047857" d="M11 14h1.5a3.5 3.5 0 1 0 0-7H9v10h2zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m7 6h1.5a1.5 1.5 0 0 1 0 3H11z"/></svg>
                          <div className="flex flex-col">
                            <p className="font-roboto font-light text-xs">Parkings</p>
                            <p className="font-roboto font-semibold text-xs">0</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full h-24 flex justify-center items-start">
                      <img src={`${locations.find((location) => location.name.toLowerCase() === contract?.name.toLowerCase()).logo}`} alt="contract logo" className='w-full object-contain' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contract detail */}
          <div className={`w-full absolute p-2 max-h-[calc(100vh-115px)] ${openSidebox ? 'flex' : 'hidden'} ${toContract ? 'translate-x-0' : 'translate-x-full'} gap-3 overflow-auto transition-all`}>
            <div className="w-full flex flex-col">
              {/* Content */}
              <div className="w-full flex flex-col bg-white rounded-md pb-2">
                {/* Image & Back Button */}
                <div className="relative flex w-full h-28">
                  <div className="w-full h-full rounded-lg">
                    <img src={`${locations.find((location) => location.name.toLowerCase() === selected.toLowerCase()).logo}`} alt="contract logo" className='w-full h-full object-contain rounded-t-lg' />
                  </div>
                  <div className="absolute top-1 left-1 w-8 h-8 flex justify-center items-center p-2 rounded-full hover:bg-gray-100 transition-colors" onClick={() => setToContract("")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24"><path fill="#171717" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13z"/></svg>
                  </div>
                </div>

                {/* Details */}
                <div className="w-full flex flex-col">
                  {/* Contract name & Town | Heart */}
                  <div className="flex justify-between w-full mt-4 mb-2 px-4">
                    {/* Name & Town */}
                    <div className="flex flex-col">
                      <p className="text-2xl font-bold">{selectedContract?.commercial_name}</p>
                      <p className="text-sm text-gray-500 capitalize">{selected}, {countryCodes.find((code) => code.code === selectedContract?.country_code)?.name || "Non renseigné"}</p>
                    </div>
                    {/* Heart */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="#6b7280" d="M12 20.325q-.35 0-.712-.125t-.638-.4l-1.725-1.575q-2.65-2.425-4.788-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125M11.05 6.75q-.725-1.025-1.55-1.563t-2-.537q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .538T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375m.95 4.725"/></svg>
                  </div>

                  {/* Capacity */}
                  <div className="flex justify-center items-center w-full gap-2 px-4 mt-4">
                    {/* Number of stations */}
                    <div className="flex justify-center items-center p-2 rounded-xl gap-4 border-2 border-gray-500 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20"><path fill="#0ea5e9" fillRule="evenodd" d="M2.5 8.123C2.5 12.366 6.882 19.5 10 19.5c3.118 0 7.5-7.134 7.5-11.377C17.5 3.917 14.146.5 10 .5S2.5 3.917 2.5 8.123ZM10 5.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Z" clipRule="evenodd"/></svg>
                      <div className="flex flex-col justify-center">
                        Stations
                        <p className="text-xl font-bold">{quantities.find((item) => item.name === selected)?.quantity || 0}</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center p-2 rounded-xl gap-4 border-2 border-gray-500 flex-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24"><path fill="#0ea5e9" d="M10 15v4q0 .825-.587 1.413T8 21q-.825 0-1.412-.587T6 19V5q0-.825.588-1.412T8 3h5q2.5 0 4.25 1.75T19 9q0 2.5-1.75 4.25T13 15zm0-4h3.2q.825 0 1.413-.587T15.2 9q0-.825-.587-1.412T13.2 7H10z"/></svg>
                      <div className="flex flex-col justify-center">
                        Parkings
                        <p className="text-xl font-bold">0</p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full border my-4"></div>

                  <div className="w-full flex flex-col gap-2 px-4">
                    <p className="text-sm font-semibold">Implantations</p>
                    <div className="w-full flex flex-wrap gap-2">
                      {contractsRef.current.find((contract) => contract?.name === selected)?.cities ?
                        contractsRef.current.find((contract) => contract?.name === selected)?.cities.length > 0 ?
                          contractsRef.current.find((contract) => contract?.name === selected)?.cities.map((city) => (
                            <div className="flex justify-center items-center p-1 rounded-lg gap-1 border-2 border-gray-500" key={city}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20"><path fill="#0ea5e9" fillRule="evenodd" d="M2.5 8.123C2.5 12.366 6.882 19.5 10 19.5c3.118 0 7.5-7.134 7.5-11.377C17.5 3.917 14.146.5 10 .5S2.5 3.917 2.5 8.123ZM10 5.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Z" clipRule="evenodd"/></svg>
                              <p className="text-xs font-semibold text-gray-500">{city}</p>
                            </div>
                          ))
                          :
                          <div className="flex justify-center items-center p-2 rounded-xl gap-4 border-2 border-gray-500 flex-1">Aucune implantation</div>
                        :
                        <div className="flex justify-center items-center p-2 rounded-xl gap-4 border-2 border-gray-500 flex-1">Aucune implantation</div>
                      }
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full border my-4"></div>

                  <div className="w-full flex flex-col gap-2 px-4">
                    <p className="text-sm font-semibold">Description</p>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex! Nihil excepturi doloremque debitis, sequi quos cupiditate eveniet temporibus ex similique impedit iure vitae ullam? Voluptates saepe maxime dicta iure?</p>
                    <p className="text-xs text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex! Nihil excepturi doloremque debitis, sequi quos cupiditate eveniet temporibus ex similique impedit iure vitae ullam? Voluptates saepe maxime dicta iure?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideBox