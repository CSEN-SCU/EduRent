'use client';

import Select from 'react-select'
//import useCountries from '@/app/hooks/useCountries';

export type CountrySelectValue = {
    flag: string;
    label: string; // matt_change
    latlng: number[]; // we need to get the coordinates of this address
    region: string;  // 
    value: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    let addrString = '';
    return (
        <div>
            <input
                type="text"
                placeholder="Enter Street Address"
                value={value && value.label}
                onChange={(event) => {
                    const newValue = { ...value, 
                        flag: '📍',
                        label: event.target.value,
                        latlng: [0,10000], // CHANGE // CHANGE// CHANGE// CHANGE
                    };
                    onChange(newValue as CountrySelectValue);
                    console.log("value for CountrySelectValue:");
                    console.log(newValue);
                }}
            />
            <input
                type="text"
                placeholder="Enter City, State"
                value={value && value.region}
                onChange={(event) => {
                    const newValue = { ...value, 
                        region: event.target.value,
                        value: (value && value.label ? value.label + ', ' : '') + event.target.value}; 
                    
                    onChange(newValue as CountrySelectValue);
                    console.log("value for CountrySelectValue:");
                    console.log(newValue);
                }}
            />
        </div>
    );
};



export default CountrySelect;