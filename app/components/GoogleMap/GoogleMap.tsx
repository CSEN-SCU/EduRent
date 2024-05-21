'use client';
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import CustomMarker from "../CustomMarker";
import Map from "../Map";
import { SafeListing, SafeUser } from "@/app/types";
import MapComponent from "../Map/Map";
import { LatLngLiteral } from "leaflet";
import { IListingParams } from '../../actions/getListings';


const render = (status: Status) => (<h1>{status}</h1>)

interface GoogleMapProps {
  zoom: number;
  apiKey: string;
  center: LatLngLiteral;
  listings: SafeListing[];
  currentUser?: any;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  zoom,
  center,
  listings
}) => {
  const [selectedListing, setSelectedListing] = useState<SafeListing | null>(null);
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
                    selectedListing={selectedListing}
                    setSelectedListing={setSelectedListing}
                  />
                )
              })}
        </MapComponent>
      </Wrapper>
    </div>
  );
}

export default GoogleMap;