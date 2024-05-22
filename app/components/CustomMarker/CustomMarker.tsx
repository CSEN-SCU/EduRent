'use client';
import { useCallback, useMemo } from "react";
import OverlayView from "../OverlayView";
import { motion } from "framer-motion";
import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "../listings/ListingCard";

interface CustomMarkerProps {
  data: SafeListing;
  map?: google.maps.Map;
  currentUser?: SafeUser;
  selectedListing: SafeListing | null;
  setSelectedListing: (listing: SafeListing | null) => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  data,
  map,
  currentUser,
  selectedListing,
  setSelectedListing,
}) => {
  const latLong = data.listingLatLong;
  const lat = latLong[0];
  const long = latLong[1];
  const price = data.price;

  const handleClick = useCallback(() => {
    if (selectedListing && selectedListing.id === data.id) {
      setSelectedListing(null);
    } else {
      setSelectedListing(data);
    }

    // if (map) {
    //   map.setCenter({ lat, lng: long });
    // }
  }, [data, selectedListing, setSelectedListing]);

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
            >
              {markerContent}
            </button>
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
            <div className="absolute w-max h-min bottom-0 transform -translate-x-1/3 left-1/3 right-0 z-50 bg-white shadow-lg rounded-lg p-4 ">
                <ListingCard data={selectedListing} currentUser={currentUser} />
                {/* <button
                  className="absolute top-2 left-2 bg-gray-200 p-2 rounded-full shadow"
                  onClick={() => setSelectedListing(null)}
                >
                Close
                </button> */}
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
}

export default CustomMarker;