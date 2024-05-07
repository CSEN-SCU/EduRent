'use client';


import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';


interface DatePickerProps {
   id: string;
   label: string;
   required?: boolean;
   errors: FieldErrors;
   disabled?: boolean;
   register: UseFormRegister<FieldValues>;
   value: Date | null;
   onChange: (value: Date | null) => void;
}


const DatePick: React.FC<DatePickerProps> = ({
   id,
   label,
   required,
   disabled,
   register,
   errors,
   value, // Receive value prop
   onChange // Receive onChange prop
}) => {
   // Use value prop directly as selected date
   const [selectedDate, setSelectedDate] = useState<Date | null>(value);


   const handleDateChange = (date: Date | null) => {
       setSelectedDate(date);
       onChange(date); // Call onChange prop with the selected date
   };


   return (
       <div className="relative">
           <DatePicker
               id={id}
               {...register(id, { required })}
               disabled={disabled}
               selected={selectedDate}
               onChange={handleDateChange}
               placeholderText=""
               className={`
                   w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition
                   pl-4
                   ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                   ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
               `}
               required={required}
           />
           <label
               htmlFor={id}
               className={`
                   absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                   left-4
                   ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
               `}
           >
               {label}
           </label>
       </div>
   );
};


export default DatePick;


