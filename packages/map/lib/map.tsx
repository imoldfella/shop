import React, {useEffect, useRef} from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './map.css'

export function MyButton() {
  return (<button>hello, world</button>)
}

const apiKey : string|null = import.meta.env.VITE_MAPTILER
export  function Map() {
  if (apiKey == null) {
    throw new Error("You have to configure env VITE_MAPTILER, see README");
  }

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [139.753, 35.6844],
      zoom: 14
    });

    map.addControl(new maplibregl.NavigationControl({}), 'top-right');

    new maplibregl.Marker({color: "#FF0000"})
      .setLngLat([139.7525,35.6846])
      .addTo(map);

    return () => {
      map.remove();
    }
  }, []);

  return (
      <div className="map-wrap" >
        <a href="https://www.maptiler.com" className="watermark"><img
            src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo"/></a>
        <div ref={mapContainerRef} className="map"/>
      </div>
  );
}