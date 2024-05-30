"use client";


//import useCountries from "@/app/hooks/useCountries";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
import { SafeUser } from "@/app/types";


const Map = dynamic(() => import("../Map"), {
 ssr: false,
});


interface IListingInfoProps {
 user: SafeUser;
 description: string;
 guestCount: number;
 roomCount: number;
 bathroomCount: number;
 category:
   | {
       label: string;
       icon: IconType;
       description: string;
     }
   | undefined;
 locationValue: string;
 leaseStartDate: Date;
 leaseEndDate: Date;
 listingLatLong: number[];
 distFromBenson: number;
 price: number;
}


const ListingInfo: React.FC<IListingInfoProps> = ({
 user,
 description,
 guestCount,
 roomCount,
 bathroomCount,
 locationValue,
 category,
 leaseStartDate,
 leaseEndDate,
 listingLatLong,
 distFromBenson,
 price
}) => {

 const coordinates = listingLatLong;

 const start = leaseStartDate.toLocaleDateString('en-US', {
   month: '2-digit',
   day: '2-digit',
   year: 'numeric',
 });


 const end = leaseEndDate.toLocaleDateString('en-US', {
   month: '2-digit',
   day: '2-digit',
   year: 'numeric',
 });

 const distanceFromBenson = Number((distFromBenson).toFixed(2));

let locationRating: number;
 if(Number((distFromBenson).toFixed(1)) > 1){
  locationRating = 1;
 }else{
  locationRating = 10 - (Number((distFromBenson).toFixed(1))*3)
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="col-span-1 flex flex-col gap-8">
    <div className="flex flex-col gap-2">
      <div className="text-lg font-semibold flex flex-row items-center gap-2">
        <div>Posted by {user?.name}</div>
        <Avatar src={user?.image} />
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <div>{guestCount} person max capacity</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
    </div>
    <hr />
    <div className="flex flex-row justify-between items-center">
      <div className="text-lg font-semibold flex flex-row gap-2">
        <div>${price}</div>
        <div className="font-light text-neutral-500">/ month</div>
      </div>
      <div className="h-full border-l border-gray-300 mx-3"></div>

      <div className="text-lg font-semibold flex flex-row gap-2">
        <div>Lease Term:</div>
        <div className="font-light text-neutral-500">{start} — {end}</div>
      </div>
    </div>
    

    <hr />
    {category && (
      <ListingCategory
        icon={category.icon}
        label={category.label}
        description={category.description}
      />
    )}
    <hr />

    <div className="text-lg font-light text-neutral-500">{description}</div>
    <hr />
    
    
  </div>
  <div className="col-span-1 ">
    <Map center={coordinates} />
    <div className="text-lg font-semibold flex flex-row gap-2 mt-4">
      <div>Distance from Benson Memorial Center:</div>
      <div className="font-light text-neutral-500">{distanceFromBenson} miles</div>
    </div>
    <div className="text-lg font-semibold flex flex-row gap-2 mt-3">
      <div>Location Rating:</div>
      <div className="font-light text-neutral-500">{locationRating}/10</div>
    </div>
  </div>
</div>

 );
};


export default ListingInfo;


