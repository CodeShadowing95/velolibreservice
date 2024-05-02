import { fetchFromAPI } from "./fetchFromAPI";
import { locations } from "./constants";

// Get the list of contracts
export const getContracts = async () => {
  const res = await fetchFromAPI("vls/v3/contracts");
  return res;
}

// Get infos from a station
export const getStationsInfos = async (station_number, contract) => {
  const res = await fetchFromAPI("vls/v3/stations/" + station_number + "?contract=" + contract);
  return res;
}

// Get list of stations
export const getStations = async () => {
  const res = await fetchFromAPI("vls/v3/stations");
  return res;
}

// Get list of stations from a contract
export const getStationsFromContract = async (contract) => {
  const res = await fetchFromAPI("vls/v3/stations?contract=" + contract);
  return res;
}

// Get list of parkings from a contract
export const getParkingsFromContract = async (contract) => {
  const res = await fetchFromAPI("parking/v1/contracts/" + contract + "/parks");
  return res;
}

// Get infos from parking
export const getParkingInfos = async (parking_number, contract) => {
  const res = await fetchFromAPI("parking/v1/contracts/" + contract + "/parks/" + parking_number);
  return res;
}

export const getStationsLength = async () => {
  const quantities = [{}];
  
  for (const location of locations) {
    const res = await fetchFromAPI("vls/v3/stations?contract=" + location.name);
    quantities.push({ name: location.name, quantity: res.length });
  }

  return quantities;
}