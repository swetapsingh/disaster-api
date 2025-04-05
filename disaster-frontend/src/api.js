import axios from "axios";

// 🔹 Gemini AI API
const GEMINI_API_KEY = "AIzaSyCAnFRBBSYbPY5scNz0Orv2bi9u0CkGBY8";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export const fetchAIResponse = async (query) => {
  try {
    const response = await axios.post(GEMINI_URL, { prompt: query });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

// 🔹 Backend Base URL
const BASE_BACKEND_URL = "https://disaster-backend-9xmc.onrender.com";


// 🔹 Inventory API: GET
export const getInventory = async () => {
  const response = await axios.get(`${BASE_BACKEND_URL}/inventory`);
  return response.data;
};

// 🔹 Inventory API: POST
export const addInventoryItem = async (item) => {
  const response = await axios.post(`${BASE_BACKEND_URL}/inventory`, item);
  return response.data;
};

const WEATHER_API_KEY = "5a3ee04e51134a09d85557dd4063cc0a";


export const fetchWeatherAlerts = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall`,
      {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
        },
      }
    );

    return response.data.alerts || [];
  } catch (error) {
    console.error("Weather Alert Error:", error);
    return [];
  }
};
