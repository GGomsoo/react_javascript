import Places from './Places.jsx';
import { useEffect, useState } from 'react';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, seteIsFetching] = useState(false);

  // async, await, useEffect 이용한 비동기 API 통신
  useEffect(() => {
    const fetchPlaces = async () => {
      seteIsFetching(true)
      const response = await fetch("http://localhost:3000/places")      
      const resData = await response.json()
      setAvailablePlaces(resData.places)
      seteIsFetching(false)
    }

    fetchPlaces()
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};
