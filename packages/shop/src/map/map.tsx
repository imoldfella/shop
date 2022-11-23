import maplibre, { Map as BaseMap, MapOptions as BaseOptions, NavigationControl, NavigationOptions, Marker, Map as MapGl, AttributionControl, ResponseCallback, RequestParameters, Cancelable } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import './map.css'
import { mapstyle } from "./mapstyle"
// @ts-ignore
import { Db, TableReader,Pyramid } from '@datagrove/db'
import { decompressSync } from "fflate"

export { MapGl,Marker }
export interface MapPosition {}
export interface MapClick extends MapPosition {}


// const apiKey : string|null = import.meta.env.VITE_MAPTILER
// export function mountMapTiler() {
//   var map = new maplibre.Map({
//     container: 'map',
//     style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
//     center: [0, 0],
//     zoom: 1.28
//   });
// }



let pyr = new Pyramid(0, 15)
let db: Db
let tr: TableReader
// function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
//   return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
// }


function dgProtocol(
  params: RequestParameters,
  callback: ResponseCallback<any>): Cancelable {
  console.log("wants", params)

  if (params.type == "json") {

    const tilejson = {
      tiles: [params.url + "/{z}/{x}/{y}"],
      "scheme": "tms",
      minzoom: 0,
      maxzoom: 14,
    };
    callback(null, tilejson, null, null);
  } else {
    const re = new RegExp(/dg:(.+)\/(\d+)\/(\d+)\/(\d+)/);
    const result = params.url.match(re);
    //const pmtiles_url = result[1];
    if (result) {
      const z = parseInt(result[2]!);
      const x = parseInt(result[3]!);
      const y = parseInt(result[4]!);
      console.log("xyz", x, y, z)

      let id = pyr.FromXyz(x, y, z)
      tr.get(id).then((a: ArrayBuffer) => {
        a = decompressSync(new Uint8Array(a))
        console.log("fetch", id, a)
        callback(undefined,a, undefined, undefined)
      })
    }
   }
    return {
      cancel: () => { },
    };
}

maplibre.addProtocol("dg", dgProtocol)

export function getCurrentPosition() : Promise<GeolocationPosition|null>{
  return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          error => resolve(null)
      )
  })
}

export async function mountDgMap(container: HTMLElement) {
  let lat=40.7128, lon= 74.0060

  const pos =   await getCurrentPosition()
  if (pos) {
    lat = pos.coords.latitude
    lon = pos.coords.longitude
  }
  db = await Db.open("db")
  tr = await db.table("map")
  console.log(await tr.getJson(0))
  var map = new MapGl({
    container: container,
    style: mapstyle,
    center: [lon,lat],
    zoom: 14,
    attributionControl: false
  });

  map.addControl(new AttributionControl({
    compact: true,
    customAttribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors; Date: 06.2022'
  }));
  new Marker({color: "#FF0000"})
  .setLngLat([lon,lat])
  .addTo(map);

  map.addControl(new NavigationControl({}));  
  return map
}

// definitely an island. is the entire site one big island then?
export function Map( ){
  const ref = (<div class='h-screen w-screen fixed text-white bg-blue-900'>There should be a map here</div>)
  mountDgMap(ref as HTMLElement)
  return ref
}


/*
JSON: https://geolocation-db.com/json/
JSONP: https://geolocation-db.com/jsonp/
*/

