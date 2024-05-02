import axios from "axios";

const BASE_URL = "https://api.jcdecaux.com";

const options = {
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    'apiKey': import.meta.env.VITE_JCDECAUX_API_KEY
  }
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
}