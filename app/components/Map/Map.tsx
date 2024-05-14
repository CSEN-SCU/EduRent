import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { LatLngLiteral } from "leaflet";
import { useEffect, useRef, useState } from "react";

interface MapComponentProps {
  zoom: number;
  center: LatLngLiteral;
}

const MapComponent : React.FC<MapComponentProps> = ({
  zoom,
  center
})=>{
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>()
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      }))
    }
    if(map && !markerCluster){
      map.addListener('click', (e: google.maps.MapMouseEvent)=> {
        if(e.latLng){
          const {lat, lng} = e.latLng
          setMarker({lat: lat(), lng: lng()})
        }
      })
      setMarkerClusters(new MarkerClusterer({map, markers: [], }));
    }
  }, [map, markerCluster])
  
  useEffect(()=> {
    if(marker && markerCluster){
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.Marker({
          position: {lat: marker.lat, lng: marker.lng}
        })
      )
    }
  }, [marker, markerCluster])

  return (
    <>
      <div ref={ref as any} style={{height: "825px", width: "700px", minHeight:"300px"}} ></div>
    </>
  )
}

export default MapComponent;