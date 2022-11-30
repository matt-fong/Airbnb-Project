import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';


const Maps = ({ apiKey, lat, lng }) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ><MarkerF icon={''} position={center} /> </GoogleMap>
      )}
    </>
  );
};

export default React.memo(Maps);
