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
 distFromBenson
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
   <div className="col-span-4 flex flex-col gap-8">
     <div className="flex flex-col gap-2">
       <div
         className="
           text-xl
           font-semibold
           flex
           flex-row
           items-center
           gap-2
         "
       >
         <div>Hosted by {user?.name}</div>
         <Avatar src={user?.image} />
       </div>
       <div
         className="
           flex
           flex-row
           items-center
           gap-4
           font-light
           text-neutral-500
         "
       >
         <div>{guestCount} person max capacity</div>
         <div>{roomCount} rooms</div>
         <div>{bathroomCount} bathrooms</div>
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
     <div className="text-lg font-light text-neutral-500">Lease term: {start} to {end}</div>
     <div className="text-lg font-light text-neutral-500">Location Rating {locationRating}/10</div>
     <div className="text-lg font-light text-neutral-500">Distance from Benson Memorial Center: {distanceFromBenson} miles</div>

     <Map center={coordinates} />
   </div>
 );
};


export default ListingInfo;


