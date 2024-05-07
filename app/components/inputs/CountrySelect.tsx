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
          data.map(({ place_id, description }) => (
            <MenuItem
              key={place_id}
              label={description}
              onClick={() => {
                setValue(description);

                // sus code
                getGeocode({ address: description }).then((results) => {
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
              }} // Problem is here
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
    googleMapsApiKey: "AIzaSyAIl4gLM_i27zUv_0tKieRlqNOGvqC6fyM",
    libraries,
  });

  if (!isLoaded) return null;

  if (loadError) toast.error("Error Loading");

  return <ReadySearchBox locationValue={locationValue} onChange={onChange} />;
};

export default CountrySelect;
