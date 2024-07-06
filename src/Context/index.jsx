import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Ranchi");
  const [thisLocation, setLocation] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const options = {
      method: "GET",
      url: "https://visual-crossing-weather.p.rapidapi.com/forecast",
      params: {
        contentType: "json", // changed to json for easier parsing
        unitGroup: "us",
        aggregateHours: "24",
        location: place,
        shortColumnNames: "false",
      },
      headers: {
        "x-rapidapi-key": "384a406ea0msh0ad3631929d6b0ep1eb6cejsn9f280c89bdaf",
        "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);

      if (response.data.error) {
        setError(response.data.error.message);
      } else if (response.data.locations && Object.keys(response.data.locations).length > 0) {
        const thisData = Object.values(response.data.locations)[0];
        setLocation(thisData.address);
        setValues(thisData.values);
        setWeather(thisData.values[0]);
        setError(null); // Clear any previous errors
      } else {
        setError("No data exists for this place.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to fetch weather data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        values,
        thisLocation,
        place,
        error,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
