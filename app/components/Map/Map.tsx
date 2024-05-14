import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";

export default function MapComponent(){
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>()
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  useEffect(()=>{
    if(ref.current && !map){
      setMap(new window.google.maps.Map(ref.current, {
        center: {lat: 4.4333479181711075, lng:-75.21505129646759},
        zoom: 10,
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
      <div ref={ref as any} style={{height: "100%", width: "700px", minHeight:"700px"}} ></div>
    </>
  )
}