import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '200px',
  height: '200px',
};

// Google Maps widget component
const Maps = ({ coords }) => {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    // Force version 3.55
    version: 3.55,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={coords}
        options={{ gestureHandling: 'none', disableDefaultUI: true}}
      >
        <Marker position={coords} />
      </GoogleMap>
    </div>
  );
};

export default Maps;