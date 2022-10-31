
import mapboxgl, { Map, NavigationControl, NavigationOptions, Marker } from 'maplibre-gl';
import './index.css'
import { mountDgMap } from '../lib/main'
import '../lib/map.css'
const apiKey : string|null = import.meta.env.VITE_MAPTILER
export function mountMapTiler() {
  var map = new mapboxgl.Map({
    container: 'map',
    style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
    center: [0, 0],
    zoom: 1.28
  });
}

 mountDgMap(document.getElementById('map')!)



// maybe there should be a map provider here, then any control can access the map?
// maybe there should be a database context here, then give a database reference to the map control?

// how do we pass identity to the database?
// we need some 

