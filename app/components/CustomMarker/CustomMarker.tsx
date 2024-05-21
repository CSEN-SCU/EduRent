'use client';
import { useCallback, useMemo, useState } from "react";
import OverlayView from "../OverlayView";
import { motion } from "framer-motion";
import { SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";
import ListingCard from "../listings/ListingCard";


interface CustomMarkerProps {
  data : SafeListing; 
  map?: google.maps.Map;
  currentUser?: any;
  selectedListing: SafeListing | null;
  setSelectedListing: (listing: SafeListing | null) => void;
}

const CustomMarker : React.FC<CustomMarkerProps> = ({
  data,
  map,
  currentUser,
  selectedListing,
  setSelectedListing,
}) => {
  // const [selectedListing, setSelectedListing] = useState<SafeListing | null>(null);
  const latLong = data.listingLatLong;
  const lat = latLong[0];
  const long = latLong[1];
  const price = data.price;
  const router = useRouter();
  
  const handleClick = useCallback(() => {
    // This should send to individual listing******
    console.log("Listing clicked!:)", data.id);
    setSelectedListing(data);
    // router.push(`/listings/${data.id}`);
  }, [data, setSelectedListing]);
  //data.id

  const markerContent = useMemo(() => `$ ${price}`, [price]);

  return (
    <>
      {map && (
        <OverlayView
          position={{
            lat: lat as number,
            lng: long as number,
          }}
          map={map}
          zIndex={0}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: Math.random() * 0.3 } }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
          >
            <button
              className={`rounded-full bg-rose-900 py-1.5 px-2 drop-shadow text-xs text-white`}
              onClick={handleClick}
            >{`$ ${price}`}</button>
          </motion.div>
        </OverlayView>
      )}
      {selectedListing && selectedListing.id === data.id && map && (
      <OverlayView
          position={{
            lat: lat as number,
            lng: long as number,
          }}
          map={map}
          zIndex={1}
      >
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 z-50  bg-white shadow-lg rounded-lg p-4"
              style={{ width: '280px', height: '360px' }} // This ensures the width is 320px (20rem) // This ensures the width is 24rem or 90% of the viewport
            >
              <ListingCard data={selectedListing} currentUser={currentUser} />
                <button
                  className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full shadow"
                  onClick={() => setSelectedListing(null)}
                >
                  Close
                </button>
            </div>
          </div>
      </OverlayView>
      )}
    </>
  );
}

export default CustomMarker;