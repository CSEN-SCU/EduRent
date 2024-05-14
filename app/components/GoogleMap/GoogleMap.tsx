'use client';
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useState } from "react";
import CustomMarker from "../CustomMarker";
import Map from "../Map";
import { SafeListing } from "@/app/types";

interface GoogleMapProps {
  // onIdle?: (map: google.maps.Map) => void;
  // onClick?: (e: google.maps.MapMouseEvent) => void;
  // onMarkerClick: (payload: SafeListing) => void;
  listings: SafeListing[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  // highlightedMarkerId?: string;
}

export default function GoogleMap({
  apiKey,
  // onClick,
  // onIdle,
  zoom,
  center,
  listings,
  // onMarkerClick,
  // highlightedMarkerId,
}: GoogleMapProps) {
  
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map) {
      // Your logic when map is ready, if needed
    }
  }, [map]);
  
  return (
    <div className="flex h-full">
      <Wrapper
        apiKey={apiKey}
        render={(status) =>
          status === Status.FAILURE ? (
            <p>Failed to load Google Maps</p>
          ) : (
            <Map
              className="grow h-full"
              center={center}
              zoom={zoom}
              minZoom={2}
              maxZoom={18}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              zoomControl={false}
              clickableIcons={false}
            >
              {map && listings.map((listing) => (
                <CustomMarker key={listing.id} listing={listing} map={map} />
              ))}
            </Map>
          )
        }
      />
    </div>
  );
}