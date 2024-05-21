"use client";

import toast from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import MenuItem from "../navbar/MenuItem";
import { useState } from "react";
import dotenv from 'dotenv';

dotenv.config();

const libraries: Libraries = ["places"];
const api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

export type CountrySelectValue = {
  flag: string;
  label: string; 
  latlng: number[]; 
  region: string; 
  locationValue: string;
  distValue: number;
};

interface CountrySelectProps {
  locationValue?: CountrySelectValue;
  onChange: (locationValue: CountrySelectValue) => void;
}

interface AutoCompleteResult {
  place_id: string;
  description: string;
}

const ReadySearchBox = ({ locationValue, onChange }: CountrySelectProps) => {
  // GoogleMapsApiHook
  const {
    setValue,
    suggestions: { data, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const [showSuggestions, setShowSuggestions] = useState(true); 

  return (
    <div>
      <input
        type="text"
        className={`border-2 border-neutral-300 p-2 rounded-lg w-full
        ${
          locationValue?.label === "" ? "border-[#b30738]" : "border-neutral-300"
        }
        ${
          locationValue?.label === ""
            ? "focus:border-[#b30738]"
            : "focus:border-black"
        }

        `}
        placeholder="Enter Full Address"
        value={locationValue && locationValue.label}
        onChange={(event) => {
          console.log(event.type);
          if (event.type === "change") setShowSuggestions(true); 

          setValue(locationValue?.label ?? "");

          const newValue = {
            ...locationValue,
            flag: "📍",
            label: event.target.value,
            region: event.target.value,
            value: event.target.value,
          };

          onChange(newValue as CountrySelectValue);
        }}
      />
      <div className="flex flex-col cursor-pointer">
        {status === "OK" && showSuggestions && 
          data.map(({ place_id, description }: AutoCompleteResult) => (
            <MenuItem
              key={place_id}
              label={description}
              onClick={() => {
                setValue(description);
                setShowSuggestions(false);
                getGeocode({ address: description }).then((results: any) => {
                  const { lat, lng } = getLatLng(results[0]);
                  const toRadians = (degrees: number) => degrees * Math.PI / 180;
    
                  const R = 6371; // Earth's radius in kilometers

                  const dLat = toRadians(lat - 37.3476588);
                  const dLon = toRadians(lng + 121.9393392);
                  
                  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(toRadians(37.3476588)) * Math.cos(toRadians(lat)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                  
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  
                  const distanceInMiles =  R * c * 0.621371;

                  const newValue = {
                    ...locationValue,
                    flag: "📍",
                    latlng: [lat, lng],
                    distValue: distanceInMiles,
                    label: description,
                    region: description,
                    value: description,
                  };
                  onChange(newValue as CountrySelectValue);
                  clearSuggestions();
                });
              }}
            />
          ))}
      </div>
    </div>
  );
};

const CountrySelect: React.FC<CountrySelectProps> = ({
  locationValue,
  onChange,
}) => {
  // Google maps script
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: api_key, 
    libraries,
  });

  if (!isLoaded) return null;

  if (loadError) toast.error("Error Loading");
  console.dir(locationValue);
  return <ReadySearchBox locationValue={locationValue} onChange={onChange} />;
};

export default CountrySelect;
