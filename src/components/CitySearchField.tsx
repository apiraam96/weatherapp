import { useState, useMemo } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { directGeoCodingType } from "../types/openWeatherAPItypes";

const CitySearchField = () => {
  const [location, setLocation] = useState<directGeoCodingType | null>();
  const [value, setValue] = useState<string>("");
  const [metadata, setMetadata] = useState<directGeoCodingType[]>([]);
  const [error, setError] = useState<boolean>(false);

  const fetchLocations = async (value: string) => {
    console.log("debounce value:", value);
    if (!value) {
      setLocation(null);
      setMetadata([]);
      return;
    }
    try {
      const result = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${
          import.meta.env.VITE_OPEN_WEATHER_API_KEY
        }`
      );

      const data: directGeoCodingType[] = await result.json();

      const set = new Set();
      const uniqueMetadata = data.filter((ele) => {
        if (set.has(`${ele.name}, ${ele.state}, ${ele.country}`)) return false;
        set.add(`${ele.name}, ${ele.state}, ${ele.country}`);
        return true;
      });
      setMetadata(uniqueMetadata);
      //set up error handling in the UI
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  const debounce = (cb, delay = 1000) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...arg) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...arg);
      }, delay);
    };
  };

  const debouncedLocations = useMemo(() => debounce(fetchLocations), []);

  const onUpdate = (newValue: string) => {
    setValue(newValue);
    debouncedLocations(newValue);
  };

  const onSubmit = () => {
    console.log(location);
  };

  return (
    <div className="flex">
      <Autocomplete
        filterOptions={(x) => x}
        sx={{ width: 300 }}
        options={metadata}
        getOptionLabel={(option) =>
          `${option.name}, ${option.state ? option.state + "," : ""} ${
            option.country
          }`
        }
        defaultValue={null}
        value={location || null}
        onChange={(event, value) => setLocation(value)}
        inputValue={value}
        noOptionsText="No cities"
        onInputChange={(event, newValue) => onUpdate(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a city"
            fullWidth
            sx={{ borderRadius: 60 }}
          />
        )}
      />
      <button onClick={onSubmit}>Enter</button>
    </div>
  );
};

export default CitySearchField;
