import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { LatLngLiteral } from "leaflet";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface MapComponentProps {
  zoom: number;
  center: LatLngLiteral;
  // children?: ReactNode;
  children?: React.ReactElement<google.maps.MarkerOptions>;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  zoom, 
  center, 
  children 
}) => {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>(null);
  const [marker, setMarker] = useState<{ lat: number; lng: number } | undefined>();

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      });
      setMap(newMap);

      newMap.addListener('zoom_changed', () => {
        const z = newMap.getZoom()!;
        if (z > 18) {
          newMap.setTilt(0);
          newMap.setMapTypeId('hybrid');
          
        } else {
          newMap.setMapTypeId('roadmap');
        }
      });

      newMap.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setMarker({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [center, zoom, map]);

  return (
    <>
      <div ref={ref} className="h-full w-full"></div>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default MapComponent;