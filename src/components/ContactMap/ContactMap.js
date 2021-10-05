import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import iconSvg from '../../assets/pin.svg';
import iconSvgActivated from '../../assets/pin-active.svg';

import './map.css';
import "leaflet/dist/leaflet.css";

function ChangeMapView({ coords, arrayOfLatLngs }) {
  const map = useMap();

  if (coords) {
    const activeCoord = [];
    activeCoord.push(coords.geolocation.latitude)
    activeCoord.push(coords.geolocation.longitude)
    map.setView(activeCoord, 15);
  } else {
    let bounds = new L.LatLngBounds(arrayOfLatLngs);
    map.fitBounds(bounds);
  }
  return null;
}

function ContentMap(props) {
  const [activeItem, setActiveItem] = useState(null);
  const [allPosition, setAllPosition] = useState(null);
  let popid = 99

  function mapIcon(url) {
    return new L.Icon({
      iconUrl: url,
      iconSize:[38, 95]
    });
  }
  const getMarkerIcon = (index) => {
    if(index === props.hoverId){
      return mapIcon(iconSvgActivated);
    }
    return mapIcon(iconSvg);

  }
  
  useEffect(() => {
    if (popid !== null) {
      setActiveItem(props.items && props.items[props.hoverId])
    } else (
      setActiveItem(null)
    )
  }, [props.hoverId]);


  useEffect(() => {
    if (props.items.length > 0) {
      let posArray = []
      props.items.map((pos, i) => {
        let lat = pos.geolocation.latitude
        let long = pos.geolocation.longitude
        posArray.push([lat, long]);
      });
      setAllPosition(posArray)
    }
  }, [props]);

  const position = [50.850340, 4.351710];
  return (
    <div>
      <MapContainer center={position} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allPosition != null && (
          <ChangeMapView coords={activeItem} arrayOfLatLngs={allPosition} />
        )}
        {props.items && props.items.map((mark, id) => (
          <Marker
            key={id}
            icon={getMarkerIcon(id)}
            position={[
              mark.geolocation.latitude,
              mark.geolocation.longitude
            ]}
            onClick={() => {
              setActiveItem(mark)
            }}
          />
        ))};
      </MapContainer>

    </div>
  )
}

export default ContentMap;