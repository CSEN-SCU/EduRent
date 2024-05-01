"use client";

import Select from "react-select";
import toast from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import MenuItem from "../navbar/MenuItem";
import { Count } from "@prisma/client/runtime/library";

const libraries: Libraries = ["places"];

export type CountrySelectValue = {
  flag: string;
  label: string; // matt_change
  latlng: number[]; // we need to get the coordinates of this address
  region: string; //
  locationValue: string;
};

interface CountrySelectProps {
  locationValue?: CountrySelectValue;
  onChange: (locationValue: CountrySelectValue) => void;
}

interface EventProps {
  event: any;
  locationValue?: CountrySelectValue;
  onChange: (locationValue: CountrySelectValue) => void;
}

interface SelectProps {
  description: string;
  onChange: (locationValue: CountrySelectValue) => void;
}

const ReadySearchBox = ({ locationValue, onChange }: CountrySelectProps) => {
  // GoogleMapsApiHook
  const {
    ready,
    setValue,
    suggestions: { data, status },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = ({ description, onChange }: SelectProps) => {
    // When the user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    console.log(description);
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      console.log("📍 Coordinates: ", { lat, lng });
      const newValue = {
        ...locationValue,
        flag: "📍",
        label: description,
        latlng: [lat, lng], // CHANGE // CHANGE// CHANGE// CHANGE
        region: description,
        value: description,
        
      };
      onChange(newValue as CountrySelectValue);
    });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Full Address"
        value={locationValue && locationValue.label}
        onChange={(event) => {
          setValue(locationValue?.label ?? "");
          console.log(data);

          //maybe comment out
          const newValue = {
            ...locationValue,
            flag: "📍",
            label: event.target.value,
            latlng: [0, 10000], // CHANGE // CHANGE// CHANGE// CHANGE
            region: event.target.value,
            value: event.target.value,
          };

          onChange(newValue as CountrySelectValue);
        }}
      />
      <div className="flex flex-col cursor-pointer">
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <MenuItem
              key={place_id}
              label={description}
              onClick={handleSelect({ description, onChange })}
            />
          ))}
      </div>
    </div>
  );
};

const CountrySelect: React.FC<CountrySelectProps> =({
  locationValue,
  onChange,
}) => {
  // Google maps script
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: "AIzaSyAIl4gLM_i27zUv_0tKieRlqNOGvqC6fyM",
    libraries,
  });

  console.log(isLoaded);
  if (!isLoaded) return null;

  if (loadError) toast.error("Error Loading");

  return <ReadySearchBox locationValue={locationValue} onChange={onChange} />;
};

export default CountrySelect;
