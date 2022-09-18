import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import "../../App.css";

const MapBox = styled.div`
  width: 80%;
  height: 500px;
  margin: 0 auto;
  border: medium solid green;
  border-radius: 8px;
`;

export default function Home({ routeList, currentRoute }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <MapBox>
      <Map routeList={routeList} currentRoute={currentRoute} />
    </MapBox>
  );
}

function Map({ routeList, currentRoute }) {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (routeList && currentRoute) {
      const val = routeList.filter((item) => item.name === currentRoute)[0]
        .stops;
      if (typeof val === "string") {
        setRoute(JSON.parse(val));
      } else {
        setRoute(val);
      }
    }
  }, [currentRoute]);

  const center = route ? parseInt(route.length / 2) : "";
  const centerPathLat = route ? route[center].lat : "";
  const centerpathLng = route ? route[center].lng : "";

  return (
    route && (
      <GoogleMap
        zoom={17}
        center={{ lat: centerPathLat, lng: centerpathLng }}
        mapContainerClassName="map-container"
      >
        <Polyline
          path={route}
          options={{
            strokeColor: "#0088FF",
            strokeWeight: 6,
            strokeOpacity: 0.6,
            defaultVisible: true,
          }}
        />
        {route.map((stop, index) => (
          <Marker
            key={index}
            position={{
              lat: stop.lat,
              lng: stop.lng,
            }}
            title={stop.id}
            label={`${index + 1}`}
          />
        ))}
      </GoogleMap>
    )
  );
}
