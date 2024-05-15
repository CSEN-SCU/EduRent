'use client';
import { useCallback, useMemo } from "react";
import OverlayView from "../OverlayView";
import { motion } from "framer-motion";
import { SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";


interface CustomMarkerProps {
  data : SafeListing; 
  map?: google.maps.Map;
}

const CustomMarker : React.FC<CustomMarkerProps> = ({
  data,
  map
}) => {
  const latLong = data.listingLatLong;
  const lat = latLong[0];
  const long = latLong[1];
  const price = data.price;
  const router = useRouter();
  
  const handleClick = useCallback(() => {
    // This should send to individual listing******
    console.log("Listing clicked!:)", data.id);
    router.push(`/listings/${data.id}`);
  }, [data.id]);

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
          zIndex={Highlight ? 99 : 0}
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
              className={`rounded-full bg-rose-900 py-1.5 px-2 drop-shadow text-xs text-white ${
                Highlight && "text-black bg-rose-900 font-bold py-2 px-2.5"
              }`}
              onClick={handleClick}
            >{`$ ${price}`}</button>
          </motion.div>
        </OverlayView>
      )}
    </>
  );
}

export default CustomMarker;