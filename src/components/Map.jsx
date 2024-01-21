import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { VERSCHENKEN_API } from "../constants/api";
import { GEOCODING_API } from "../constants/api";
import SideBar from "./SideBar";
import axios from "axios";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const berlin = [52.520008, 13.404954];
const geocodingKey = import.meta.env.VITE_GEOCODING_API_KEY;

const fetchData = async (setData, setIsLoading) => {
  try {
    const response = await axios.get(VERSCHENKEN_API);
    const promises = response.data.index.map((item) =>
      axios.get(`${GEOCODING_API}${item.adresse}&key=${geocodingKey}`)
    );
    const results = await Promise.all(promises);
    const dataWithCoordinates = results.map((result, index) => ({
      ...response.data.index[index],
      lat: result.data.results[0].geometry.location.lat,
      lng: result.data.results[0].geometry.location.lng,
    }));
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
      <SideBar />
      <MapContainer center={berlin} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          data.map((item, index) => {
            const markerIcon = L.icon({
              iconUrl: "../src/assets/marker.png",
              iconSize: [30, 30],
            });
            console.log(item);
            return (
              <Marker
                key={index}
                position={[item.lat, item.lng]}
                icon={markerIcon}
              >
                <Popup>
                  <div className="name">{item.name}</div>
                  <div className="address">{item.adresse}</div>
                  <div className="things">{item.gueter}</div>
                  <div>{item.anschrift}</div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
