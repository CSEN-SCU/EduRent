'use client';
import { useCallback, useMemo } from "react";
import OverlayView from "../OverlayView";
import { motion } from "framer-motion";
import { SafeListing } from "@/app/types";


interface CustomMarkerProps {
  listing: SafeListing;
  map: google.maps.Map;
}

export default function CustomMarker( {listing, map}: CustomMarkerProps) {

  const { latitude, longitude, price } = listing;
  
  const handleClick = useCallback(() => {
    // This should send to individual listing******
    console.log("Listing clicked!:)", listing);
  }, [listing]);

  const markerContent = useMemo(() => `$ ${price}`, [price]);

  return (
        <OverlayView
      position={{ lat: latitude, lng: longitude }}
      map={map}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: Math.random() * 0.3 } }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
            <button
          className="rounded-full bg-zinc-600 py-1.5 px-2 drop-shadow text-xs text-white"
          onClick={handleClick}
        >
            {markerContent}
            </button>
          </motion.div>
        </OverlayView>
  );
}