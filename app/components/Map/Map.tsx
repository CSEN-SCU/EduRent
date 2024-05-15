import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LatLngLiteral } from "leaflet";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface MapComponentProps {
  zoom: number;
  center: LatLngLiteral;
  // children?: ReactNode;
  children?: React.ReactElement<google.maps.MarkerOptions>;
}

const MapComponent : React.FC<MapComponentProps> = ({
  zoom,
  center,
  children,
})=>{
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLDivElement>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      }))
    }
    if(map){
      map.setMapTypeId('satellite');
      map.setTilt(45);
      map.addListener('click', (e: google.maps.MapMouseEvent)=> {
        if(e.latLng){
          const {lat, lng} = e.latLng
          setMarker({lat: lat(), lng: lng()})
        }
      })
    }
  }, [map])
  
  return (
    <>
      <div ref={ref as any} style={{height: "825px", width: "700px", minHeight:"300px"}} ></div>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  )
}

export default MapComponent;