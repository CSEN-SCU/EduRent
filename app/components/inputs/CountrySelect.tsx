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
                placeholder="Enter Full Address"
                value={value && value.label}
                onChange={(event) => {
                    const newValue = { ...value, 
                        flag: '📍',
                        label: event.target.value,
                        latlng: [0,10000], // CHANGE // CHANGE// CHANGE// CHANGE
                        region: event.target.value,
                        value: event.target.value
                    };  
                
                    onChange(newValue as CountrySelectValue);
                }}
            />
        </div>
    );
};



export default CountrySelect;