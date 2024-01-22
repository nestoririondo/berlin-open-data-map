import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { VERSCHENKEN_API } from "../constants/api";
import { GEOCODING_API } from "../constants/api";
import SideBar from "./SideBar";
import axios from "axios";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const berlin = [52.5, 13.35];
const geocodingKey = import.meta.env.VITE_GEOCODING_API_KEY;

const fetchData = async (setData, setIsLoading) => {
  try {
    const response = await axios.get(VERSCHENKEN_API);
    const promises = response.data.index.map((item) =>
      axios.get(
        `${GEOCODING_API}${item.adresse} ${item.plz}&key=${geocodingKey}`
      )
    );
    const results = await Promise.all(promises);
    const dataWithCoordinates = results.map((result, index) => {
      const item = response.data.index[index];
      const location = result.data.results[0];
      const lat =
        location && location.geometry ? location.geometry.location.lat : null;
      const lng =
        location && location.geometry ? location.geometry.location.lng : null;
      return { ...item, lat, lng };
    });
    setData(dataWithCoordinates);
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

const Map = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(setData, setIsLoading);
  }, []);

  return (
    <div className="map">
      <SideBar isLoading={isLoading} />
      <MapContainer center={berlin} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          data.map((item, index) => {
            if (!item || item.lat === null || item.lng === null) {
              return console.log("no coordinates for item", item);
            }
            const markerIcon = L.icon({
              iconUrl: "./assets/marker.png",
              iconSize: [30, 30],
            });
            return (
              <Marker
                key={index}
                position={[item.lat, item.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="name">{item.name}</div>
                  <div className="address">
                    {item.adresse}, {item.plz} {item.bezirk}
                  </div>
                  <div className="things">{item.gueter}</div>
                  {/* <div>{item.anschrift}</div> */}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
