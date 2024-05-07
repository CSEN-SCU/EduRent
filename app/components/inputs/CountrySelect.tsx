"use client";

import toast from "react-hot-toast";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";
import MenuItem from "../navbar/MenuItem";

const libraries: Libraries = ["places"];

export type CountrySelectValue = {
  flag: string;
  label: string; 
  latlng: number[]; 
  region: string; 
  locationValue: string;
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

  return (
    <div>
      <input
        type="text"
        className={`border-2 border-neutral-300 p-2 rounded-lg w-full
        ${
          locationValue?.label === "" ? "border-rose-500" : "border-neutral-300"
        }
        ${
          locationValue?.label === ""
            ? "focus:border-rose-500"
            : "focus:border-black"
        }

        `}
        placeholder="Enter Full Address"
        value={locationValue && locationValue.label}
        onChange={(event) => {
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
        {status === "OK" &&
          data.map(({ place_id, description }: AutoCompleteResult) => (
            <MenuItem
              key={place_id}
              label={description}
              onClick={() => {
                setValue(description);

                getGeocode({ address: description }).then((results: any) => {
                  const { lat, lng } = getLatLng(results[0]);
                  const newValue = {
                    ...locationValue,
                    flag: "📍",
                    latlng: [lat, lng],
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
    googleMapsApiKey: "AIzaSyAIl4gLM_i27zUv_0tKieRlqNOGvqC6fyM", // only works hardcoded help
    libraries,
  });

  if (!isLoaded) return null;

  if (loadError) toast.error("Error Loading");

  return <ReadySearchBox locationValue={locationValue} onChange={onChange} />;
};

export default CountrySelect;
