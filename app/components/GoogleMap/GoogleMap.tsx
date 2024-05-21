'use client';
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import CustomMarker from "../CustomMarker";
import Map from "../Map";
import { SafeListing } from "@/app/types";
import MapComponent from "../Map/Map";
import { LatLngLiteral } from "leaflet";
import { IListingParams } from '../../actions/getListings';


// const render = (status: Status) => {
//   if (status === Status.FAILURE) {
//     return <p>failed</p>;
//   }
//   return <p>loading...</p>;
// };

const render = (status: Status) => (<h1>{status}</h1>)

interface GoogleMapProps {
  // onIdle?: (map: google.maps.Map) => void;
  // onClick?: (e: google.maps.MapMouseEvent) => void;
  // onMarkerClick: (payload: SafeListing) => void;
  // listings: SafeListing[];
  // center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  center: LatLngLiteral;
  listings: SafeListing[];
  // highlightedMarkerId?: string;
}

export default function GoogleMap({
  apiKey,
  zoom,
  center,
  listings
}: GoogleMapProps) {
  
  // const center = { lat: 37.3489, lng: 121.9368 };
  
  return (
    <div className="flex h-[90%] mt-20 pt-24"> 
   {/* <div className="flex h-full"> */}
      <Wrapper apiKey={apiKey} render={render}>
        <MapComponent
          zoom={zoom}
          center={center}
        >
              {listings.map((listing) => {
                return (
                  <CustomMarker
                    key={listing.id}
                    data={listing}
                  />
                )
              })}
        </MapComponent>
      </Wrapper>
    </div>
  );
}