import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon path
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

const defaultIcon = new L.Icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ZoomToMarker({ loc }) {
  const map = useMap();

  useEffect(() => {
    if (loc?.latitude && loc?.longitude) {
      map.setView([loc.latitude, loc.longitude], 13); // You can adjust the zoom level
    }
  }, [loc]);

  return (
    <Marker position={[loc.latitude, loc.longitude]} icon={defaultIcon}>
      <Popup>
        <strong>{loc.name}</strong>
        <br />
        {loc.address}
        <br />
        Price: {loc.price}
        <br />
        Rating: {loc.rating}
      </Popup>
    </Marker>
  );
}

export default function Maps({ loc }) {
  // useEffect(() => {
  //   console.log(place);
  // }, []);
  return (
    // <></>
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {loc && <ZoomToMarker loc={loc} />}
      {/* You can add more markers or components here */}
    </MapContainer>
  );
}
